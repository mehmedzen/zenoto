'use client'
import { useState, useMemo } from 'react'
import AracKart from '@/components/AracKart'
import { mockAraclar, markalar, yakitTipleri, vitesTipleri } from '@/lib/mockdata'

const SIRALAMA = [
  { val: 'yeni', lbl: 'En Yeni' },
  { val: 'fiyat_asc', lbl: 'Fiyat: Düşük → Yüksek' },
  { val: 'fiyat_desc', lbl: 'Fiyat: Yüksek → Düşük' },
  { val: 'km_asc', lbl: 'En Az KM' },
]

export default function AraclarPage() {
  const [marka, setMarka] = useState('')
  const [yakit, setYakit] = useState('')
  const [vites, setVites] = useState('')
  const [kampanya, setKampanya] = useState(false)
  const [siralama, setSiralama] = useState('yeni')
  const [aramaText, setAramaText] = useState('')

  const sonuclar = useMemo(() => {
    let list = [...mockAraclar]
    if (marka) list = list.filter(a => a.marka === marka)
    if (yakit) list = list.filter(a => a.yakit === yakit)
    if (vites) list = list.filter(a => a.vites === vites)
    if (kampanya) list = list.filter(a => a.kampanya)
    if (aramaText.trim()) {
      const q = aramaText.toLowerCase()
      list = list.filter(a =>
        `${a.marka} ${a.model}`.toLowerCase().includes(q)
      )
    }
    if (siralama === 'fiyat_asc') list.sort((a, b) => a.fiyat - b.fiyat)
    else if (siralama === 'fiyat_desc') list.sort((a, b) => b.fiyat - a.fiyat)
    else if (siralama === 'km_asc') list.sort((a, b) => a.km - b.km)
    else list.sort((a, b) => b.created_at.localeCompare(a.created_at))
    return list
  }, [marka, yakit, vites, kampanya, siralama, aramaText])

  const temizle = () => {
    setMarka(''); setYakit(''); setVites(''); setKampanya(false); setAramaText('')
  }

  const Select = ({ value, onChange, options, placeholder }: {
    value: string, onChange: (v: string) => void, options: string[], placeholder: string
  }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white border border-ink-200 rounded-xl px-3 py-2.5 text-sm text-ink-700 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink-900">Araçlar</h1>
        <p className="text-ink-400 mt-1">{sonuclar.length} araç listeleniyor</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── FILTER SIDEBAR ── */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white border border-ink-100 rounded-2xl p-5 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-ink-900 text-sm">Filtreler</h2>
              {(marka || yakit || vites || kampanya) && (
                <button onClick={temizle} className="text-xs text-brand-600 hover:underline">Temizle</button>
              )}
            </div>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Marka veya model ara…"
                value={aramaText}
                onChange={e => setAramaText(e.target.value)}
                className="w-full bg-ink-50 border border-ink-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div className="space-y-3">
              <Select value={marka} onChange={setMarka} options={markalar} placeholder="Tüm Markalar" />
              <Select value={yakit} onChange={setYakit} options={yakitTipleri} placeholder="Tüm Yakıt Tipleri" />
              <Select value={vites} onChange={setVites} options={vitesTipleri} placeholder="Tüm Vites Tipleri" />
            </div>

            <label className="flex items-center gap-2.5 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={kampanya}
                onChange={e => setKampanya(e.target.checked)}
                className="w-4 h-4 rounded accent-brand-600"
              />
              <span className="text-sm text-ink-700">Sadece Kampanyalı</span>
            </label>
          </div>
        </aside>

        {/* ── LISTING ── */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm text-ink-400">{sonuclar.length} araç</span>
            <select
              value={siralama}
              onChange={e => setSiralama(e.target.value)}
              className="bg-white border border-ink-200 rounded-xl px-3 py-2 text-sm text-ink-700 focus:outline-none focus:border-brand-400"
            >
              {SIRALAMA.map(s => <option key={s.val} value={s.val}>{s.lbl}</option>)}
            </select>
          </div>

          {sonuclar.length === 0 ? (
            <div className="text-center py-20 text-ink-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>Bu kriterlere uygun araç bulunamadı.</p>
              <button onClick={temizle} className="mt-3 text-brand-600 text-sm hover:underline">Filtreleri temizle</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {sonuclar.map(a => <AracKart key={a.id} arac={a} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
