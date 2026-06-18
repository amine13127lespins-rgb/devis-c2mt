import type { Metadata } from 'next'
import MatchCard from '@/components/MatchCard'
import AdBanner from '@/components/AdBanner'
import { matches } from '@/data/matches'

export const metadata: Metadata = {
  title: 'Résultats Coupe du Monde 2026 – Scores en direct',
  description: 'Résultats et scores en direct de la Coupe du Monde 2026 – tableau des résultats par groupe, matchs en cours et matchs à venir de la FIFA World Cup 2026.',
  keywords: ['résultats Coupe du Monde 2026', 'scores football', 'résultats Mondial 2026', 'live score FIFA 2026'],
  alternates: { canonical: '/resultats' },
}

export default function ResultatsPage() {
  const liveMatches     = matches.filter(m => m.status === 'live')
  const finishedMatches = matches.filter(m => m.status === 'finished').reverse()
  const upcomingMatches = matches.filter(m => m.status === 'upcoming')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">⚽ Scores</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Résultats Coupe du Monde 2026
        </h1>
        <p className="text-white/60 max-w-2xl">
          Suivez tous les résultats de la FIFA World Cup 2026 en temps réel : matchs en direct, scores des matchs terminés et programme des prochaines rencontres.
        </p>
      </div>

      <AdBanner slot="resultats-top" format="horizontal" className="mb-8" />

      {/* En direct */}
      {liveMatches.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <h2 className="text-2xl font-extrabold text-white">En direct</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {liveMatches.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {/* Résultats par groupe */}
      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(group => {
        const groupFinished = finishedMatches.filter(m => m.group === group)
        if (groupFinished.length === 0) return null
        return (
          <section key={group} className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-sm font-black">{group}</span>
              Groupe {group}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {groupFinished.map(m => <MatchCard key={m.id} match={m} compact />)}
            </div>
          </section>
        )
      })}

      {/* Prochains */}
      {upcomingMatches.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-extrabold text-white mb-6">Prochains matchs</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingMatches.slice(0, 6).map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      <AdBanner slot="resultats-bottom" format="horizontal" className="mt-10" />

      <div className="mt-12 text-white/40 text-sm">
        <p>Les résultats sont mis à jour manuellement après chaque match. Pour une mise à jour en temps réel, consultez notre page <a href="/live" className="text-brand-gold hover:underline">matchs en direct</a>.</p>
      </div>
    </div>
  )
}
