import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <span className="font-display text-white text-lg font-semibold">OtoSeç</span>
          <p className="mt-3 text-sm leading-relaxed">
            Seçilmiş, ekspertiz onaylı ikinci el araçlar. Güvenle al, güvenle sat.
          </p>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">Hızlı Erişim</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/araclar" className="hover:text-white transition-colors">Tüm Araçlar</Link></li>
            <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Yönetim Paneli</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">İletişim</h4>
          <ul className="space-y-2 text-sm">
            <li>📞 0212 000 00 00</li>
            <li>📧 info@otosec.com.tr</li>
            <li>📍 İstanbul, Türkiye</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-800 max-w-6xl mx-auto px-4 py-4 text-xs text-center">
        © {new Date().getFullYear()} OtoSeç. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}
