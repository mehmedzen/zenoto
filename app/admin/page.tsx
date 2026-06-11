'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { mockAraclar } from '@/lib/mockdata'
import { Arac } from '@/lib/supabase'

function formatFiyat(n: number) {
  return new Intl.NumberFormat('tr-TR').format(n) + ' ₺'
}

export default function AdminPage() {
  const [araclar, setAraclar] = useState<Arac[]>(mockAraclar)
  const [silOnay, setSilOnay] = useState<string | null>(null)

  const sil = (id: string) => {
    setAraclar(prev => prev.filter(a => a.id !== id))
    setSilOnay(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Yönetim Paneli</h1>
          <p className="text-ink-400 text-sm mt-1">{araclar.length} araç kayıtlı</p>
        </div>
        <Link
          href="/admin/arac-ekle"
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm"
        >
          + Yeni Araç Ekle
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { lbl: 'Toplam Araç', val: araclar.length },
          { lbl: 'Kampanyalı', val: araclar.filter(a => a.kampanya).length },
          { lbl: 'Aktif', val: araclar.filter(a => a.aktif).length },
          { lbl: 'Ortalama Fiyat', val: formatFiyat(Math.round(araclar.reduce((s, a) => s + a.fiyat, 0) / araclar.length)) },
        ].map(s => (
          <div key={s.lbl} className="bg-white border border-ink-100 rounded-2xl p-4">
            <div className="text-xs text-ink-400 mb-1">{s.lbl}</div>
            <div className="font-display text-xl font-semibold text-ink-900">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-ink-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-ink-400">Araç</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-ink-400">Fiyat</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-ink-400">KM</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-ink-400">Durum</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-ink-400">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {araclar.map(a => (
                <tr key={a.id} className="border-b border-ink-50 hover:bg-ink-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-ink-100 shrink-0">
                        {a.fotograflar[0] && (
                          <Image src={a.fotograflar[0]} alt="" fill className="object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-ink-900">{a.marka} {a.model}</div>
                        <div className="text-xs text-ink-400">{a.yil} · {a.vites}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-brand-600">{formatFiyat(a.fiyat)}</td>
                  <td className="px-4 py-3 text-ink-600">{new Intl.NumberFormat('tr-TR').format(a.km)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${a.aktif ? 'bg-green-100 text-green-700' : 'bg-ink-100 text-ink-500'}`}>
                        {a.aktif ? 'Aktif' : 'Pasif'}
                      </span>
                      {a.kampanya && (
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-brand-100 text-brand-700">
                          {a.kampanya_etiketi}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/araclar/${a.slug}`}
                        className="text-xs text-ink-500 hover:text-ink-800 px-2 py-1 rounded-lg hover:bg-ink-100 transition-colors"
                        target="_blank"
                      >
                        Görüntüle
                      </Link>
                      <Link
                        href={`/admin/araclar/${a.id}`}
                        className="text-xs text-brand-600 hover:text-brand-800 px-2 py-1 rounded-lg hover:bg-brand-50 transition-colors"
                      >
                        Düzenle
                      </Link>
                      <button
                        onClick={() => setSilOnay(a.id)}
                        className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {silOnay && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-display text-lg font-semibold text-ink-900 mb-2">Araç Silinsin mi?</h3>
            <p className="text-ink-400 text-sm mb-6">Bu işlem geri alınamaz.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setSilOnay(null)}
                className="flex-1 border border-ink-200 text-ink-700 py-2.5 rounded-xl text-sm font-medium hover:bg-ink-50 transition"
              >
                İptal
              </button>
              <button
                onClick={() => sil(silOnay)}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
