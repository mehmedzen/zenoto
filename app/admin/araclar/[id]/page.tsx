'use client'
import { useRouter } from 'next/navigation'
import { mockAraclar } from '@/lib/mockdata'
import { useState } from 'react'

export default function AracDuzenlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const arac = mockAraclar.find(a => a.id === params.id)
  const [loading, setLoading] = useState(false)

  if (!arac) return <div className="p-10 text-center text-ink-400">Araç bulunamadı.</div>

  const [form, setForm] = useState({
    fiyat: arac.fiyat.toString(),
    km: arac.km.toString(),
    aciklama: arac.aciklama,
    kampanya: arac.kampanya,
    kampanya_etiketi: arac.kampanya_etiketi || '',
    aktif: arac.aktif,
  })

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))
  const inputCls = "w-full border border-ink-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"

  const kaydet = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    router.push('/admin')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-ink-400 hover:text-ink-700">← Geri</button>
        <h1 className="font-display text-2xl font-semibold text-ink-900">
          {arac.marka} {arac.model} — Düzenle
        </h1>
      </div>
      <form onSubmit={kaydet} className="space-y-6">
        <div className="bg-white border border-ink-100 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Fiyat (₺)</label>
              <input type="number" value={form.fiyat} onChange={e => set('fiyat', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Kilometre</label>
              <input type="number" value={form.km} onChange={e => set('km', e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Açıklama</label>
            <textarea value={form.aciklama} onChange={e => set('aciklama', e.target.value)} rows={3} className={inputCls + ' resize-none'} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.kampanya} onChange={e => set('kampanya', e.target.checked)} className="w-4 h-4 rounded accent-brand-600" />
            <span className="text-sm text-ink-700">Kampanyalı</span>
          </label>
          {form.kampanya && (
            <input type="text" value={form.kampanya_etiketi} onChange={e => set('kampanya_etiketi', e.target.value)} placeholder="Kampanya etiketi" className={inputCls} />
          )}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.aktif} onChange={e => set('aktif', e.target.checked)} className="w-4 h-4 rounded accent-brand-600" />
            <span className="text-sm text-ink-700">Aktif</span>
          </label>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="flex-1 border border-ink-200 text-ink-700 py-3 rounded-xl text-sm font-medium">İptal</button>
          <button type="submit" disabled={loading} className="flex-1 bg-brand-600 text-white py-3 rounded-xl text-sm font-medium disabled:opacity-60">
            {loading ? 'Kaydediliyor…' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
}
