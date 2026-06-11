'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MARKALAR = ['Audi', 'BMW', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mercedes', 'Nissan', 'Opel', 'Peugeot', 'Renault', 'Skoda', 'Toyota', 'Volkswagen', 'Volvo']
const YAKITLAR = ['Benzin', 'Dizel', 'Hibrit', 'Elektrik', 'LPG']
const VITESLER = ['Manuel', 'Otomatik', 'Yarı Otomatik']

export default function AracEklePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    marka: '', model: '', yil: new Date().getFullYear().toString(),
    fiyat: '', km: '', yakit: 'Benzin', vites: 'Otomatik',
    renk: '', aciklama: '', ozellikler: '',
    kampanya: false, kampanya_etiketi: '', aktif: true,
    fotograflar: '',
  })

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const gonder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Gerçek uygulamada: await fetch('/api/admin/araclar', { method: 'POST', body: JSON.stringify(...) })
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    router.push('/admin')
  }

  const Label = ({ children, required }: { children: React.ReactNode, required?: boolean }) => (
    <label className="block text-sm font-medium text-ink-700 mb-1.5">
      {children} {required && <span className="text-brand-600">*</span>}
    </label>
  )
  const inputCls = "w-full border border-ink-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-ink-400 hover:text-ink-700 transition-colors">
          ← Geri
        </button>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Yeni Araç Ekle</h1>
      </div>

      <form onSubmit={gonder} className="space-y-6">
        {/* Temel bilgiler */}
        <div className="bg-white border border-ink-100 rounded-2xl p-6 space-y-4">
          <h2 className="font-medium text-ink-900 text-sm border-b border-ink-100 pb-3">Araç Bilgileri</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label required>Marka</Label>
              <select value={form.marka} onChange={e => set('marka', e.target.value)} required className={inputCls}>
                <option value="">Seçin</option>
                {MARKALAR.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <Label required>Model</Label>
              <input type="text" value={form.model} onChange={e => set('model', e.target.value)} required className={inputCls} placeholder="320i, C180…" />
            </div>
            <div>
              <Label required>Yıl</Label>
              <input type="number" value={form.yil} onChange={e => set('yil', e.target.value)} required min={1990} max={2025} className={inputCls} />
            </div>
            <div>
              <Label required>Fiyat (₺)</Label>
              <input type="number" value={form.fiyat} onChange={e => set('fiyat', e.target.value)} required className={inputCls} placeholder="1500000" />
            </div>
            <div>
              <Label required>Kilometre</Label>
              <input type="number" value={form.km} onChange={e => set('km', e.target.value)} required className={inputCls} placeholder="45000" />
            </div>
            <div>
              <Label>Renk</Label>
              <input type="text" value={form.renk} onChange={e => set('renk', e.target.value)} className={inputCls} placeholder="Beyaz" />
            </div>
            <div>
              <Label required>Yakıt</Label>
              <select value={form.yakit} onChange={e => set('yakit', e.target.value)} className={inputCls}>
                {YAKITLAR.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <Label required>Vites</Label>
              <select value={form.vites} onChange={e => set('vites', e.target.value)} className={inputCls}>
                {VITESLER.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div>
            <Label>Açıklama</Label>
            <textarea value={form.aciklama} onChange={e => set('aciklama', e.target.value)} rows={3} className={inputCls + ' resize-none'} placeholder="Araç hakkında detaylı bilgi…" />
          </div>
          <div>
            <Label>Donanımlar (virgülle ayırın)</Label>
            <input type="text" value={form.ozellikler} onChange={e => set('ozellikler', e.target.value)} className={inputCls} placeholder="Sunroof, Deri Koltuk, Geri Görüş Kamerası" />
          </div>
        </div>

        {/* Fotoğraflar */}
        <div className="bg-white border border-ink-100 rounded-2xl p-6 space-y-3">
          <h2 className="font-medium text-ink-900 text-sm border-b border-ink-100 pb-3">Fotoğraflar</h2>
          <p className="text-xs text-ink-400">Fotoğraf URL'lerini virgülle ayırın. (Supabase Storage entegrasyonu ile yükleme desteği eklenecek)</p>
          <textarea value={form.fotograflar} onChange={e => set('fotograflar', e.target.value)} rows={3} className={inputCls + ' resize-none'} placeholder="https://…jpg, https://…jpg" />
        </div>

        {/* Kampanya */}
        <div className="bg-white border border-ink-100 rounded-2xl p-6 space-y-3">
          <h2 className="font-medium text-ink-900 text-sm border-b border-ink-100 pb-3">Kampanya & Durum</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.kampanya} onChange={e => set('kampanya', e.target.checked)} className="w-4 h-4 rounded accent-brand-600" />
            <span className="text-sm text-ink-700">Kampanyalı olarak işaretle</span>
          </label>
          {form.kampanya && (
            <div>
              <Label>Kampanya Etiketi</Label>
              <input type="text" value={form.kampanya_etiketi} onChange={e => set('kampanya_etiketi', e.target.value)} className={inputCls} placeholder="Fiyat Düştü, Hızlı Satış…" />
            </div>
          )}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.aktif} onChange={e => set('aktif', e.target.checked)} className="w-4 h-4 rounded accent-brand-600" />
            <span className="text-sm text-ink-700">Aktif (sitede görünsün)</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="flex-1 border border-ink-200 text-ink-700 py-3 rounded-xl text-sm font-medium hover:bg-ink-50 transition">
            İptal
          </button>
          <button type="submit" disabled={loading} className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-medium transition">
            {loading ? 'Kaydediliyor…' : 'Aracı Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
}
