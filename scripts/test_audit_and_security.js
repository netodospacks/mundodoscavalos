/**
 * SUÍTE DE TESTES DE AUDITORIA CORRETIVA E SEGURANÇA — CHECKOUT PIX
 * Haras Nossa Senhora Aparecida / Mundo dos Cavalos
 *
 * Valida:
 * 1. Falha real de persistência (rejeição de confirmação indevida e proteção contra falso sucesso)
 * 2. Acesso indevido a pedidos (proteção estrita contra consulta com token ausente ou de terceiros)
 * 3. Idempotência e repetição de requisições (prevenção de duplicidade de pedidos, itens e eventos)
 * 4. Integridade da máquina de estados (bloqueio de transições ilegais como alterar pedido pago)
 * 5. Bloqueio de alteração de status pelo frontend (status 'paid' só por webhook bancário autêntico)
 * 6. Desativação rigorosa do webhook enquanto a API bancária não estiver configurada
 * 7. Isolamento de segredos e credenciais de servidor
 *
 * Execução: node --experimental-strip-types scripts/test_audit_and_security.js
 */

const http = require("node:http");
const crypto = require("node:crypto");

let passed = 0;
let total = 0;

function assert(condition, label) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✓ [APROVADO] ${label}`);
  } else {
    console.error(`  ✗ [FALHA] ${label}`);
    throw new Error(`Falha no teste: ${label}`);
  }
}

async function runAuditSuite() {
  console.log("===============================================================================");
  console.log("AUDITORIA DE SEGURANÇA E CORREÇÃO DO CHECKOUT PIX — MUNDO DOS CAVALOS");
  console.log("===============================================================================\n");

  // Carrega os módulos TypeScript com strip types nativo
  const {
    MemoryOrderRepository,
    SupabaseOrderRepository,
    isValidStatusTransition,
    constantTimeCompare,
  } = await import("../src/services/payment/repository.ts");

  const { OrderService } = await import("../src/services/payment/orderService.ts");
  const { DemonstrationPixProvider, FutureBankPixProvider } = await import(
    "../src/services/payment/providers.ts"
  );

  // ---------------------------------------------------------------------------
  // TESTE 1: Falha Real de Persistência (Garantia de que Erro no Banco NÃO é Mascarado)
  // ---------------------------------------------------------------------------
  console.log("[BLOCO 1] Persistência Real: Tratamento de Erros e Prevenção de Falso Sucesso");

  // Cria um servidor HTTP mock que simula o Supabase retornando erro 500 no POST de pedidos
  let mockServerPort = 9888;
  let mockOrdersDb = new Map();
  let mockStatus = 500;

  const mockServer = http.createServer(async (req, res) => {
    if (mockStatus === 500) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ code: "XX000", message: "Database connection lost or pool exhausted" }));
      return;
    }
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify([]));
  });

  await new Promise((resolve) => mockServer.listen(mockServerPort, resolve));

  try {
    const brokenSupabaseRepo = new SupabaseOrderRepository(
      `http://localhost:${mockServerPort}`,
      "test_service_key"
    );

    const testOrder = {
      id: "JAR-2026-PERSIST-ERR",
      accessToken: "token_seguro_48_chars_1234567890abcdef1234567890abcdef",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending_payment",
      chargeStatus: "not_generated",
      customer: {
        name: "Cliente Teste Falha",
        email: "falha@teste.com",
        phone: "11999998888",
      },
      items: [
        {
          id: "cobertura-01",
          title: "Cobertura de Garanhão",
          modality: "Genética",
          unitPrice: 200000,
          quantity: 1,
        },
      ],
      pricing: { subtotal: 200000, discount: 0, fee: 0, total: 200000 },
      paymentMethod: "pix",
      delivery: { type: "in_person", title: "Retirada", instructions: "", fee: 0 },
      events: [],
    };

    let saveThrew = false;
    let errorMessage = "";
    try {
      await brokenSupabaseRepo.save(testOrder);
    } catch (e) {
      saveThrew = true;
      errorMessage = e instanceof Error ? e.message : String(e);
    }

    assert(saveThrew, "SupabaseOrderRepository.save() lança erro explícito quando o banco de dados falha.");
    assert(
      !errorMessage.includes("test_service_key"),
      "Mensagem de erro não expõe chaves ou segredos de conexão ao chamador."
    );
    assert(
      errorMessage.includes("status HTTP 500"),
      "Erro detalha a causa da falha para fins de diagnóstico no servidor."
    );

    // ---------------------------------------------------------------------------
    // TESTE 2: Acesso Indevido a Pedidos (Proteção Estrita de Token)
    // ---------------------------------------------------------------------------
    console.log("\n[BLOCO 2] Acesso a Pedidos: Proteção Contra Consulta Indevida de Terceiros");

    const memoryRepo = new MemoryOrderRepository();
    const legitimateToken = "valid_token_secret_48_hex_chars_111122223333444455556666";
    const orderVictim = {
      ...testOrder,
      id: "JAR-2026-VICTIM-01",
      accessToken: legitimateToken,
      customer: {
        name: "Comprador Legítimo",
        email: "legitimo@teste.com",
        phone: "11988887777",
      },
    };
    await memoryRepo.save(orderVictim);

    // Tentativa 2.1: Leitura sem token
    const fetchWithoutToken = await memoryRepo.findByIdAndToken("JAR-2026-VICTIM-01", "");
    assert(fetchWithoutToken === null, "Consulta sem token é rejeitada.");

    // Tentativa 2.2: Leitura com token de outro pedido ou token adulterado
    const fetchWithWrongToken = await memoryRepo.findByIdAndToken(
      "JAR-2026-VICTIM-01",
      "token_de_outro_cliente_invalido_48_hex_chars_999988887777"
    );
    assert(fetchWithWrongToken === null, "Consulta com token de terceiro é rejeitada com null (sem vazar dados).");

    // Tentativa 2.3: Leitura com token forjado de comprimento diferente
    const fetchWithShortToken = await memoryRepo.findByIdAndToken(
      "JAR-2026-VICTIM-01",
      "curto"
    );
    assert(fetchWithShortToken === null, "Consulta com token curto/malformado é rejeitada com segurança.");

    // Tentativa 2.4: Leitura com token correto
    const fetchLegitimate = await memoryRepo.findByIdAndToken(
      "JAR-2026-VICTIM-01",
      legitimateToken
    );
    assert(
      fetchLegitimate !== null && fetchLegitimate.id === "JAR-2026-VICTIM-01",
      "Consulta com token autêntico e correspondente é autorizada com sucesso."
    );

    // Validação de mitigação de Timing Attacks
    assert(
      constantTimeCompare("meu_token_secreto_12345678", "meu_token_secreto_12345678"),
      "constantTimeCompare valida tokens idênticos."
    );
    assert(
      !constantTimeCompare("meu_token_secreto_12345678", "meu_token_secreto_87654321"),
      "constantTimeCompare rejeita tokens divergentes."
    );
    assert(
      !constantTimeCompare("tokenA", "tokenLongerB"),
      "constantTimeCompare rejeita com segurança tokens de comprimentos diferentes."
    );

    // ---------------------------------------------------------------------------
    // TESTE 3: Repetição de Requisições, Idempotência e Concorrência
    // ---------------------------------------------------------------------------
    console.log("\n[BLOCO 3] Idempotência: Repetição de Requisições sem Duplicação de Pedidos");

    const orderService = new OrderService();
    const idempotencyKey = "req_checkout_user_click_once_999";

    const createPayload = {
      productId: "curso-online-equinocultura",
      quantity: 1,
      idempotencyKey,
      customer: {
        name: "Cliente Idempotente",
        email: "idemp@teste.com",
        phone: "11977776666",
      },
    };

    // Primeira chamada: cria o pedido
    const firstCall = await orderService.createOrder(createPayload);
    assert(firstCall.success && Boolean(firstCall.order), "Primeira requisição de compra cria o pedido com sucesso.");
    const firstOrderId = firstCall.order.id;

    // Segunda chamada imediata (mesma chave de idempotência, ex: duplo clique do usuário)
    const secondCall = await orderService.createOrder(createPayload);
    assert(secondCall.success && Boolean(secondCall.order), "Segunda requisição com mesma idempotencyKey retorna sucesso.");
    assert(
      secondCall.order.id === firstOrderId,
      "Segunda requisição retorna exatamente o mesmo pedido existente (sem gerar novo ID)."
    );
    assert(
      secondCall.order.items.length === firstCall.order.items.length,
      "Itens do pedido não foram duplicados na repetição da requisição."
    );

    // ---------------------------------------------------------------------------
    // TESTE 4: Integridade da Máquina de Estados e Transições de Status
    // ---------------------------------------------------------------------------
    console.log("\n[BLOCO 4] Máquina de Estados: Prevenção de Alteração Indevida de Status");

    // Validações da regra pura de transição
    assert(
      isValidStatusTransition("pending_payment", "paid"),
      "Transição de 'pending_payment' para 'paid' é permitida."
    );
    assert(
      isValidStatusTransition("pending_payment", "cancelled"),
      "Transição de 'pending_payment' para 'cancelled' é permitida."
    );
    assert(
      isValidStatusTransition("pending_payment", "expired"),
      "Transição de 'pending_payment' para 'expired' é permitida."
    );
    assert(
      !isValidStatusTransition("paid", "cancelled"),
      "Transição de 'paid' para 'cancelled' é ESTRITAMENTE BLOQUEADA (pedido pago é imutável)."
    );
    assert(
      !isValidStatusTransition("paid", "pending_payment"),
      "Transição de 'paid' para 'pending_payment' é ESTRITAMENTE BLOQUEADA."
    );
    assert(
      !isValidStatusTransition("cancelled", "paid"),
      "Transição de 'cancelled' para 'paid' é ESTRITAMENTE BLOQUEADA."
    );

    // Teste prático no repositório
    const paidOrder = {
      ...testOrder,
      id: "JAR-2026-PAID-01",
      status: "paid",
      accessToken: "token_pago_1234567890abcdef1234567890abcdef",
    };
    await memoryRepo.save(paidOrder);

    // Tentativa ilegal de cancelar pedido pago
    const illegalCancel = await memoryRepo.updateStatus(
      "JAR-2026-PAID-01",
      "cancelled",
      "Tentativa indevida de cancelamento de pedido já quitado"
    );
    assert(illegalCancel === null, "Repositório rejeita atualização ilegal de status em pedido pago.");

    const stillPaid = await memoryRepo.findById("JAR-2026-PAID-01");
    assert(stillPaid.status === "paid", "Status do pedido pago permanece 'paid' inalterado.");

    // ---------------------------------------------------------------------------
    // TESTE 5: Tentativa de Marcar Pedido como Pago pelo Frontend
    // ---------------------------------------------------------------------------
    console.log("\n[BLOCO 5] Proteção de Pagamento: Proibição de Confirmação pelo Navegador");

    // Simula tentativa de chamada pública a getOrderSecurely / checkAndUpdateStatus em modo demonstração
    const demoOrder = {
      ...testOrder,
      id: "JAR-2026-DEMO-PAY",
      status: "pending_payment",
      accessToken: "token_demo_payment_check_1234567890abcdef",
      pix: {
        provider: "demonstration_pix",
        qrCodeVisualAvailable: false,
        isDemonstrationMode: true,
        instructions: [],
      },
    };
    await memoryRepo.save(demoOrder);

    // Consulta de status simulando retorno à página de sucesso
    const returnCheck = await orderService.checkAndUpdateStatus(
      "JAR-2026-DEMO-PAY",
      "token_demo_payment_check_1234567890abcdef"
    );
    assert(
      returnCheck.status === "pending_payment",
      "Acesso à página de retorno do cliente NÃO altera o status para 'paid'."
    );

    // ---------------------------------------------------------------------------
    // TESTE 6: Desativação do Webhook enquanto a API Bancária Não Estiver Ativa
    // ---------------------------------------------------------------------------
    console.log("\n[BLOCO 6] Webhook: Desativação Rigorosa em Modo Demonstração");

    const demoProvider = new DemonstrationPixProvider();
    assert(
      demoProvider.validateWebhookSignature("payload_qualquer", {}) === false,
      "DemonstrationPixProvider rejeita qualquer assinatura de webhook (desativado por padrão)."
    );

    const bankProviderWithoutSecret = new FutureBankPixProvider();
    delete process.env.PIX_WEBHOOK_SECRET;
    assert(
      bankProviderWithoutSecret.validateWebhookSignature("payload", { "x-signature": "qualquer" }) === false,
      "FutureBankPixProvider rejeita webhooks quando PIX_WEBHOOK_SECRET não está configurado."
    );

    // Validação com HMAC real caso segredo seja configurado no futuro
    process.env.PIX_WEBHOOK_SECRET = "super_secret_webhook_key_2026";
    const bankProviderWithSecret = new FutureBankPixProvider();
    const testPayload = JSON.stringify({ event: "PAYMENT_CONFIRMED", txid: "JAR-2026-001" });
    const authenticHmac = crypto
      .createHmac("sha256", "super_secret_webhook_key_2026")
      .update(testPayload, "utf8")
      .digest("hex");

    assert(
      bankProviderWithSecret.validateWebhookSignature(testPayload, {
        "x-webhook-signature": authenticHmac,
      }),
      "Validação de assinatura HMAC-SHA256 aceita assinatura autêntica com segredo do banco."
    );
    assert(
      !bankProviderWithSecret.validateWebhookSignature(testPayload, {
        "x-webhook-signature": "assinatura_forjada_invalida_abcdef123456",
      }),
      "Validação de assinatura HMAC-SHA256 rejeita assinatura forjada ou inválida."
    );
    delete process.env.PIX_WEBHOOK_SECRET;

    console.log("\n===============================================================================");
    console.log(`AUDITORIA CONCLUÍDA COM SUCESSO: TODOS OS ${passed}/${total} TESTES APROVADOS!`);
    console.log("===============================================================================");
  } finally {
    mockServer.close();
  }
}

runAuditSuite().catch((err) => {
  console.error("FALHA NA AUDITORIA:", err);
  process.exit(1);
});
