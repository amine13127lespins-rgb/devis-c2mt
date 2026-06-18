'use client'

import type { MatchStat } from '@/data/matchDetails'

interface Props {
  stats:        MatchStat[]
  homeTeamName: string
  awayTeamName: string
  homeTeamFlag: string
  awayTeamFlag: string
}

export default function MatchStats({ stats, homeTeamName, awayTeamName, homeTeamFlag, awayTeamFlag }: Props) {
  if (stats.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-white/40 text-sm">Statistiques non disponibles.</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10">
        <h3 className="font-bold text-white">📊 Statistiques</h3>
      </div>

      {/* En-tête équipes */}
      <div className="grid grid-cols-3 text-center py-4 bg-white/5">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">{homeTeamFlag}</span>
          <span className="text-white font-bold text-xs">{homeTeamName}</span>
        </div>
        <div />
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">{awayTeamFlag}</span>
          <span className="text-white font-bold text-xs">{awayTeamName}</span>
        </div>
      </div>

      <div className="divide-y divide-white/5 px-5">
        {stats.map((stat, i) => {
          const hasBar = stat.homeRaw !== undefined && stat.awayRaw !== undefined
          const total  = hasBar ? (stat.homeRaw! + stat.awayRaw!) : 0
          const homePct = total > 0 ? (stat.homeRaw! / total) * 100 : 50
          const awayPct = total > 0 ? (stat.awayRaw! / total) * 100 : 50

          return (
            <div key={i} className="py-4">
              {/* Valeurs + label */}
              <div className="grid grid-cols-3 items-center mb-2">
                <span className="font-black text-white text-lg text-left">
                  {stat.home}
                </span>
                <span className="text-white/40 text-xs text-center uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="font-black text-white text-lg text-right">
                  {stat.away}
                </span>
              </div>

              {/* Barre de progression */}
              {hasBar && (
                <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                  <div
                    className="h-full rounded-l-full transition-all duration-700"
                    style={{
                      width: `${homePct}%`,
                      background: 'linear-gradient(90deg, #2563EB, #1A3A6B)',
                    }}
                  />
                  <div
                    className="h-full rounded-r-full transition-all duration-700"
                    style={{
                      width: `${awayPct}%`,
                      background: 'linear-gradient(90deg, #D4A017, #F5C842)',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
