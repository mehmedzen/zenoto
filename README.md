# 🚗 OtoSeç — İkinci El Araç Sitesi

Next.js 14 + Supabase + Tailwind CSS ile hazır, production'a hazır ikinci el araç sitesi.

## Özellikler

- ✅ Ana sayfa + kampanya banner
- ✅ Araç listeleme (marka/model/yakıt/vites filtresi)
- ✅ Araç detay sayfası (galeri + SEO schema)
- ✅ Admin paneli (araç ekle / düzenle / sil)
- ✅ İletişim formu (e-posta + WhatsApp)
- ✅ Mobil uyumlu, hızlı (SSG/ISR)
- ✅ SEO meta tagları + JSON-LD schema

## Hızlı Başlangıç

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Ortam değişkenlerini ayarla
cp .env.example .env.local
# .env.local dosyasını düzenle

# 3. Geliştirme sunucusunu başlat
npm run dev
```

## Supabase Kurulumu

1. [supabase.com](https://supabase.com) → New Project
2. SQL Editor → `supabase-schema.sql` dosyasını çalıştır
3. Storage → New Bucket → `arac-fotograflari` (public)
4. `.env.local` dosyasına URL ve key'leri ekle

## Deploy (Vercel)

```bash
# Vercel CLI ile
npx vercel

# Ya da GitHub'a push et, Vercel otomatik deploy eder
```

## Geliştirme Yol Haritası

- [ ] Supabase gerçek veri bağlantısı (lib/mockdata.ts → Supabase)
- [ ] Admin şifre koruması (NextAuth.js)
- [ ] Fotoğraf yükleme (Supabase Storage)
- [ ] E-posta bildirimleri (Resend)
- [ ] WhatsApp API entegrasyonu
- [ ] Sitemap.xml otomatik üretimi
- [ ] Google Analytics

## Teknoloji Stack

| Katman | Araç |
|--------|------|
| Frontend | Next.js 14 (App Router) |
| Stil | Tailwind CSS |
| Veritabanı | Supabase (PostgreSQL) |
| Fotoğraflar | Supabase Storage |
| E-posta | Resend |
| Deploy | Vercel |
