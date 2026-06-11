import Link from 'next/link'
import Image from 'next/image'
import { Arac } from '@/lib/supabase'

function formatFiyat(n: number) {
  return new Intl.NumberFormat('tr-TR').format(n) + ' ₺'
}

export default function AracKart({ arac }: { arac: Arac }) {
  const foto = arac.fotograflar?.[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'

  return (
    <Link href={`/araclar/${arac.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden border border-ink-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/40 transition-all duration-300">
        {/* Photo */}
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
          <Image
            src={foto}
            alt={`${arac.marka} ${arac.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {arac.kampanya && arac.kampanya_etiketi && (
            <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {arac.kampanya_etiketi}
            </span>
          )}
          <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-xs font-medium text-ink-800">
            {arac.yil}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-ink-900 leading-tight">
            {arac.marka} {arac.model}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-xs text-ink-400">
            <span>{new Intl.NumberFormat('tr-TR').format(arac.km)} km</span>
            <span className="w-1 h-1 rounded-full bg-ink-300" />
            <span>{arac.yakit}</span>
            <span className="w-1 h-1 rounded-full bg-ink-300" />
            <span>{arac.vites}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-display text-xl font-semibold text-brand-600">
              {formatFiyat(arac.fiyat)}
            </span>
            <span className="text-xs text-ink-400 bg-ink-50 px-2.5 py-1 rounded-full">
              {arac.renk}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
