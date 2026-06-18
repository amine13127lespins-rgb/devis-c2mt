import type { Metadata } from 'next'
import Link from 'next/link'
import AdBanner from '@/components/AdBanner'
import LiveDashboard from '@/components/LiveDashboard'

export const metadata: Metadata = {
  title: 'Matchs en direct – Coupe du Monde 2026 Live',
  description: 'Scores en direct de la Coupe du Monde 2026 – suivez tous les matchs en temps réel avec mise à jour automatique toutes les 30 secondes FIFA World Cup 2026.',
  keywords: ['live Coupe du Monde 2026', 'matchs en direct Mondial', 'score live FIFA 2026', 'résultats temps réel'],
  alternates: { canonical: '/live' },
}

export default function LivePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 font-bold text-sm uppercase tracking-widest">Temps réel</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Matchs en Direct
        </h1>
        <p className="text-white/60 max-w-2xl">
          Scores en direct de la Coupe du Monde 2026, mis à jour automatiquement toutes les 30 secondes via Api-Football.
        </p>
      </div>

      <AdBanner slot="live-top" format="horizontal" className="mb-8" />

      {/* Dashboard live – composant client avec auto-refresh */}
      <LiveDashboard />

      <AdBanner slot="live-bottom" format="horizontal" className="mt-10" />

      {/* Comment regarder */}
      <section className="mt-12 card p-6">
        <h2 className="text-xl font-bold text-white mb-5">📺 Où regarder en France ?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'TF1',       sub: 'Matchs France + phases finales', free: true,  url: 'https://www.tf1plus.fr' },
            { name: 'M6',        sub: 'Matchs sélectionnés',            free: true,  url: 'https://www.6play.fr' },
            { name: 'beIN Sports', sub: 'Tous les 104 matchs en HD',    free: false, url: '#' },
            { name: 'Canal+',    sub: 'Matchs exclusifs',               free: false, url: '#' },
          ].map(ch => (
            <div key={ch.name} className="bg-white/5 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-white">{ch.name}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  ch.free ? 'bg-green-400/20 text-green-400' : 'bg-white/10 text-white/50'
                }`}>
                  {ch.free ? 'Gratuit' : 'Abonnement'}
                </span>
              </div>
              <p className="text-white/50 text-xs">{ch.sub}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm">
          <Link href="/blog/comment-regarder-coupe-du-monde-2026-france" className="text-brand-gold hover:underline">
            → Guide complet : comment regarder la Coupe du Monde 2026 en France
          </Link>
        </p>
      </section>
    </div>
  )
}
