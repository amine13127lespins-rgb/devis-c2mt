import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page introuvable – MondialFoot 2026',
  description: 'Cette page n\'existe pas. Retournez à l\'accueil de MondialFoot 2026.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-black text-brand-gold/20 mb-4">404</div>
        <div className="text-4xl mb-6">⚽</div>
        <h1 className="text-2xl font-extrabold text-white mb-3">Page introuvable</h1>
        <p className="text-white/50 mb-8 max-w-md">
          Le ballon est sorti des limites ! Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-gold">🏠 Retour à l&apos;accueil</Link>
          <Link href="/calendrier" className="btn-outline">📅 Calendrier</Link>
          <Link href="/resultats" className="btn-outline">⚽ Résultats</Link>
        </div>
      </div>
    </div>
  )
}
