'use client'
import { useState } from 'react'

export default function IletisimPage() {
  const [form, setForm] = useState({ ad: '', telefon: '', email: '', mesaj: '' })
  const [durum, setDurum] = useState<'idle' | 'loading' | 'ok' | 'hata'>('idle')

  const guncelle = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const gonder = async (e: React.FormEvent) => {
    e.preventDefault()
    setDurum('loading')
    try {
      const res = await fetch('/api/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setDurum(res.ok ? 'ok' : 'hata')
    } catch {
      setDurum('hata')
    }
  }

  const Input = ({ label, type = 'text', field, required = false }: {
    label: string, type?: string, field: keyof typeof form, required?: boolean
  }) => (
    <div>
      <label className="block text-sm font-medium text-ink-700 mb-1.5">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input
        type={type}
        value={form[field]}
        onChange={e => guncelle(field, e.target.value)}
        required={required}
        className="w-full border border-ink-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
      />
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold text-ink-900">İletişim</h1>
        <p className="text-ink-400 mt-2">Sorularınız için bize ulaşın, en kısa sürede dönüş yapalım.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-10">
        {/* Form */}
        <div className="md:col-span-3">
          {durum === 'ok' ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h2 className="font-display text-xl font-semibold text-green-800">Mesajınız alındı!</h2>
              <p className="text-green-700 mt-2 text-sm">En kısa sürede size dönüş yapacağız.</p>
              <button
                onClick={() => { setDurum('idle'); setForm({ ad: '', telefon: '', email: '', mesaj: '' }) }}
                className="mt-4 text-sm text-green-600 hover:underline"
              >
                Yeni mesaj gönder
              </button>
            </div>
          ) : (
            <form onSubmit={gonder} className="bg-white border border-ink-100 rounded-2xl p-6 space-y-4">
              <Input label="Adınız Soyadınız" field="ad" required />
              <Input label="Telefon" type="tel" field="telefon" required />
              <Input label="E-posta" type="email" field="email" />
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  Mesajınız <span className="text-brand-600">*</span>
                </label>
                <textarea
                  value={form.mesaj}
                  onChange={e => guncelle('mesaj', e.target.value)}
                  required
                  rows={4}
                  className="w-full border border-ink-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition resize-none"
                />
              </div>
              <p className="text-xs text-ink-400">
                Formu göndererek <strong>KVKK Aydınlatma Metni</strong>'ni okuduğunuzu kabul etmiş olursunuz.
              </p>
              {durum === 'hata' && (
                <p className="text-red-600 text-sm">Gönderim sırasında hata oluştu. Lütfen tekrar deneyin.</p>
              )}
              <button
                type="submit"
                disabled={durum === 'loading'}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-medium py-3 rounded-xl transition-colors"
              >
                {durum === 'loading' ? 'Gönderiliyor…' : 'Mesaj Gönder'}
              </button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div className="md:col-span-2 space-y-4">
          {[
            { icon: '📞', title: 'Telefon', val: '0212 000 00 00', href: 'tel:02120000000' },
            { icon: '💬', title: 'WhatsApp', val: 'Hemen yazın', href: 'https://wa.me/902120000000' },
            { icon: '📧', title: 'E-posta', val: 'info@otosec.com.tr', href: 'mailto:info@otosec.com.tr' },
            { icon: '📍', title: 'Adres', val: 'İstanbul, Türkiye', href: undefined },
          ].map(c => (
            <div key={c.title} className="bg-white border border-ink-100 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <div className="text-xs text-ink-400">{c.title}</div>
                {c.href ? (
                  <a href={c.href} className="text-sm font-medium text-ink-900 hover:text-brand-600">{c.val}</a>
                ) : (
                  <span className="text-sm font-medium text-ink-900">{c.val}</span>
                )}
              </div>
            </div>
          ))}
          <div className="bg-ink-900 rounded-2xl p-5 text-white text-sm">
            <p className="font-medium mb-1">Çalışma Saatleri</p>
            <p className="text-ink-400">Pzt–Cmt: 09:00 – 19:00</p>
            <p className="text-ink-400">Pazar: 10:00 – 17:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}
