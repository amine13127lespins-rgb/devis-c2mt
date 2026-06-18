import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AdBanner from '@/components/AdBanner'
import MatchDetailClient from '@/components/match/MatchDetailClient'
import { matches } from '@/data/matches'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return matches.map(m => ({ slug: `${m.homeTeam}-vs-${m.awayTeam}` }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const match = matches.find(m => `${m.homeTeam}-vs-${m.awayTeam}` === params.slug)
  if (!match) return {}
  const score = match.status === 'finished' ? `(${match.homeScore}-${match.awayScore})` : ''
  return {
    title: `${match.homeTeamName} vs ${match.awayTeamName} ${score} – Coupe du Monde 2026`,
    description: `${match.homeTeamName} vs ${match.awayTeamName} – ${match.round}, ${match.date.split('-').reverse().join('/')} à ${match.time} au ${match.stadiumName}. Score, résumé et statistiques.`,
    keywords: [match.homeTeamName, match.awayTeamName, 'Coupe du Monde 2026', match.round, 'résultat', 'score'],
  }
}

export default function MatchDetailPage({ params }: Props) {
  const match = matches.find(m => `${m.homeTeam}-vs-${m.awayTeam}` === params.slug)
  if (!match) notFound()

  const isLive     = match.status === 'live'
  const isFinished = match.status === 'finished'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${match.homeTeamName} vs ${match.awayTeamName}`,
    startDate: `${match.date}T${match.time.replace('h', ':').padEnd(5, '0')}:00`,
    location: {
      '@type': 'StadiumOrArena',
      name: match.stadiumName,
      address: { '@type': 'PostalAddress', addressLocality: match.stadiumCity },
    },
    homeTeam: { '@type': 'SportsTeam', name: match.homeTeamName },
    awayTeam: { '@type': 'SportsTeam', name: match.awayTeamName },
    sport: 'Football',
    description: match.round,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white">Accueil</Link>
          <span>/</span>
          <Link href="/resultats" className="hover:text-white">Résultats</Link>
          <span>/</span>
          <span className="text-white">{match.homeTeamName} vs {match.awayTeamName}</span>
        </nav>

        {/* Phase & stade */}
        <div className="text-center mb-6">
          <span className="inline-block bg-brand-blue/50 border border-white/10 text-white/60 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
            {match.round}
          </span>
        </div>

        {/* Score central */}
        <div className="card p-8 md:p-12 mb-8 text-center"
          style={{ background: 'linear-gradient(135deg, #1A3A6B 0%, #0A1628 100%)' }}>

          {/* Statut */}
          <div className="flex items-center justify-center mb-6">
            {isLive && (
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-bold text-sm">{match.minute}&apos;</span>
              </div>
            )}
            {isFinished && <span className="badge-finished">Match terminé</span>}
            {!isLive && !isFinished && (
              <span className="badge-upcoming">{match.date.split('-').reverse().join('/')} • {match.time}</span>
            )}
          </div>

          {/* Équipes + score */}
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {/* Domicile */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <span className="text-6xl md:text-8xl">{match.homeTeamFlag}</span>
              <span className="font-black text-white text-xl md:text-2xl">{match.homeTeamName}</span>
              <Link href={`/equipes/${match.homeTeam}`} className="text-white/40 text-xs hover:text-brand-gold transition-colors">
                Voir l&apos;équipe →
              </Link>
            </div>

            {/* Score */}
            <div className="shrink-0 text-center">
              {isFinished || isLive ? (
                <div>
                  <div className="text-6xl md:text-8xl font-black text-white tabular-nums">
                    {match.homeScore} <span className="text-white/30">–</span> {match.awayScore}
                  </div>
                  {isFinished && match.homeScore !== null && match.awayScore !== null && (
                    <div className="text-white/40 text-sm mt-2">
                      {match.homeScore > match.awayScore
                        ? `Victoire ${match.homeTeamName}`
                        : match.awayScore > match.homeScore
                        ? `Victoire ${match.awayTeamName}`
                        : 'Match nul'}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="text-brand-gold font-black text-3xl md:text-4xl">VS</div>
                  <div className="text-white text-xl font-bold mt-2">{match.time}</div>
                </div>
              )}
            </div>

            {/* Extérieur */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <span className="text-6xl md:text-8xl">{match.awayTeamFlag}</span>
              <span className="font-black text-white text-xl md:text-2xl">{match.awayTeamName}</span>
              <Link href={`/equipes/${match.awayTeam}`} className="text-white/40 text-xs hover:text-brand-gold transition-colors">
                Voir l&apos;équipe →
              </Link>
            </div>
          </div>
        </div>

        {/* Infos match */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Date', value: match.date.split('-').reverse().join('/') },
            { label: 'Heure (France)', value: match.time },
            { label: 'Stade', value: match.stadiumName },
            { label: 'Ville', value: match.stadiumCity },
          ].map(info => (
            <div key={info.label} className="card p-4 text-center">
              <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{info.label}</div>
              <div className="text-white font-bold text-sm">{info.value}</div>
            </div>
          ))}
        </div>

        {/* TV */}
        {match.tvChannels && match.tvChannels.length > 0 && (
          <div className="card p-4 mb-8 flex items-center gap-4">
            <span className="text-2xl shrink-0">📺</span>
            <div>
              <div className="text-white/60 text-sm font-semibold mb-1">Diffusion TV en France</div>
              <div className="flex gap-2 flex-wrap">
                {match.tvChannels.map(ch => (
                  <span key={ch} className="bg-white/10 border border-white/20 text-white font-bold px-3 py-1 rounded-full text-sm">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <AdBanner slot={`match-${match.id}`} format="horizontal" className="mb-8" />

        {/* Stats / Timeline / Compositions / Cotes */}
        <MatchDetailClient
          matchId={`${match.homeTeam}-vs-${match.awayTeam}`}
          homeTeamName={match.homeTeamName}
          awayTeamName={match.awayTeamName}
          homeTeamFlag={match.homeTeamFlag}
          awayTeamFlag={match.awayTeamFlag}
          isLive={isLive}
        />

        {/* Stade */}
        <div className="card p-5 mt-8">
          <h2 className="font-bold text-white mb-3">Stade</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">{match.stadiumName}</div>
              <div className="text-white/50 text-sm">{match.stadiumCity}</div>
            </div>
            <Link href={`/stades/${match.stadium}`} className="text-brand-gold hover:underline text-sm">
              Voir le stade →
            </Link>
          </div>
        </div>

        {/* Retour */}
        <div className="flex gap-4 mt-8">
          <Link href="/resultats" className="btn-outline text-sm py-2 px-5">← Retour résultats</Link>
          <Link href="/calendrier" className="btn-outline text-sm py-2 px-5">📅 Calendrier</Link>
        </div>
      </div>
    </>
  )
}
