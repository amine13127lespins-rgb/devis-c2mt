import Link from 'next/link'
import type { Team } from '@/data/teams'

interface TeamCardProps {
  team: Team
  compact?: boolean
}

export default function TeamCard({ team, compact = false }: TeamCardProps) {
  if (compact) {
    return (
      <Link href={`/equipes/${team.id}`}>
        <div className="card-hover p-4 flex items-center gap-3">
          <span className="text-3xl">{team.flag}</span>
          <div className="min-w-0">
            <div className="font-bold text-white text-sm truncate">{team.name}</div>
            <div className="text-white/40 text-xs">Groupe {team.group} • #{team.ranking} FIFA</div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/equipes/${team.id}`}>
      <div className="card-hover p-5 flex flex-col gap-3">
        {/* Flag + nom */}
        <div className="flex items-center gap-4">
          <span className="text-5xl">{team.flag}</span>
          <div>
            <div className="font-extrabold text-white text-lg leading-tight">{team.name}</div>
            <div className="text-brand-gold text-sm font-bold">{team.shortName}</div>
          </div>
        </div>

        {/* Méta */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-white/40 text-xs mb-1">Groupe</div>
            <div className="text-white font-black text-xl">{team.group}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-white/40 text-xs mb-1">Classement FIFA</div>
            <div className="text-white font-black text-xl">#{team.ranking}</div>
          </div>
        </div>

        {/* Coach */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/40">Sélectionneur</span>
          <span className="text-white/80 font-semibold">{team.coach}</span>
        </div>

        {/* Joueurs clés */}
        {team.keyPlayers.length > 0 && (
          <div className="border-t border-white/10 pt-3">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Joueurs clés</div>
            <div className="flex flex-wrap gap-1.5">
              {team.keyPlayers.slice(0, 3).map(p => (
                <span key={p.name} className="bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-xs text-white/70">
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
