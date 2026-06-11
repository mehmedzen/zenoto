'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-ink-200/60">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
              <circle cx="7.5" cy="14.5" r="1.5"/>
              <circle cx="16.5" cy="14.5" r="1.5"/>
            </svg>
          </div>
          <span className="font-display text-xl font-semibold text-ink-900">OtoSeç</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink-600">
          <Link href="/araclar" className="hover:text-brand-600 transition-colors">Araçlar</Link>
          <Link href="/iletisim" className="hover:text-brand-600 transition-colors">İletişim</Link>
          <Link
            href="/araclar"
            className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
          >
            Araç Ara
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-ink-100 transition-colors"
          aria-label="Menü"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-ink-200/60 bg-white/95 backdrop-blur-md px-4 py-4 flex flex-col gap-3 text-sm font-medium">
          <Link href="/araclar" onClick={() => setOpen(false)} className="text-ink-700 py-2">Araçlar</Link>
          <Link href="/iletisim" onClick={() => setOpen(false)} className="text-ink-700 py-2">İletişim</Link>
          <Link href="/araclar" onClick={() => setOpen(false)} className="bg-brand-600 text-white text-center py-2 rounded-lg">
            Araç Ara
          </Link>
        </div>
      )}
    </header>
  )
}
