import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AdBanner from '@/components/AdBanner'
import { getStadiumById, stadiums } from '@/data/stadiums'
import { matches } from '@/data/matches'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return stadiums.map(s => ({ slug: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stadium = getStadiumById(params.slug)
  if (!stadium) return {}
  return {
    title: `${stadium.name} – Stade Coupe du Monde 2026 | ${stadium.city}`,
    description: `${stadium.name} à ${stadium.city} (${stadium.country}) – ${stadium.capacity.toLocaleString('fr-FR')} places. Découvrez les matchs prévus et l'histoire de ce stade de la Coupe du Monde 2026.`,
  }
}

export default function StadeDetailPage({ params }: Props) {
  const stadium = getStadiumById(params.slug)
  if (!stadium) notFound()

  const stadiumMatches = matches.filter(m => m.stadium === stadium.id)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
        <Link href="/" className="hover:text-white">Accueil</Link>
        <span>/</span>
        <Link href="/stades" className="hover:text-white">Stades</Link>
        <span>/</span>
        <span className="text-white">{stadium.name}</span>
      </nav>

      {/* Hero */}
      <div className="card p-8 mb-8" style={{ background: 'linear-gradient(135deg, #1A3A6B 0%, #0A1628 100%)' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{stadium.countryFlag}</span>
          <div>
            <div className="text-white/40 text-sm">{stadium.city}, {stadium.country}</div>
            {stadium.id === 'metlife-stadium' && (
              <span className="inline-block bg-brand-gold text-brand-navy text-xs font-black px-3 py-1 rounded-full uppercase">
                🏆 Stade de la Finale
              </span>
            )}
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{stadium.name}</h1>
        <p className="text-white/70 text-lg leading-relaxed max-w-3xl">{stadium.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Matchs joués dans ce stade */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Matchs au {stadium.name}</h2>
            {stadiumMatches.length > 0 ? (
              <div className="space-y-3">
                {stadiumMatches.map(m => (
                  <div key={m.id} className="card p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{m.homeTeamFlag}</span>
                      <div>
                        <div className="text-white font-semibold text-sm">{m.homeTeamName} vs {m.awayTeamName}</div>
                        <div className="text-white/40 text-xs">{m.date.split('-').reverse().join('/')} • {m.time}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {m.status === 'finished' ? (
                        <span className="font-black text-white">{m.homeScore} – {m.awayScore}</span>
                      ) : m.status === 'live' ? (
                        <span className="badge-live">{m.minute}&apos;</span>
                      ) : (
                        <span className="badge-upcoming">{m.time}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/40">Aucun match programmé dans ce stade pour l&apos;instant.</p>
            )}
          </section>
        </div>

        {/* Infos stade */}
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <h2 className="text-lg font-bold text-white">Caractéristiques</h2>
            {[
              { label: 'Capacité', value: `${stadium.capacity.toLocaleString('fr-FR')} places` },
              { label: 'Ville', value: stadium.city },
              { label: 'Pays', value: `${stadium.countryFlag} ${stadium.country}` },
              { label: 'Surface', value: stadium.surface },
              { label: 'Ouverture', value: stadium.opened.toString() },
              { label: 'Matchs prévus', value: `${stadium.matchesCount} matchs` },
            ].map(info => (
              <div key={info.label} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <span className="text-white/40 text-sm">{info.label}</span>
                <span className="text-white font-semibold text-sm">{info.value}</span>
              </div>
            ))}
          </div>

          <AdBanner slot={`stadium-${stadium.id}`} format="rectangle" />
        </div>
      </div>
    </div>
  )
}
