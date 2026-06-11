import Link from 'next/link'
import Image from 'next/image'
import AracKart from '@/components/AracKart'
import { mockAraclar } from '@/lib/mockdata'

export default function HomePage() {
  const kampanyaAraclar = mockAraclar.filter(a => a.kampanya).slice(0, 3)
  const sonEklenenler = mockAraclar.slice(0, 3)

  return (
    <>
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-ink-900 text-white min-h-[540px] flex items-center">
        {/* BG pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #ea580c 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #c2410c 0%, transparent 40%)`
          }}
        />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=60')] bg-cover bg-center opacity-15" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-block bg-brand-600/20 border border-brand-500/30 text-brand-200 text-xs font-medium px-3 py-1 rounded-full mb-4">
              ✦ Ekspertiz Onaylı Araçlar
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight text-balance">
              Hayalindeki arabayı <span className="text-brand-400">bul.</span>
            </h1>
            <p className="mt-4 text-ink-400 text-lg leading-relaxed max-w-md">
              Seçilmiş, güvenilir ikinci el araçlar. Tramer yok, sürpriz yok.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/araclar"
                className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
              >
                Tüm Araçlara Bak
              </Link>
              <Link
                href="/iletisim"
                className="border border-white/20 hover:border-white/40 text-white font-medium px-6 py-3 rounded-xl transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: mockAraclar.length + '+', lbl: 'Araç Stokta' },
              { val: '100%', lbl: 'Ekspertiz Onaylı' },
              { val: '0', lbl: 'Tramer' },
              { val: '7/24', lbl: 'Müşteri Desteği' },
            ].map(s => (
              <div key={s.lbl} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <div className="font-display text-3xl font-semibold text-brand-400">{s.val}</div>
                <div className="text-ink-400 text-sm mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KAMPANYA BANNER ── */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <div className="rounded-2xl overflow-hidden relative bg-gradient-to-r from-brand-600 to-brand-700 text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.1) 20px, rgba(255,255,255,.1) 21px)' }}
          />
          <div className="relative">
            <span className="text-brand-100 text-xs font-medium uppercase tracking-widest">Bu Ay Özel</span>
            <h2 className="font-display text-3xl font-semibold mt-1">Temmuz Kampanyası</h2>
            <p className="text-brand-100 mt-2">Seçili araçlarda fiyat avantajı + ücretsiz ekspertiz</p>
          </div>
          <Link
            href="/araclar?kampanya=true"
            className="relative bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors whitespace-nowrap"
          >
            Kampanyalı Araçlar →
          </Link>
        </div>
      </section>

      {/* ── KAMPANYALI ARAÇLAR ── */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-ink-900">Kampanyalı Araçlar</h2>
          <Link href="/araclar?kampanya=true" className="text-brand-600 text-sm font-medium hover:underline">
            Tümünü gör →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {kampanyaAraclar.map(a => <AracKart key={a.id} arac={a} />)}
        </div>
      </section>

      {/* ── SON EKLENENLER ── */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-ink-900">Son Eklenenler</h2>
          <Link href="/araclar" className="text-brand-600 text-sm font-medium hover:underline">
            Tümünü gör →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sonEklenenler.map(a => <AracKart key={a.id} arac={a} />)}
        </div>
      </section>

      {/* ── NEDEN OTOSEÇ ── */}
      <section className="max-w-6xl mx-auto px-4 mt-20 mb-10">
        <h2 className="font-display text-2xl font-semibold text-center text-ink-900 mb-10">Neden OtoSeç?</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { icon: '🔍', title: 'Ekspertiz Onaylı', desc: 'Her araç profesyonel ekspertiz sürecinden geçer' },
            { icon: '📋', title: 'Şeffaf Geçmiş', desc: 'Tramer kaydı, servis geçmişi açık paylaşım' },
            { icon: '🤝', title: 'Güvenli Alım', desc: 'Sözleşmeli, belgelenmiş satış süreci' },
            { icon: '💬', title: '7/24 Destek', desc: 'WhatsApp ve telefon ile anında iletişim' },
          ].map(f => (
            <div key={f.title} className="bg-white border border-ink-100 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-medium text-ink-900 text-sm mb-1">{f.title}</h3>
              <p className="text-ink-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
