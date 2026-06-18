import type { Metadata } from 'next'
import TeamCard from '@/components/TeamCard'
import AdBanner from '@/components/AdBanner'
import { teams, GROUPS } from '@/data/teams'

export const metadata: Metadata = {
  title: 'Équipes Coupe du Monde 2026 – Les 48 nations participantes',
  description: 'Découvrez les 48 équipes de la Coupe du Monde 2026 : joueurs clés, sélectionneurs, groupes et classement FIFA. France, Brésil, Argentine, Maroc et toutes les nations.',
  keywords: ['équipes Coupe du Monde 2026', '48 nations Mondial 2026', 'France', 'Brésil', 'Argentine', 'Maroc', 'sélections FIFA'],
}

export default function EquipesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">🌍 Nations</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Les 48 équipes – Mondial 2026
        </h1>
        <p className="text-white/60 max-w-2xl">
          Retrouvez toutes les sélections qualifiées pour la Coupe du Monde 2026, classées par groupe, avec leurs effectifs, leurs coachs et leur historique en Coupe du Monde.
        </p>
      </div>

      <AdBanner slot="equipes-top" format="horizontal" className="mb-8" />

      {/* Navigation par groupe */}
      <div className="flex flex-wrap gap-2 mb-10">
        {GROUPS.map(g => (
          <a
            key={g}
            href={`#groupe-${g}`}
            className="w-9 h-9 rounded-lg bg-brand-blue/50 border border-white/10 hover:border-brand-gold/50 hover:bg-brand-blue text-white font-bold text-sm flex items-center justify-center transition-all"
          >
            {g}
          </a>
        ))}
      </div>

      {/* Groupes */}
      {GROUPS.map(group => {
        const groupTeams = teams.filter(t => t.group === group)
        if (groupTeams.length === 0) return null
        return (
          <section key={group} id={`groupe-${group}`} className="mb-12 scroll-mt-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center font-black text-brand-navy text-lg"
                style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)' }}>
                {group}
              </div>
              <h2 className="text-2xl font-extrabold text-white">Groupe {group}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {groupTeams.map(team => <TeamCard key={team.id} team={team} />)}
            </div>
          </section>
        )
      })}

      <AdBanner slot="equipes-bottom" format="horizontal" className="mt-10" />
    </div>
  )
}
