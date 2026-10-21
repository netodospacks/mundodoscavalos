const assert = require("node:assert");

async function testCheckoutE2E() {
  const PORT = process.env.PORT || "3006";
  const BASE_URL = `http://localhost:${PORT}`;
  console.log(`\n=== INICIANDO TESTES HTTP E2E CONTRA ${BASE_URL} ===\n`);

  // 1. Integridade de outras páginas do site (Garantir que nada foi quebrado)
  console.log("[TESTE 1] Verificação de Integridade das Demais Páginas");
  const pagesToTest = [
    { path: "/", title: "Página Inicial" },
    { path: "/cursos", title: "Portal de Cursos" },
    { path: "/cursos/capacitacao-tratadores-equinos", title: "Curso de Tratadores" },
    { path: "/shopping-jar", title: "Shopping JAR" },
    { path: "/historia", title: "História do Haras" },
  ];

  for (const page of pagesToTest) {
    const res = await fetch(`${BASE_URL}${page.path}`);
    assert.strictEqual(res.status, 200, `Rota ${page.path} (${page.title}) deve responder HTTP 200`);
    console.log(`  ✓ ${page.title} (${page.path}) OK [HTTP 200]`);
  }

  // 2. GET /checkout
  console.log("\n[TESTE 2] GET /checkout — Abertura da rota principal de checkout");
  const resCheckout = await fetch(`${BASE_URL}/checkout`);
  assert.strictEqual(resCheckout.status, 200, "Rota /checkout deve retornar HTTP 200");
  const htmlCheckout = await resCheckout.text();
  assert(htmlCheckout.includes("Haras") || htmlCheckout.includes("Checkout"), "Página deve conter termos do Haras/Checkout");
  console.log("✓ Rota /checkout carregou com sucesso (HTTP 200).");

  // 3. POST /api/orders com corpo vazio
  console.log("\n[TESTE 3] POST /api/orders — Rejeição de payload vazio");
  const resEmpty = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.strictEqual(resEmpty.status, 400, "Payload vazio deve retornar HTTP 400");
  console.log("✓ Validação de payload ausente aprovada.");

  // 4. POST /api/orders com dados inválidos do cliente
  console.log("\n[TESTE 4] POST /api/orders — Validação dos dados do comprador");
  const resInvalidClient = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: "capacitacao-tratadores-equinos",
      customer: {
        name: "Ab",
        email: "email-invalido",
        phone: "123",
      },
    }),
  });
  assert.strictEqual(resInvalidClient.status, 400);
  const dataInvalid = await resInvalidClient.json();
  assert(dataInvalid.error.includes("nome completo"), "Erro deve alertar sobre nome inválido");
  console.log("✓ Rejeição de dados de contato inválidos aprovada.");

  // 5. POST /api/orders com tentativa de adulterar preço pelo navegador
  console.log("\n[TESTE 5] POST /api/orders — Proteção contra alteração de preços no frontend");
  const resTampered = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: "capacitacao-tratadores-equinos",
      unitPrice: 100, // Tentativa hacker de pagar R$ 1,00
      total: 100,
      customer: {
        name: "Carlos Eduardo da Silva",
        email: "carlos@exemplo.com.br",
        phone: "(83) 99888-7766",
        cpf: "123.456.789-10",
      },
    }),
  });
  assert.strictEqual(resTampered.status, 201, "Pedido legítimo deve ser criado com preço oficial do servidor");
  const dataTampered = await resTampered.json();
  assert.strictEqual(dataTampered.pricing.total, 120000, "O total DEVE ser R$ 1.200,00 (120000 centavos), ignorando adulteração do cliente");
  console.log(`✓ Preço recalculado estritamente no servidor: R$ ${(dataTampered.pricing.total / 100).toFixed(2)}.`);

  // 6. POST /api/orders com múltiplos itens e cálculo de quantidade
  console.log("\n[TESTE 6] POST /api/orders — Criação com 2 vagas do curso");
  const resMulti = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [
        { productId: "capacitacao-tratadores-equinos", quantity: 2 },
      ],
      customer: {
        name: "Mariana Souza e Silva",
        email: "mariana.souza@exemplo.com.br",
        phone: "(83) 98765-4321",
        cpf: "987.654.321-00",
      },
    }),
  });
  assert.strictEqual(resMulti.status, 201);
  const orderCreated = await resMulti.json();
  assert(orderCreated.orderId.startsWith("JAR-2026-"), "orderId deve ser JAR-2026-XXXX");
  assert(orderCreated.accessToken.length >= 32, "accessToken deve ser longo e seguro");
  assert.strictEqual(orderCreated.status, "pending_payment", "Status inicial deve ser pending_payment");
  assert.strictEqual(orderCreated.chargeStatus, "not_generated", "ChargeStatus deve ser not_generated");
  assert.strictEqual(orderCreated.pricing.subtotal, 240000, "2 vagas x R$ 1.200 = R$ 2.400,00");
  assert.strictEqual(orderCreated.pricing.fee, 0, "Taxa de entrega = 0");
  assert.strictEqual(orderCreated.pricing.total, 240000);
  assert.strictEqual(orderCreated.pix.isDemonstrationMode, true);
  assert.strictEqual(orderCreated.pix.qrCodeUrl, undefined, "Modo de homologação não gera QR Code falso");
  assert.strictEqual(orderCreated.pix.copyAndPasteCode, undefined, "Modo de homologação não gera Copia e Cola falso");
  console.log(`✓ Pedido ${orderCreated.orderId} criado com 2 vagas. Total: R$ ${(orderCreated.pricing.total / 100).toFixed(2)}.`);

  // 7. GET /api/orders/[id] — Proteção de acesso e isolamento por token
  console.log("\n[TESTE 7] GET /api/orders/[id] — Segurança e Isolamento por Token");
  const resNoToken = await fetch(`${BASE_URL}/api/orders/${orderCreated.orderId}`);
  assert.strictEqual(resNoToken.status, 401, "Acesso sem token deve retornar HTTP 401");

  const resWrongToken = await fetch(`${BASE_URL}/api/orders/${orderCreated.orderId}?token=token-falso-123`);
  assert.strictEqual(resWrongToken.status, 404, "Acesso com token incorreto deve retornar HTTP 404");

  const resAuthorized = await fetch(`${BASE_URL}/api/orders/${orderCreated.orderId}?token=${orderCreated.accessToken}`);
  assert.strictEqual(resAuthorized.status, 200, "Acesso com token legítimo deve retornar HTTP 200");
  const fetchedOrder = await resAuthorized.json();
  assert.strictEqual(fetchedOrder.id, orderCreated.orderId);
  assert.strictEqual(fetchedOrder.customer.name, "Mariana Souza e Silva");
  console.log("✓ Isolamento e segurança por accessToken validados com sucesso.");

  // 8. DELETE /api/orders/[id] — Cancelamento de pedido
  console.log("\n[TESTE 8] DELETE /api/orders/[id] — Cancelamento autorizado");
  const resCancel = await fetch(`${BASE_URL}/api/orders/${orderCreated.orderId}?token=${orderCreated.accessToken}`, {
    method: "DELETE",
  });
  assert.strictEqual(resCancel.status, 200);
  const dataCancel = await resCancel.json();
  assert.strictEqual(dataCancel.status, "cancelled");

  // Consulta novamente para conferir o status persistido
  const resCheckCancelled = await fetch(`${BASE_URL}/api/orders/${orderCreated.orderId}?token=${orderCreated.accessToken}`);
  const orderCancelledCheck = await resCheckCancelled.json();
  assert.strictEqual(orderCancelledCheck.status, "cancelled", "Status deve permanecer cancelled");
  console.log("✓ Ciclo de cancelamento de pedido concluído e persistido.");

  // 9. POST /api/webhooks/pix — Rejeição de webhook sem assinatura válida
  console.log("\n[TESTE 9] POST /api/webhooks/pix — Validação de Assinatura Bancária");
  const resFakeWebhook = await fetch(`${BASE_URL}/api/webhooks/pix`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: orderCreated.orderId,
      event: "PAYMENT_CONFIRMED",
    }),
  });
  assert.strictEqual(resFakeWebhook.status, 401, "Webhook sem assinatura válida deve ser rejeitado com HTTP 401");
  console.log("✓ Webhooks não autenticados rejeitados com HTTP 401.");

  // 10. GET /checkout/retorno
  console.log("\n[TESTE 10] GET /checkout/retorno — Consulta pública de pedido");
  const resReturnPage = await fetch(`${BASE_URL}/checkout/retorno?pedido=${orderCreated.orderId}&token=${orderCreated.accessToken}`);
  assert.strictEqual(resReturnPage.status, 200, "Página de retorno deve carregar com HTTP 200");
  console.log("✓ Página de retorno /checkout/retorno respondeu HTTP 200.");

  console.log("\n=======================================================");
  console.log("TODOS OS TESTES E2E FORAM EXECUTADOS COM 100% DE SUCESSO!");
  console.log("=======================================================\n");
}

testCheckoutE2E().catch((err) => {
  console.error("\n❌ FALHA NO TESTE E2E:", err);
  process.exit(1);
});
