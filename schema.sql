-- ============================================================================
-- GLAM HAUTE PARFUMS — Neon Serverless PostgreSQL Schema
-- Таблицы:
--   1. neon_files — Хранение файлов (картинки чеков оплаты и загруженные фото духов)
--   2. perfumes   — Каталог мужских, женских и нишевых парфюмов (включая раздел «Новинки»)
--   3. orders     — Оплаченные заказы (сохраняются строго после подтверждения оплаты)
-- ============================================================================

CREATE TABLE IF NOT EXISTS neon_files (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'receipt', -- 'receipt' | 'product_image'
  data_url TEXT NOT NULL,                   -- Base64 Data URL / Binary payload
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS perfumes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  gender TEXT NOT NULL,                     -- 'men' | 'women' | 'celebrity'
  volume TEXT NOT NULL DEFAULT '100 ml',
  price_uzs BIGINT NOT NULL,
  is_new BOOLEAN NOT NULL DEFAULT TRUE,
  created_at BIGINT NOT NULL,
  image_url TEXT NOT NULL,
  file_id TEXT REFERENCES neon_files(id) ON DELETE SET NULL,
  desc_ru TEXT DEFAULT '',
  desc_uz TEXT DEFAULT '',
  desc_en TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_date TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_comment TEXT DEFAULT '',
  items_json JSONB NOT NULL,
  total_uzs BIGINT NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status = 'PAID'),
  payment_provider TEXT NOT NULL,           -- 'Payme' | 'CLICK' | 'Stripe'
  transaction_id TEXT NOT NULL,
  masked_card TEXT DEFAULT '',
  receipt_file_id TEXT REFERENCES neon_files(id) ON DELETE SET NULL,
  receipt_data_url TEXT,
  telegram_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_perfumes_created_at ON perfumes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_neon_files_category ON neon_files(category);
