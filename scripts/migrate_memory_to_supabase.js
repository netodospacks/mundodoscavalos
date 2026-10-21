/**
 * Script de Migração: Memória / Cache Local -> Supabase
 *
 * Utilização:
 *   SUPABASE_URL=https://xyz.supabase.co SUPABASE_SERVICE_ROLE_KEY=ey... node scripts/migrate_memory_to_supabase.js
 */

const fs = require("node:fs");
const path = require("node:path");

async function runMigration() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("ERRO: É necessário definir SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente.");
    process.exit(1);
  }

  const cachePath = path.join(process.cwd(), ".next", "orders_cache.json");
  if (!fs.existsSync(cachePath)) {
    console.log("Nenhum arquivo .next/orders_cache.json encontrado. Nada a migrar.");
    return;
  }

  const raw = fs.readFileSync(cachePath, "utf-8");
  const orders = JSON.parse(raw);
  const orderList = Object.values(orders);

  console.log(`Encontrados ${orderList.length} pedidos no cache local para migração ao Supabase: ${supabaseUrl}`);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates",
  };

  for (const order of orderList) {
    console.log(`Migrando pedido ${order.id}...`);

    const orderRow = {
      id: order.id,
      access_token: order.accessToken,
      idempotency_key: order.idempotencyKey || null,
      status: order.status,
      charge_status: order.chargeStatus || "not_generated",
      customer_name: order.customer.name,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      customer_cpf: order.customer.cpf || null,
      subtotal_cents: order.pricing.subtotal,
      discount_cents: order.pricing.discount,
      fee_cents: order.pricing.fee,
      total_cents: order.pricing.total,
      delivery_type: order.delivery.type,
      delivery_title: order.delivery.title,
      delivery_location: order.delivery.location || null,
      delivery_instructions: order.delivery.instructions || null,
      pix_provider: order.pix?.provider || null,
      pix_charge_id: order.pix?.chargeId || null,
      pix_qr_code_url: order.pix?.qrCodeUrl || null,
      pix_copy_paste: order.pix?.copyAndPasteCode || null,
      pix_expires_at: order.pix?.expiresAt || null,
      created_at: order.createdAt,
      updated_at: order.updatedAt,
      paid_at: order.paidAt || null,
    };

    const resOrder = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/orders?on_conflict=id`, {
      method: "POST",
      headers,
      body: JSON.stringify(orderRow),
    });

    if (!resOrder.ok) {
      const err = await resOrder.text();
      console.error(`Erro ao migrar pedido ${order.id}: ${err}`);
      continue;
    }

    if (order.items && order.items.length > 0) {
      const items = order.items.map((i) => ({
        order_id: order.id,
        product_id: i.id,
        title: i.title,
        subtitle: i.subtitle || null,
        modality: i.modality,
        image_url: i.image || null,
        unit_price_cents: i.unitPrice,
        quantity: i.quantity,
        created_at: order.createdAt,
      }));

      await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/order_items?on_conflict=order_id,product_id`, {
        method: "POST",
        headers,
        body: JSON.stringify(items),
      });
    }

    if (order.events && order.events.length > 0) {
      const events = order.events.map((e) => ({
        order_id: order.id,
        event_type: e.type,
        description: e.description,
        created_at: e.timestamp,
      }));

      await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/order_events?on_conflict=order_id,event_type,created_at`, {
        method: "POST",
        headers,
        body: JSON.stringify(events),
      });
    }

    console.log(`✓ Pedido ${order.id} migrado com sucesso.`);
  }

  console.log("\nMigração concluída com sucesso!");
}

runMigration().catch((err) => {
  console.error("Falha fatal na migração:", err);
  process.exit(1);
});
