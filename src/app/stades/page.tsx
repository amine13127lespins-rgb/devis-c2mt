import type { Metadata } from 'next'
import Link from 'next/link'
import AdBanner from '@/components/AdBanner'
import { stadiums } from '@/data/stadiums'

export const metadata: Metadata = {
  title: 'Stades Coupe du Monde 2026 – USA, Canada, Mexique',
  description: 'Les 16 stades de la Coupe du Monde 2026 aux États-Unis, Canada et Mexique – capacités, villes et matchs programmés dans chaque enceinte de la FIFA World Cup 2026.',
  keywords: ['stades Coupe du Monde 2026', 'MetLife Stadium', 'Rose Bowl', 'Estadio Azteca', 'stades FIFA 2026'],
  alternates: { canonical: '/stades' },
}

export default function StadesPage() {
  const usaStadiums  = stadiums.filter(s => s.country === 'États-Unis')
  const canStadiums  = stadiums.filter(s => s.country === 'Canada')
  const mexStadiums  = stadiums.filter(s => s.country === 'Mexique')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">🏟️ Enceintes</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Stades Coupe du Monde 2026
        </h1>
        <p className="text-white/60 max-w-2xl">
          16 stades exceptionnels aux États-Unis, au Canada et au Mexique pour accueillir la 23ème édition de la Coupe du Monde. La finale se jouera au MetLife Stadium de New York le 19 juillet 2026.
        </p>
      </div>

      <AdBanner slot="stades-top" format="horizontal" className="mb-8" />

      {/* Carte résumé pays */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { flag: '🇺🇸', country: 'États-Unis', count: usaStadiums.length, color: '#1A3A6B' },
          { flag: '🇨🇦', country: 'Canada', count: canStadiums.length, color: '#D4A017' },
          { flag: '🇲🇽', country: 'Mexique', count: mexStadiums.length, color: '#166534' },
        ].map(c => (
          <div key={c.country} className="card p-5 text-center">
            <div className="text-4xl mb-2">{c.flag}</div>
            <div className="text-xl font-black text-white">{c.count} stades</div>
            <div className="text-white/50 text-sm">{c.country}</div>
          </div>
        ))}
      </div>

      {/* USA */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-2xl">🇺🇸</span> États-Unis
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {usaStadiums.map(s => (
            <Link key={s.id} href={`/stades/${s.id}`}>
              <div className="card-hover p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">{s.name}</h3>
                    <p className="text-white/50 text-sm">{s.city}</p>
                  </div>
                  {s.id === 'metlife-stadium' && (
                    <span className="bg-brand-gold/20 text-brand-gold text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                      🏆 FINALE
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{s.capacity.toLocaleString('fr-FR')}</div>
                    <div className="text-white/40 text-xs">Places</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{s.matchesCount}</div>
                    <div className="text-white/40 text-xs">Matchs</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{s.opened}</div>
                    <div className="text-white/40 text-xs">Ouverture</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Canada */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-2xl">🇨🇦</span> Canada
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {canStadiums.map(s => (
            <Link key={s.id} href={`/stades/${s.id}`}>
              <div className="card-hover p-5">
                <h3 className="font-bold text-white text-lg mb-1">{s.name}</h3>
                <p className="text-white/50 text-sm mb-3">{s.city}</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{s.capacity.toLocaleString('fr-FR')}</div>
                    <div className="text-white/40 text-xs">Places</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{s.matchesCount}</div>
                    <div className="text-white/40 text-xs">Matchs</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{s.opened}</div>
                    <div className="text-white/40 text-xs">Ouverture</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mexique */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-2xl">🇲🇽</span> Mexique
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {mexStadiums.map(s => (
            <Link key={s.id} href={`/stades/${s.id}`}>
              <div className="card-hover p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">{s.name}</h3>
                    <p className="text-white/50 text-sm">{s.city}</p>
                  </div>
                  {s.id === 'estadio-azteca' && (
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                      🎉 Ouverture
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{s.capacity.toLocaleString('fr-FR')}</div>
                    <div className="text-white/40 text-xs">Places</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{s.matchesCount}</div>
                    <div className="text-white/40 text-xs">Matchs</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">{s.opened}</div>
                    <div className="text-white/40 text-xs">Ouverture</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slot="stades-bottom" format="horizontal" className="mb-8" />
    </div>
  )
}
