import type { Metadata } from 'next'
import Link from 'next/link'
import MatchCard from '@/components/MatchCard'
import AdBanner from '@/components/AdBanner'
import { getLiveMatches, getTodayMatches, getUpcomingMatches } from '@/data/matches'

export const metadata: Metadata = {
  title: 'Matchs en direct – Coupe du Monde 2026 Live',
  description: 'Suivez les matchs de la Coupe du Monde 2026 en direct : scores live, buts, statistiques et programme de la journée. Mise à jour en temps réel.',
  keywords: ['live Coupe du Monde 2026', 'matchs en direct Mondial', 'score live FIFA 2026', 'résultats temps réel'],
}

export default function LivePage() {
  const liveMatches    = getLiveMatches()
  const todayMatches   = getTodayMatches('2026-06-18')
  const upcomingToday  = todayMatches.filter(m => m.status === 'upcoming')
  const finishedToday  = todayMatches.filter(m => m.status === 'finished')
  const nextMatches    = getUpcomingMatches(6)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header live */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="text-red-400 font-semibold text-sm uppercase tracking-widest">En direct maintenant</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Matchs en Direct
        </h1>
        <p className="text-white/60 max-w-2xl">
          Suivez les matchs de la Coupe du Monde 2026 en temps réel. Scores, buts, statistiques et programme complet de la journée.
        </p>
      </div>

      {/* Live maintenant */}
      {liveMatches.length > 0 ? (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 font-bold text-sm">{liveMatches.length} match{liveMatches.length > 1 ? 's' : ''} en cours</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {liveMatches.map(match => (
              <div key={match.id} className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/30 to-brand-gold/30 rounded-2xl blur-sm" />
                <div className="relative">
                  <MatchCard match={match} />
                </div>
              </div>
            ))}
          </div>

          {/* Note API */}
          <div className="mt-6 card p-4 flex items-start gap-3">
            <span className="text-2xl shrink-0">ℹ️</span>
            <div>
              <p className="text-white/70 text-sm font-semibold">Connectez une API football pour des données en temps réel</p>
              <p className="text-white/40 text-xs mt-1">
                Pour un vrai live avec scores automatiques, connectez l&apos;API <strong className="text-white/60">football-data.org</strong> ou <strong className="text-white/60">Api-Football</strong> dans <code className="text-brand-gold text-xs">/src/lib/api.ts</code>.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="mb-12">
          <div className="card p-12 text-center">
            <div className="text-6xl mb-4">⚽</div>
            <h2 className="text-2xl font-bold text-white mb-2">Aucun match en ce moment</h2>
            <p className="text-white/50">Les prochains matchs débutent dans quelques heures.</p>
          </div>
        </section>
      )}

      <AdBanner slot="live-mid" format="horizontal" className="mb-10" />

      {/* Programme du jour */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Terminés */}
        {finishedToday.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              ✅ Résultats du jour
            </h2>
            <div className="space-y-3">
              {finishedToday.map(m => <MatchCard key={m.id} match={m} compact />)}
            </div>
          </section>
        )}

        {/* Prochains aujourd'hui */}
        {upcomingToday.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              🔜 À venir aujourd&apos;hui
            </h2>
            <div className="space-y-3">
              {upcomingToday.map(m => <MatchCard key={m.id} match={m} compact />)}
            </div>
          </section>
        )}
      </div>

      {/* Prochains matchs */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Prochains matchs</h2>
          <Link href="/calendrier" className="btn-outline text-xs py-2 px-4">Calendrier complet</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {nextMatches.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      </section>

      {/* Comment regarder */}
      <section className="card p-6">
        <h2 className="text-xl font-bold text-white mb-4">📺 Comment regarder en direct ?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'TF1 (gratuit)', desc: 'Matchs France + phases finales', free: true },
            { name: 'M6 (gratuit)', desc: 'Matchs sélectionnés', free: true },
            { name: 'beIN Sports', desc: 'Tous les matchs en HD', free: false },
            { name: 'Canal+', desc: 'Matchs exclusifs', free: false },
          ].map(ch => (
            <div key={ch.name} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">{ch.name}</span>
                {ch.free && <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-0.5 rounded-full">Gratuit</span>}
              </div>
              <p className="text-white/50 text-xs">{ch.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/blog/comment-regarder-coupe-du-monde-2026-france" className="text-brand-gold hover:underline text-sm">
            → Guide complet : comment regarder la Coupe du Monde 2026 en France
          </Link>
        </div>
      </section>

      <AdBanner slot="live-bottom" format="horizontal" className="mt-8" />
    </div>
  )
}
