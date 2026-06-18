import type { Metadata } from 'next'
import Link from 'next/link'
import MatchCard from '@/components/MatchCard'
import AdBanner from '@/components/AdBanner'
import { matches } from '@/data/matches'

export const metadata: Metadata = {
  title: 'Calendrier Coupe du Monde 2026 – Tous les matchs par date',
  description: 'Calendrier complet des matchs de la Coupe du Monde 2026 – dates, horaires en heure française, stades et chaînes TV de tous les matchs de la FIFA World Cup 2026.',
  keywords: ['calendrier Coupe du Monde 2026', 'matchs Mondial 2026', 'programme football 2026', 'dates matchs FIFA 2026'],
  alternates: { canonical: '/calendrier' },
}

// Groupe les matchs par date
function groupByDate(matchList: typeof matches) {
  const map = new Map<string, typeof matches>()
  for (const m of matchList) {
    const list = map.get(m.date) ?? []
    list.push(m)
    map.set(m.date, list)
  }
  return map
}

function formatDate(isoDate: string) {
  const d = new Date(isoDate + 'T12:00:00')
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default function CalendrierPage() {
  const grouped = groupByDate(matches)
  const sortedDates = Array.from(grouped.keys()).sort()

  const today = '2026-06-18'
  const liveToday = matches.filter(m => m.date === today && m.status === 'live')
  const finishedCount = matches.filter(m => m.status === 'finished').length
  const upcomingCount = matches.filter(m => m.status === 'upcoming').length

  const upcomingMatches = matches.filter(m => m.status === 'upcoming').slice(0, 5)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Calendrier Coupe du Monde 2026',
    description: 'Liste des matchs de la FIFA World Cup 2026',
    numberOfItems: upcomingMatches.length,
    itemListElement: upcomingMatches.map((m, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SportsEvent',
        name: `${m.homeTeamName} vs ${m.awayTeamName}`,
        startDate: `${m.date}T${m.time.replace('h', ':').padEnd(5, '0')}:00`,
        location: {
          '@type': 'StadiumOrArena',
          name: m.stadiumName,
          address: { '@type': 'PostalAddress', addressLocality: m.stadiumCity },
        },
        homeTeam: { '@type': 'SportsTeam', name: m.homeTeamName },
        awayTeam: { '@type': 'SportsTeam', name: m.awayTeamName },
        sport: 'Football',
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* En-tête */}
      <div className="mb-10">
        <div className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">📅 Programme complet</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Calendrier Coupe du Monde 2026
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          Retrouvez l&apos;intégralité des matchs de la Coupe du Monde 2026 avec les horaires en heure française (CEST, UTC+2). Filtrez par groupe, équipe ou stade.
        </p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="text-green-400 text-2xl font-black">{finishedCount}</div>
          <div className="text-white/40 text-xs uppercase mt-1">Matchs joués</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-red-400 text-2xl font-black">{liveToday.length}</div>
          <div className="text-white/40 text-xs uppercase mt-1">En direct</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-blue-400 text-2xl font-black">{upcomingCount}</div>
          <div className="text-white/40 text-xs uppercase mt-1">À venir</div>
        </div>
      </div>

      <AdBanner slot="calendrier-top" format="horizontal" className="mb-8" />

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['Tous', 'Groupe A', 'Groupe B', 'Groupe C', 'France', 'Maroc', 'Brésil'].map(f => (
          <button
            key={f}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
              f === 'Tous'
                ? 'bg-brand-gold text-brand-navy border-brand-gold'
                : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Matchs par date */}
      <div className="space-y-10">
        {sortedDates.map(date => (
          <div key={date}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`px-4 py-2 rounded-xl font-bold text-sm ${
                date === today
                  ? 'bg-brand-gold text-brand-navy'
                  : 'bg-white/10 text-white'
              }`}>
                {date === today ? '🔴 Aujourd\'hui' : ''} {formatDate(date)}
              </div>
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-xs">{grouped.get(date)?.length} match(s)</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {grouped.get(date)?.map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        ))}
      </div>

      <AdBanner slot="calendrier-bottom" format="horizontal" className="mt-10" />

      {/* SEO content */}
      <div className="mt-16 prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-white mb-4">Calendrier complet de la Coupe du Monde 2026</h2>
        <div className="text-white/60 text-sm leading-relaxed space-y-4">
          <p>La Coupe du Monde 2026 se déroule du <strong className="text-white">11 juin au 19 juillet 2026</strong> dans 16 stades répartis aux États-Unis, au Canada et au Mexique. Cette édition historique est la première à réunir 48 équipes nationales.</p>
          <p>La phase de groupes (12 groupes de 4 équipes) se joue du 11 juin au 2 juillet. Les huitièmes de finale ont lieu du 4 au 7 juillet, les quarts du 10 au 13 juillet, les demi-finales les 17 et 18 juillet. La finale se joue le <strong className="text-white">19 juillet 2026</strong> au MetLife Stadium de New York.</p>
          <p>Tous les horaires sont affichés en <strong className="text-white">heure française (CEST, UTC+2)</strong>. Les matchs se jouent généralement à 18h00, 21h00 ou 00h00 heure française en raison du décalage avec l&apos;Amérique du Nord.</p>
          <p>Les droits TV en France sont détenus par <strong className="text-white">TF1</strong>, <strong className="text-white">M6</strong> et <strong className="text-white">beIN Sports</strong>. Consultez notre <Link href="/blog/comment-regarder-coupe-du-monde-2026-france" className="text-brand-gold hover:underline">guide TV complet</Link> pour tous les détails.</p>
        </div>
      </div>
    </div>
    </>
  )
}
