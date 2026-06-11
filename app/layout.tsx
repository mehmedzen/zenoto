import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'OtoSeç — Güvenilir İkinci El Araç',
    template: '%s | OtoSeç',
  },
  description: 'Türkiye\'nin en güvenilir ikinci el araç platformu. Seçilmiş, ekspertiz onaylı araçlar.',
  keywords: ['ikinci el araba', 'ikinci el araç', 'sıfır km araba', 'oto ilan'],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'OtoSeç',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
