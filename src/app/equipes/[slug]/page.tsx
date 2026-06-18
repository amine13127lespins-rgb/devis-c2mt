import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MatchCard from '@/components/MatchCard'
import AdBanner from '@/components/AdBanner'
import { getTeamById, teams } from '@/data/teams'
import { getMatchesByTeam } from '@/data/matches'
import { groups } from '@/data/groups'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return teams.map(t => ({ slug: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const team = getTeamById(params.slug)
  if (!team) return {}
  return {
    title: `${team.name} – Coupe du Monde 2026 : effectif, matchs et résultats`,
    description: `Tout sur ${team.name} à la Coupe du Monde 2026 : groupe ${team.group}, joueurs clés, coach ${team.coach}, calendrier et résultats des matchs.`,
    keywords: [team.name, `${team.name} Mondial 2026`, `${team.name} Coupe du Monde`, team.shortName],
    alternates: { canonical: `/equipes/${params.slug}` },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      title: `${team.name} – Coupe du Monde 2026`,
      description: `Tout sur ${team.name} à la Coupe du Monde 2026 : groupe ${team.group}, joueurs clés, coach ${team.coach}, calendrier et résultats des matchs.`,
    },
  }
}

export default function TeamDetailPage({ params }: Props) {
  const team = getTeamById(params.slug)
  if (!team) notFound()

  const teamMatches = getMatchesByTeam(team.id)
  const finishedMatches = teamMatches.filter(m => m.status === 'finished')
  const upcomingMatches = teamMatches.filter(m => m.status === 'upcoming')

  const group = groups.find(g => g.id === team.group)
  const standing = group?.standings.find(s => s.teamId === team.id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: team.name,
    sport: 'Football',
    memberOf: { '@type': 'SportsOrganization', name: 'FIFA' },
    description: team.description,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white">Accueil</Link>
          <span>/</span>
          <Link href="/equipes" className="hover:text-white">Équipes</Link>
          <span>/</span>
          <span className="text-white">{team.name}</span>
        </nav>

        {/* Hero équipe */}
        <div className="card p-8 mb-8"
          style={{ background: 'linear-gradient(135deg, #1A3A6B 0%, #0A1628 100%)' }}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <span className="text-8xl md:text-9xl">{team.flag}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-brand-gold/20 text-brand-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Groupe {team.group}
                </span>
                <span className="bg-white/10 text-white/60 text-xs font-bold px-3 py-1 rounded-full">
                  #{team.ranking} FIFA
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{team.name}</h1>
              <div className="text-white/50 mb-4">{team.confederation} • {team.colors}</div>
              <p className="text-white/70 leading-relaxed">{team.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Classement actuel */}
            {standing && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4">Classement Groupe {team.group}</h2>
                <div className="card p-5">
                  <div className="grid grid-cols-5 gap-4 text-center">
                    {[
                      { label: 'Points', value: standing.points, color: 'text-brand-gold' },
                      { label: 'Joués', value: standing.played, color: 'text-white' },
                      { label: 'Buts +', value: standing.goalsFor, color: 'text-green-400' },
                      { label: 'Buts -', value: standing.goalsAgainst, color: 'text-red-400' },
                      { label: 'Diff', value: standing.goalsFor - standing.goalsAgainst, color: (standing.goalsFor - standing.goalsAgainst) >= 0 ? 'text-green-400' : 'text-red-400' },
                    ].map(stat => (
                      <div key={stat.label} className="bg-white/5 rounded-xl p-3">
                        <div className={`text-2xl font-black ${stat.color}`}>{stat.value > 0 ? `+${stat.value}` === `+${stat.value}` && stat.label === 'Diff' && stat.value > 0 ? `+${stat.value}` : stat.value : stat.value}</div>
                        <div className="text-white/40 text-xs mt-1 uppercase">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Résultats */}
            {finishedMatches.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4">Résultats</h2>
                <div className="space-y-3">
                  {finishedMatches.map(m => <MatchCard key={m.id} match={m} />)}
                </div>
              </section>
            )}

            {/* Prochains matchs */}
            {upcomingMatches.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4">Prochains matchs</h2>
                <div className="space-y-3">
                  {upcomingMatches.map(m => <MatchCard key={m.id} match={m} />)}
                </div>
              </section>
            )}
          </div>

          {/* Colonne droite */}
          <div className="space-y-6">
            {/* Joueurs clés */}
            <div className="card p-5">
              <h2 className="text-lg font-bold text-white mb-4">Joueurs clés</h2>
              <div className="space-y-3">
                {team.keyPlayers.map(player => (
                  <div key={player.name} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-sm font-bold text-brand-gold shrink-0">
                      {player.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm truncate">{player.name}</div>
                      <div className="text-white/40 text-xs">{player.position} • {player.club}</div>
                    </div>
                    {player.goals !== undefined && (
                      <div className="ml-auto shrink-0">
                        <span className="bg-brand-gold/20 text-brand-gold text-xs font-bold px-2 py-1 rounded-full">
                          ⚽ {player.goals}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Infos */}
            <div className="card p-5 space-y-4">
              <h2 className="text-lg font-bold text-white">Informations</h2>
              {[
                { label: 'Sélectionneur', value: team.coach },
                { label: 'Confédération', value: team.confederation },
                { label: 'Couleurs', value: team.colors },
                { label: 'Palmarès Mondial', value: team.worldCupHistory },
                { label: 'Meilleur résultat', value: team.bestResult },
              ].map(info => (
                <div key={info.label} className="flex flex-col gap-1">
                  <span className="text-white/40 text-xs uppercase tracking-wider">{info.label}</span>
                  <span className="text-white text-sm font-semibold">{info.value}</span>
                </div>
              ))}
            </div>

            {/* Pub */}
            <AdBanner slot={`team-${team.id}`} format="rectangle" />

            {/* Affiliation maillot */}
            <div className="card p-5">
              <h3 className="text-sm font-bold text-white mb-3">👕 Maillot officiel</h3>
              <div className="bg-brand-blue/30 rounded-xl p-4 text-center">
                <div className="text-4xl mb-2">{team.flag}</div>
                <div className="text-white/60 text-sm mb-3">Maillot {team.name} 2026</div>
                <a href="#" className="btn-gold text-xs py-2 px-4 inline-block">
                  Commander →
                </a>
                <p className="text-white/30 text-xs mt-2">Lien affilié • Boutique officielle FIFA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
