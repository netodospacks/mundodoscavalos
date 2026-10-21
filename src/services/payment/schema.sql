-- ==============================================================================
-- SCHEMA DE BANCO DE DADOS — PEDIDOS E CHECKOUT PIX
-- Haras Nossa Senhora Aparecida / Mundo dos Cavalos
-- Compatível com PostgreSQL 14+ e Supabase
-- ==============================================================================

-- 1. Criação do Tipo de Status do Pedido
DO $$ BEGIN
  CREATE TYPE order_status_enum AS ENUM (
    'pending_payment',
    'paid',
    'expired',
    'cancelled',
    'payment_failed'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Criação do Tipo de Status da Cobrança Pix
DO $$ BEGIN
  CREATE TYPE charge_status_enum AS ENUM (
    'not_generated',
    'charge_created',
    'charge_paid',
    'charge_expired',
    'charge_failed'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Tabela Principal de Pedidos
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(64) PRIMARY KEY, -- Ex: JAR-2026-AB12
  access_token VARCHAR(128) NOT NULL, -- Token de consulta segura (48 chars hex)
  idempotency_key VARCHAR(128) NULL, -- Chave de idempotência para prevenir pedidos duplicados
  status order_status_enum NOT NULL DEFAULT 'pending_payment',
  charge_status charge_status_enum NOT NULL DEFAULT 'not_generated',
  
  -- Dados do Cliente
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(32) NOT NULL,
  customer_cpf VARCHAR(20) NULL,
  
  -- Precificação em Centavos (Prevenção de erro de arredondamento)
  subtotal_cents INTEGER NOT NULL CHECK (subtotal_cents >= 0),
  discount_cents INTEGER NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
  fee_cents INTEGER NOT NULL DEFAULT 0 CHECK (fee_cents >= 0),
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
  
  -- Modalidade de Entrega / Retirada
  delivery_type VARCHAR(32) NOT NULL DEFAULT 'in_person',
  delivery_title VARCHAR(255) NOT NULL,
  delivery_location TEXT NULL,
  delivery_instructions TEXT NULL,
  
  -- Dados da Cobrança Pix
  pix_provider VARCHAR(64) NULL,
  pix_charge_id VARCHAR(128) NULL,
  pix_qr_code_url TEXT NULL,
  pix_copy_paste TEXT NULL,
  pix_expires_at TIMESTAMPTZ NULL,
  
  -- Auditoria de Datas
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ NULL
);

-- 4. Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(128) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NULL,
  modality VARCHAR(64) NOT NULL,
  image_url TEXT NULL,
  unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents >= 0),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_order_item UNIQUE (order_id, product_id)
);

-- 5. Tabela de Eventos e Auditoria do Pedido
CREATE TABLE IF NOT EXISTS order_events (
  id BIGSERIAL PRIMARY KEY,
  order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  event_type VARCHAR(64) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_order_event UNIQUE (order_id, event_type, created_at)
);

-- 6. Índices para Performance e Segurança
CREATE INDEX IF NOT EXISTS idx_orders_access_token ON orders(access_token);
CREATE UNIQUE INDEX IF NOT EXISTS uq_orders_idempotency_key ON orders(idempotency_key) WHERE idempotency_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_pix_charge_id ON orders(pix_charge_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_events_order_id ON order_events(order_id);

-- 7. Trigger para Atualização Automática de updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trigger_orders_updated_at'
      AND tgrelid = 'public.orders'::regclass
      AND NOT tgisinternal
  ) THEN
    CREATE TRIGGER trigger_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

-- 8. Políticas de Segurança em Nível de Linha (Row Level Security - RLS)
-- Garante que clientes anônimos não possam ler nem adulterar pedidos diretamente.
-- Todo acesso administrativo de escrita e leitura operacional é feito exclusivamente
-- pelo servidor Next.js usando a chave SUPABASE_SERVICE_ROLE_KEY.

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_events ENABLE ROW LEVEL SECURITY;

-- 8.1 Políticas de Acesso Total Exclusivo para o Backend Seguro (service_role)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'service_role_orders_all' AND tablename = 'orders'
  ) THEN
    CREATE POLICY "service_role_orders_all" ON orders
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'service_role_order_items_all' AND tablename = 'order_items'
  ) THEN
    CREATE POLICY "service_role_order_items_all" ON order_items
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'service_role_order_events_all' AND tablename = 'order_events'
  ) THEN
    CREATE POLICY "service_role_order_events_all" ON order_events
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- 8.2 Permissões Estritas: Concessão Total ao Backend e Bloqueio ao Navegador
-- No modelo BFF (Backend-For-Frontend) adotado:
-- 1. O servidor Next.js (service_role) tem acesso total a tabelas e sequências auto-incrementais do checkout.
-- 2. Clientes anônimos ou autenticados comuns (anon/authenticated) têm acesso 100% bloqueado.
-- Toda consulta de pedido exige o endpoint protegido /api/orders/[id] com validação
-- do token de acesso em tempo constante.

-- Permissões de tabelas para o backend seguro (service_role)
GRANT ALL ON TABLE orders TO service_role;
GRANT ALL ON TABLE order_items TO service_role;
GRANT ALL ON TABLE order_events TO service_role;

-- Permissões específicas para as sequências auto-incrementais do checkout
GRANT USAGE, SELECT, UPDATE ON SEQUENCE public.order_items_id_seq TO service_role;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE public.order_events_id_seq TO service_role;

-- Revogação estrita para clientes do navegador (anon e authenticated) nas tabelas do checkout
REVOKE ALL ON TABLE orders FROM anon, authenticated;
REVOKE ALL ON TABLE order_items FROM anon, authenticated;
REVOKE ALL ON TABLE order_events FROM anon, authenticated;

-- Revogação estrita nas sequências do checkout
REVOKE ALL ON SEQUENCE public.order_items_id_seq FROM anon, authenticated;
REVOKE ALL ON SEQUENCE public.order_events_id_seq FROM anon, authenticated;


