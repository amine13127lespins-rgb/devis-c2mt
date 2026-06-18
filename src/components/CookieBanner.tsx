'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-brand-navy/95 backdrop-blur border-t border-white/10 shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-white/70">
          <span className="text-white font-bold">🍪 Cookies</span> — Ce site utilise des cookies publicitaires (Google AdSense) et analytiques.{' '}
          <Link href="/confidentialite" className="text-brand-gold underline hover:text-brand-gold-light">
            En savoir plus
          </Link>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs font-bold text-white/60 border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-bold bg-brand-gold text-black rounded-xl hover:bg-brand-gold-light transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
