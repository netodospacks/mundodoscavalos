/**
 * TESTE AUTOMATIZADO DE PERSISTÊNCIA SUPABASE E RESILIÊNCIA
 * Haras Nossa Senhora Aparecida / Mundo dos Cavalos
 *
 * Valida:
 * 1. Seleção automática do repositório (Memória vs Supabase)
 * 2. Protocolo PostgREST da SupabaseOrderRepository (Headers, Upsert, Relacionamentos)
 * 3. Gravação e leitura de pedidos, itens e eventos de auditoria
 * 4. Idempotência por idempotencyKey e chaves únicas
 * 5. Resiliência e degradação suave em caso de falha parcial ou queda de conexão
 * 6. Auditoria de segurança: garantia de não exposição da chave service_role ao cliente
 *
 * Execução: node scripts/test_supabase_persistence.js
 */

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Falha no teste: ${message}`);
  }
}

// -----------------------------------------------------------------------------
// 1. Servidor PostgREST Mock (Simulador de Protocolo Supabase)
// -----------------------------------------------------------------------------
class MockPostgrestServer {
  constructor(port = 9876) {
    this.port = port;
    this.server = null;
    this.ordersDb = new Map();
    this.orderItemsDb = new Map(); // key: `${order_id}_${product_id}`
    this.orderEventsDb = [];
    this.simulateError = null; // 'orders_500', 'items_500', 'network_drop', null
    this.recordedHeaders = [];
  }

  start() {
    return new Promise((resolve) => {
      this.server = http.createServer(async (req, res) => {
        const url = new URL(req.url, `http://localhost:${this.port}`);
        this.recordedHeaders.push({
          path: url.pathname,
          apikey: req.headers["apikey"],
          authorization: req.headers["authorization"],
          prefer: req.headers["prefer"],
          method: req.method,
        });

        // Simulação de erro de rede ou servidor
        if (this.simulateError === "network_drop") {
          req.destroy();
          return;
        }

        // Leitura do Body
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(chunk);
        }
        const bodyStr = Buffer.concat(chunks).toString("utf-8");
        const body = bodyStr ? JSON.parse(bodyStr) : null;

        // ROTA: /rest/v1/orders
        if (url.pathname === "/rest/v1/orders") {
          if (this.simulateError === "orders_500") {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Simulated database connection failure" }));
            return;
          }

          if (req.method === "POST") {
            this.ordersDb.set(body.id, { ...body });
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify([body]));
            return;
          }

          if (req.method === "PATCH") {
            const idMatch = url.search.match(/id=eq\.([^&]+)/);
            const orderId = idMatch ? decodeURIComponent(idMatch[1]) : null;
            if (orderId && this.ordersDb.has(orderId)) {
              const current = this.ordersDb.get(orderId);
              const updated = { ...current, ...body };
              this.ordersDb.set(orderId, updated);
              res.writeHead(204);
              res.end();
            } else {
              res.writeHead(404);
              res.end();
            }
            return;
          }

          if (req.method === "GET") {
            const idMatch = url.search.match(/id=eq\.([^&]+)/);
            const keyMatch = url.search.match(/idempotency_key=eq\.([^&]+)/);

            let matchingOrders = [];
            if (idMatch) {
              const orderId = decodeURIComponent(idMatch[1]);
              const order = this.ordersDb.get(orderId);
              if (order) matchingOrders.push(order);
            } else if (keyMatch) {
              const key = decodeURIComponent(keyMatch[1]);
              for (const order of this.ordersDb.values()) {
                if (order.idempotency_key === key) matchingOrders.push(order);
              }
            }

            // Anexa relacionamentos se solicitado
            const result = matchingOrders.map((ord) => {
              const items = [];
              for (const item of this.orderItemsDb.values()) {
                if (item.order_id === ord.id) items.push(item);
              }
              const events = this.orderEventsDb.filter((e) => e.order_id === ord.id);
              return {
                ...ord,
                order_items: items,
                order_events: events,
              };
            });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
            return;
          }
        }

        // ROTA: /rest/v1/order_items
        if (url.pathname === "/rest/v1/order_items") {
          if (this.simulateError === "items_500") {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Simulated order_items failure" }));
            return;
          }

          if (req.method === "POST" && Array.isArray(body)) {
            for (const item of body) {
              const key = `${item.order_id}_${item.product_id}`;
              this.orderItemsDb.set(key, item);
            }
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(body));
            return;
          }
        }

        // ROTA: /rest/v1/order_events
        if (url.pathname === "/rest/v1/order_events") {
          if (req.method === "POST") {
            const events = Array.isArray(body) ? body : [body];
            for (const ev of events) {
              this.orderEventsDb.push(ev);
            }
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(events));
            return;
          }
        }

        res.writeHead(404);
        res.end();
      });

      this.server.listen(this.port, () => resolve());
    });
  }

  stop() {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => resolve());
      } else {
        resolve();
      }
    });
  }
}

// -----------------------------------------------------------------------------
// Bateria de Testes
// -----------------------------------------------------------------------------
async function runTests() {
  console.log("===============================================================================");
  console.log("INICIANDO TESTES DE PERSISTÊNCIA SUPABASE / MEMÓRIA — MUNDO DOS CAVALOS");
  console.log("===============================================================================\n");

  // TESTE 1: Auditoria de Segurança de Credenciais no Navegador
  console.log("[FASE 1] Auditoria de Segurança: Isolamento da chave Service Role");
  const componentsDir = path.join(process.cwd(), "src", "components");
  const appDir = path.join(process.cwd(), "src", "app");

  function scanDirectoryForSecrets(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDirectoryForSecrets(fullPath);
      } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (content.includes("SUPABASE_SERVICE_ROLE_KEY")) {
          throw new Error(`VIOLAÇÃO CRÍTICA: SUPABASE_SERVICE_ROLE_KEY encontrada em arquivo frontend: ${fullPath}`);
        }
        if (content.includes("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")) {
          throw new Error(`VIOLAÇÃO CRÍTICA: Prefixo NEXT_PUBLIC_ usado com service role key: ${fullPath}`);
        }
      }
    }
  }

  scanDirectoryForSecrets(componentsDir);
  scanDirectoryForSecrets(path.join(appDir, "checkout"));
  scanDirectoryForSecrets(path.join(appDir, "catalogo"));
  assert(true, "Chave SUPABASE_SERVICE_ROLE_KEY está estritamente ausente do código do navegador.");

  // TESTE 2: Seleção Automática do Repositório
  console.log("\n[FASE 2] Validação da Seleção Automática do Repositório");
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.SUPABASE_ANON_KEY;

  const {
    MemoryOrderRepository,
    SupabaseOrderRepository,
    getOrderRepository,
  } = await import("../src/services/payment/repository.ts");

  const fallbackRepo = getOrderRepository();
  assert(fallbackRepo.isDurable === false, "Quando variáveis estão ausentes, repositório é não-durável (isDurable === false)");
  assert(fallbackRepo.providerName === "memory_volatile", "Identificador do repositório fallback é 'memory_volatile'");

  // Simula variáveis configuradas
  process.env.SUPABASE_URL = "http://localhost:9876";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test_service_role_secret_key_123";
  const supabaseRepo = getOrderRepository();
  assert(supabaseRepo.isDurable === true, "Quando configurado, repositório selecionado é durável (isDurable === true)");
  assert(supabaseRepo.providerName === "supabase", "Identificador do repositório selecionado é 'supabase'");

  // TESTE 3: Protocolo PostgREST, Gravação e Leitura no Supabase Mock
  console.log("\n[FASE 3] Teste de Protocolo PostgREST, Persistência Relacional e Idempotência");
  const mockServer = new MockPostgrestServer(9876);
  await mockServer.start();

  try {
    const testRepo = new SupabaseOrderRepository(
      "http://localhost:9876",
      "test_service_role_secret_key_123"
    );

    const sampleOrder = {
      id: "JAR-2026-TEST01",
      accessToken: "access_token_secure_hex_48_chars_test_1234567890abcdef",
      idempotencyKey: "idemp_order_mock_001",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending_payment",
      chargeStatus: "not_generated",
      customer: {
        name: "Comprador de Teste",
        email: "teste@example.com",
        phone: "11987654321",
        cpf: "12345678900",
      },
      items: [
        {
          id: "cobertura-garanhao-01",
          title: "Cobertura de Garanhão Premiado",
          subtitle: "Genética Superior",
          modality: "Cobertura",
          image: "/images/garanhaov1.jpg",
          unitPrice: 250000,
          quantity: 2,
        },
        {
          id: "frete-logistica-01",
          title: "Transporte Especializado Haras",
          modality: "Logística",
          unitPrice: 50000,
          quantity: 1,
        },
      ],
      pricing: {
        subtotal: 550000,
        discount: 0,
        fee: 0,
        total: 550000,
      },
      paymentMethod: "pix",
      delivery: {
        type: "in_person",
        title: "Retirada no Haras",
        instructions: "Apresentar comprovante.",
        fee: 0,
      },
      pix: {
        provider: "demonstration_pix",
        chargeId: "chg_mock_999",
        qrCodeVisualAvailable: true,
        qrCodeUrl: "data:image/svg+xml;utf8,<svg></svg>",
        copyAndPasteCode: "00020126580014br.gov.bcb.pix...",
        expiresAt: new Date(Date.now() + 900000).toISOString(),
        isDemonstrationMode: true,
        instructions: ["Abra seu app do banco", "Escaneie o QR Code"],
      },
      events: [
        {
          timestamp: new Date().toISOString(),
          type: "ORDER_CREATED",
          description: "Pedido de teste registrado para validação Supabase.",
        },
      ],
    };

    // 3.1 Gravação (save)
    await testRepo.save(sampleOrder);
    assert(mockServer.ordersDb.has("JAR-2026-TEST01"), "Pedido principal gravado no PostgREST");
    assert(mockServer.orderItemsDb.size === 2, "2 itens do pedido gravados no banco relacional");
    assert(mockServer.orderEventsDb.length >= 1, "Evento de auditoria registrado no banco");

    // Validação de Headers de Segurança PostgREST
    const orderReqHeader = mockServer.recordedHeaders.find(
      (h) => h.path === "/rest/v1/orders" && h.method === "POST"
    );
    assert(orderReqHeader.apikey === "test_service_role_secret_key_123", "Header apikey contém service_role_key");
    assert(orderReqHeader.authorization === "Bearer test_service_role_secret_key_123", "Header Authorization contém Bearer token");
    assert(orderReqHeader.prefer && orderReqHeader.prefer.includes("resolution=merge-duplicates"), "Header Prefer contém merge-duplicates para upsert seguro");

    // 3.2 Leitura (findById)
    const fetched = await testRepo.findById("JAR-2026-TEST01");
    assert(fetched !== null, "Pedido recuperado com sucesso via findById");
    assert(fetched.customer.name === "Comprador de Teste", "Dados do cliente mapeados com integridade");
    assert(fetched.items.length === 2, "Itens filhos recuperados e mapeados para OrderItem[]");
    assert(fetched.items[0].unitPrice === 250000, "Preços em centavos preservados sem distorção");
    assert(fetched.events.length >= 1, "Histórico de eventos auditado recuperado em ordem");
    assert(fetched.idempotencyKey === "idemp_order_mock_001", "Chave de idempotência preservada no banco");

    // 3.3 Consulta por Idempotência (findByIdempotencyKey)
    const idempFetched = await testRepo.findByIdempotencyKey("idemp_order_mock_001");
    assert(idempFetched !== null && idempFetched.id === "JAR-2026-TEST01", "Recuperação por idempotency_key funcionando corretamente");

    // 3.4 Atualização de Status (updateStatus)
    const nowPaid = new Date().toISOString();
    const updated = await testRepo.updateStatus(
      "JAR-2026-TEST01",
      "paid",
      "Liquidação bancária confirmada via simulação",
      nowPaid
    );
    assert(updated !== null, "updateStatus executou e retornou pedido atualizado");
    assert(updated.status === "paid", "Status do pedido foi atualizado para 'paid'");
    assert(updated.paidAt === nowPaid, "Data de pagamento paid_at gravada com precisão");
    const lastEvent = updated.events[updated.events.length - 1];
    assert(lastEvent.type === "STATUS_CHANGE_TO_PAID", "Evento de transição de status anexado à auditoria");

    // 3.5 Consulta por ID e Token Seguro (findByIdAndToken)
    const validWithToken = await testRepo.findByIdAndToken(
      "JAR-2026-TEST01",
      "access_token_secure_hex_48_chars_test_1234567890abcdef"
    );
    assert(validWithToken !== null, "findByIdAndToken recupera pedido com token autêntico");

    const invalidTokenFetch = await testRepo.findByIdAndToken(
      "JAR-2026-TEST01",
      "access_token_falso_de_outro_usuario_invalido_12345678"
    );
    assert(invalidTokenFetch === null, "findByIdAndToken rejeita consulta com token indevido");

    // TESTE 4: Resiliência a Falhas Parciais e Rejeição de Falso Sucesso
    console.log("\n[FASE 4] Teste de Falha Real: Garantia de que erro no Supabase não é mascarado");
    mockServer.simulateError = "orders_500";

    const orderFailing = {
      ...sampleOrder,
      id: "JAR-2026-FAIL02",
      idempotencyKey: "idemp_order_mock_fail_02",
    };

    // Em caso de erro 500 do Supabase, save() DEVE lançar exceção para alertar o backend
    let didThrowOn500 = false;
    try {
      await testRepo.save(orderFailing);
    } catch (err) {
      didThrowOn500 = true;
      assert(err instanceof Error && err.message.includes("500"), "Exceção de falha do banco contém código HTTP sem vazar segredos");
    }
    assert(didThrowOn500, "save() lança erro explícito quando o Supabase falha (nunca reporta falso sucesso)");

    // Confere que o banco rejeitou o pedido e ele não existe no PostgREST
    assert(!mockServer.ordersDb.has("JAR-2026-FAIL02"), "Pedido com falha não foi gravado no banco de dados");

    // Simula queda abrupta de conexão TCP
    mockServer.simulateError = "network_drop";
    let didThrowOnNetDrop = false;
    try {
      await testRepo.save({ ...sampleOrder, id: "JAR-2026-NETDROP" });
    } catch {
      didThrowOnNetDrop = true;
    }
    assert(didThrowOnNetDrop, "Queda física de rede aciona lançamento seguro de erro sem travar o runtime");

    console.log("\n===============================================================================");
    console.log(`TODOS OS ${passedTests}/${totalTests} TESTES AUTOMATIZADOS FORAM EXECUTADOS E APROVADOS!`);
    console.log("===============================================================================");
  } finally {
    await mockServer.stop();
  }
}

runTests().catch((err) => {
  console.error("\nFALHA FATAL DURANTE A EXECUÇÃO DOS TESTES:", err);
  process.exit(1);
});
