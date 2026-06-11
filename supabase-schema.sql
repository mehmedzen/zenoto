-- ============================================================
-- OtoSeç — Supabase SQL Şeması
-- Supabase SQL Editor'de çalıştırın
-- ============================================================

-- Araçlar tablosu
CREATE TABLE IF NOT EXISTS araclar (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  marka       TEXT NOT NULL,
  model       TEXT NOT NULL,
  yil         INTEGER NOT NULL,
  fiyat       BIGINT NOT NULL,
  km          INTEGER NOT NULL,
  yakit       TEXT NOT NULL,
  vites       TEXT NOT NULL,
  renk        TEXT,
  aciklama    TEXT,
  ozellikler  TEXT[] DEFAULT '{}',
  fotograflar TEXT[] DEFAULT '{}',
  kampanya    BOOLEAN DEFAULT FALSE,
  kampanya_etiketi TEXT,
  aktif       BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- İletişim formları tablosu
CREATE TABLE IF NOT EXISTS iletisim_formlari (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ad       TEXT NOT NULL,
  telefon  TEXT NOT NULL,
  email    TEXT,
  mesaj    TEXT NOT NULL,
  arac_id  UUID REFERENCES araclar(id) ON DELETE SET NULL,
  okundu   BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aktif araçlar için index
CREATE INDEX IF NOT EXISTS idx_araclar_aktif ON araclar(aktif);
CREATE INDEX IF NOT EXISTS idx_araclar_marka ON araclar(marka);
CREATE INDEX IF NOT EXISTS idx_araclar_kampanya ON araclar(kampanya);

-- Row Level Security: sadece aktif araçlar herkese açık
ALTER TABLE araclar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Aktif araçlar herkese açık"
  ON araclar FOR SELECT
  USING (aktif = TRUE);

-- İletişim formları sadece service role okuyabilir
ALTER TABLE iletisim_formlari ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Formlar sadece insert"
  ON iletisim_formlari FOR INSERT
  WITH CHECK (TRUE);

-- Storage bucket (Supabase Storage > New Bucket)
-- Bucket adı: arac-fotograflari
-- Public: true
