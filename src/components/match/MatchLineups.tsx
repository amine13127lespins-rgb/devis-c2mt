'use client'

import type { TeamLineup } from '@/data/matchDetails'

interface Props {
  home: TeamLineup
  away: TeamLineup
}

const POSITION_COLORS: Record<string, string> = {
  GB:  'bg-yellow-500/30 border-yellow-500/60 text-yellow-300',
  DD:  'bg-blue-500/30 border-blue-500/60 text-blue-300',
  DC:  'bg-blue-500/30 border-blue-500/60 text-blue-300',
  DG:  'bg-blue-500/30 border-blue-500/60 text-blue-300',
  MDC: 'bg-green-600/30 border-green-600/60 text-green-300',
  MC:  'bg-green-600/30 border-green-600/60 text-green-300',
  MD:  'bg-green-500/30 border-green-500/60 text-green-300',
  MA:  'bg-green-500/30 border-green-500/60 text-green-300',
  MG:  'bg-green-500/30 border-green-500/60 text-green-300',
  AD:  'bg-red-500/30 border-red-500/60 text-red-300',
  AG:  'bg-red-500/30 border-red-500/60 text-red-300',
  AT:  'bg-red-500/30 border-red-500/60 text-red-300',
  BU:  'bg-red-500/30 border-red-500/60 text-red-300',
}

function PlayerChip({ player, side }: { player: { name: string; number: number; position: string }; side: 'home' | 'away' }) {
  const colorClass = POSITION_COLORS[player.position] ?? 'bg-white/10 border-white/20 text-white/70'
  return (
    <div className={`flex items-center gap-2 border rounded-xl px-3 py-2 ${colorClass} ${
      side === 'away' ? 'flex-row-reverse' : ''
    }`}>
      <span className="text-xs font-black opacity-70 w-5 text-center shrink-0">{player.number}</span>
      <span className="text-xs font-semibold truncate">{player.name}</span>
      <span className="text-[10px] opacity-60 shrink-0 uppercase">{player.position}</span>
    </div>
  )
}

export default function MatchLineups({ home, away }: Props) {
  if (home.startXI.length === 0 && away.startXI.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-white/40 text-sm">Compositions non disponibles.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Formations */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10">
          <h3 className="font-bold text-white">🧑‍💼 Compositions</h3>
        </div>

        {/* Terrain visuel */}
        <div className="relative bg-gradient-to-b from-green-900/40 to-green-800/40 mx-4 my-4 rounded-2xl overflow-hidden"
          style={{ height: '420px' }}>

          {/* Lignes de terrain */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/10" />
            <div className="absolute bottom-8 left-1/4 right-1/4 h-16 border border-white/10 border-t-0" />
            <div className="absolute top-8 left-1/4 right-1/4 h-16 border border-white/10 border-b-0" />
          </div>

          {/* Équipe domicile (gauche) */}
          <div className="absolute inset-y-0 left-0 w-1/2 px-3 py-4 flex flex-col justify-around">
            {['GB', 'D', 'M', 'A'].map((zone, zi) => {
              const zonePlayers = home.startXI.filter(p => {
                if (zone === 'GB') return p.player.position === 'GB'
                if (zone === 'D')  return ['DD','DC','DG'].includes(p.player.position)
                if (zone === 'M')  return ['MDC','MC','MD','MA','MG'].includes(p.player.position)
                return ['AT','AD','AG','BU'].includes(p.player.position)
              })
              if (zonePlayers.length === 0) return null
              return (
                <div key={zone} className="flex flex-col gap-1 items-start">
                  {zonePlayers.map(p => (
                    <div key={p.player.number} className="bg-brand-blue/60 border border-blue-400/30 text-white rounded-lg px-2 py-1 text-[10px] font-semibold max-w-[90px] truncate">
                      {p.player.number}. {p.player.name.split(' ').pop()}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          {/* Équipe extérieur (droite, inversée) */}
          <div className="absolute inset-y-0 right-0 w-1/2 px-3 py-4 flex flex-col-reverse justify-around">
            {['GB', 'D', 'M', 'A'].map((zone, zi) => {
              const zonePlayers = away.startXI.filter(p => {
                if (zone === 'GB') return p.player.position === 'GB'
                if (zone === 'D')  return ['DD','DC','DG'].includes(p.player.position)
                if (zone === 'M')  return ['MDC','MC','MD','MA','MG'].includes(p.player.position)
                return ['AT','AD','AG','BU'].includes(p.player.position)
              })
              if (zonePlayers.length === 0) return null
              return (
                <div key={zone} className="flex flex-col gap-1 items-end">
                  {zonePlayers.map(p => (
                    <div key={p.player.number} className="bg-brand-gold/20 border border-brand-gold/30 text-brand-gold rounded-lg px-2 py-1 text-[10px] font-semibold max-w-[90px] truncate">
                      {p.player.number}. {p.player.name.split(' ').pop()}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          {/* Formations badge */}
          <div className="absolute bottom-2 left-2 text-[10px] text-white/30 font-bold">{home.formation}</div>
          <div className="absolute bottom-2 right-2 text-[10px] text-white/30 font-bold">{away.formation}</div>
        </div>
      </div>

      {/* Titulaires liste */}
      <div className="grid md:grid-cols-2 gap-5">
        {[
          { lineup: home, side: 'home' as const },
          { lineup: away, side: 'away' as const },
        ].map(({ lineup, side }) => (
          <div key={side} className="card overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
              <span className="text-2xl">{lineup.flag}</span>
              <div>
                <div className="font-bold text-white text-sm">{lineup.name}</div>
                <div className="text-white/40 text-xs">Formation : {lineup.formation} • Coach : {lineup.coach}</div>
              </div>
            </div>
            <div className="p-3 space-y-1.5">
              <div className="text-white/40 text-[10px] uppercase tracking-wider px-1 mb-2">Titulaires</div>
              {lineup.startXI.map(p => (
                <PlayerChip key={p.player.number} player={p.player} side={side} />
              ))}
              {lineup.substitutes.length > 0 && (
                <>
                  <div className="text-white/40 text-[10px] uppercase tracking-wider px-1 mt-4 mb-2">Remplaçants</div>
                  {lineup.substitutes.map(p => (
                    <div key={p.player.number} className="flex items-center gap-2 px-3 py-1.5 text-white/40 text-xs">
                      <span className="font-bold w-5 text-center">{p.player.number}</span>
                      <span>{p.player.name}</span>
                      <span className="ml-auto text-[10px] uppercase opacity-60">{p.player.position}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
