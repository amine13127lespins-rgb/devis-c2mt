import type { Metadata } from 'next'
import GroupTable from '@/components/GroupTable'
import AdBanner from '@/components/AdBanner'
import { groups } from '@/data/groups'

export const metadata: Metadata = {
  title: 'Groupes et Classements Coupe du Monde 2026 – Groupes A à L',
  description: 'Classements des 12 groupes de la Coupe du Monde 2026 – points, buts, différence de buts et équipes qualifiées pour les huitièmes de finale FIFA World Cup 2026.',
  keywords: ['groupes Coupe du Monde 2026', 'classement Mondial 2026', 'groupe A', 'groupe B', 'groupe France', 'qualification Mondial'],
  alternates: { canonical: '/groupes' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA Coupe du Monde 2026',
  description: '48 équipes, 12 groupes, 104 matchs dans 3 pays',
  sport: 'Football',
  startDate: '2026-06-11',
  endDate: '2026-07-19',
  location: {
    '@type': 'Place',
    name: 'États-Unis, Canada, Mexique',
  },
}

export default function GroupesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">📊 Phase de groupes</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Groupes et Classements 2026
        </h1>
        <p className="text-white/60 max-w-2xl">
          Classements des 12 groupes (A à L) de la Coupe du Monde 2026. Les 2 premiers de chaque groupe plus les 8 meilleurs 3ème se qualifient pour les huitièmes de finale.
        </p>
      </div>

      <AdBanner slot="groupes-top" format="horizontal" className="mb-8" />

      {/* Légende */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-white/60">Qualifié en huitièmes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-white/20" />
          <span className="text-white/60">Encore en course</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500/30" />
          <span className="text-white/40">Éliminé</span>
        </div>
      </div>

      {/* Grille des groupes */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groups.map(group => (
          <GroupTable key={group.id} group={group} />
        ))}
      </div>

      <AdBanner slot="groupes-bottom" format="horizontal" className="mt-10" />

      {/* SEO content */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-6">Format de la Coupe du Monde 2026</h2>
        <div className="grid md:grid-cols-2 gap-8 text-white/60 text-sm leading-relaxed">
          <div>
            <h3 className="text-white font-bold mb-3">Phase de groupes (48 équipes)</h3>
            <p>La Coupe du Monde 2026 réunit pour la première fois <strong className="text-white">48 équipes</strong> réparties dans <strong className="text-white">12 groupes de 4</strong>. Les 2 premiers de chaque groupe (24 équipes) + les 8 meilleurs troisièmes (8 équipes) se qualifient pour les huitièmes de finale.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-3">Phases éliminatoires</h3>
            <ul className="space-y-2">
              <li>🔵 <strong className="text-white">Huitièmes de finale</strong> : 4–7 juillet (32 équipes)</li>
              <li>🔵 <strong className="text-white">Quarts de finale</strong> : 10–13 juillet (16 équipes)</li>
              <li>🔵 <strong className="text-white">Demi-finales</strong> : 17–18 juillet (8 équipes)</li>
              <li>🏆 <strong className="text-white">Finale</strong> : 19 juillet, MetLife Stadium, New York</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
