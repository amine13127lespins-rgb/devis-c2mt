'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/calendrier',  label: 'Calendrier' },
  { href: '/resultats',   label: 'Résultats' },
  { href: '/groupes',     label: 'Groupes' },
  { href: '/equipes',     label: 'Équipes' },
  { href: '/stades',      label: 'Stades' },
  { href: '/live',        label: '🔴 Live', highlight: true },
  { href: '/blog',        label: 'Blog' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center text-brand-navy font-black text-lg shadow-md group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)' }}>
              ⚽
            </div>
            <div>
              <div className="text-white font-extrabold text-lg leading-none">MondialFoot</div>
              <div className="text-brand-gold text-[10px] font-semibold tracking-widest uppercase leading-none">2026</div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  link.highlight
                    ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/live" className="hidden md:flex btn-gold text-xs py-2 px-4">
              En Direct
            </Link>
            <button
              className="lg:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden pb-4 border-t border-white/10 mt-1 pt-3 grid grid-cols-2 gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all text-center ${
                  link.highlight
                    ? 'bg-red-500/10 text-red-400'
                    : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
