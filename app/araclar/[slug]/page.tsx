'use client'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { mockAraclar } from '@/lib/mockdata'

function formatFiyat(n: number) {
  return new Intl.NumberFormat('tr-TR').format(n) + ' ₺'
}

export default function AracDetayPage({ params }: { params: { slug: string } }) {
  const arac = mockAraclar.find(a => a.slug === params.slug)
  if (!arac) notFound()

  const [aktifFoto, setAktifFoto] = useState(0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-600">Ana Sayfa</Link>
        <span>/</span>
        <Link href="/araclar" className="hover:text-brand-600">Araçlar</Link>
        <span>/</span>
        <span className="text-ink-700">{arac.marka} {arac.model}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── LEFT: GALLERY + INFO ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main photo */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-ink-100">
            <Image
              src={arac.fotograflar[aktifFoto] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'}
              alt={`${arac.marka} ${arac.model}`}
              fill
              className="object-cover"
              priority
            />
            {arac.kampanya && arac.kampanya_etiketi && (
              <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {arac.kampanya_etiketi}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {arac.fotograflar.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {arac.fotograflar.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setAktifFoto(i)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-colors ${
                    i === aktifFoto ? 'border-brand-500' : 'border-transparent'
                  }`}
                >
                  <Image src={f} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Specs grid */}
          <div className="bg-white border border-ink-100 rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">Araç Bilgileri</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { lbl: 'Marka', val: arac.marka },
                { lbl: 'Model', val: arac.model },
                { lbl: 'Yıl', val: arac.yil },
                { lbl: 'Kilometre', val: new Intl.NumberFormat('tr-TR').format(arac.km) + ' km' },
                { lbl: 'Yakıt', val: arac.yakit },
                { lbl: 'Vites', val: arac.vites },
                { lbl: 'Renk', val: arac.renk },
              ].map(s => (
                <div key={s.lbl} className="bg-ink-50 rounded-xl p-3">
                  <div className="text-xs text-ink-400 mb-0.5">{s.lbl}</div>
                  <div className="font-medium text-ink-900 text-sm">{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-ink-100 rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">Açıklama</h2>
            <p className="text-ink-600 text-sm leading-relaxed">{arac.aciklama}</p>
          </div>

          {/* Features */}
          {arac.ozellikler.length > 0 && (
            <div className="bg-white border border-ink-100 rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">Donanımlar</h2>
              <div className="flex flex-wrap gap-2">
                {arac.ozellikler.map(o => (
                  <span key={o} className="bg-ink-50 border border-ink-100 text-ink-700 text-xs px-3 py-1.5 rounded-full">
                    ✓ {o}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: PRICE + CTA ── */}
        <div className="space-y-4">
          <div className="bg-white border border-ink-100 rounded-2xl p-6 sticky top-20">
            <div className="font-display text-3xl font-semibold text-brand-600">
              {formatFiyat(arac.fiyat)}
            </div>
            <div className="text-ink-400 text-sm mt-1">{arac.yil} · {new Intl.NumberFormat('tr-TR').format(arac.km)} km</div>

            <div className="mt-6 space-y-3">
              <Link
                href={`/iletisim?arac=${arac.slug}`}
                className="block w-full bg-brand-600 hover:bg-brand-700 text-white font-medium text-center py-3 rounded-xl transition-colors"
              >
                Bilgi Al / Teklif İste
              </Link>
              <a
                href="https://wa.me/902120000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-green-500 text-green-700 hover:bg-green-50 font-medium py-3 rounded-xl transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.837L.057 24l6.352-1.453A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.811 9.811 0 01-5.003-1.368l-.36-.214-3.72.851.865-3.611-.234-.373A9.813 9.813 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182S21.818 6.573 21.818 12 17.427 21.818 12 21.818z"/>
                </svg>
                WhatsApp ile Yaz
              </a>
              <a
                href="tel:02120000000"
                className="flex items-center justify-center gap-2 w-full border border-ink-200 text-ink-700 hover:bg-ink-50 font-medium py-3 rounded-xl transition-colors text-sm"
              >
                📞 Ara: 0212 000 00 00
              </a>
            </div>

            <div className="mt-5 pt-5 border-t border-ink-100 space-y-2">
              {['Ekspertiz Onaylı', 'Tramer Yok', 'Belge Garantili'].map(b => (
                <div key={b} className="flex items-center gap-2 text-sm text-ink-600">
                  <span className="text-green-500">✓</span> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Car',
          name: `${arac.marka} ${arac.model}`,
          brand: { '@type': 'Brand', name: arac.marka },
          modelDate: arac.yil,
          mileageFromOdometer: { '@type': 'QuantitativeValue', value: arac.km, unitCode: 'KMT' },
          offers: {
            '@type': 'Offer',
            price: arac.fiyat,
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
          }
        })}}
      />
    </div>
  )
}
