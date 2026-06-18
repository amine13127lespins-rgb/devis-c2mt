import type { Group } from '@/data/groups'
import { getGoalDiff } from '@/data/groups'

interface GroupTableProps {
  group: Group
  compact?: boolean
}

const qualifiedColors: Record<string, string> = {
  qualified:  'bg-green-500/20 border-l-2 border-green-500',
  possible:   '',
  eliminated: 'opacity-50',
}

export default function GroupTable({ group, compact = false }: GroupTableProps) {
  const sorted = [...group.standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    const diffA = getGoalDiff(a)
    const diffB = getGoalDiff(b)
    if (diffB !== diffA) return diffB - diffA
    return b.goalsFor - a.goalsFor
  })

  return (
    <div className="card overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <h3 className="font-bold text-white">{group.name}</h3>
        {!compact && (
          <div className="flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-wider">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-500/50 inline-block"/>Qualifié</span>
          </div>
        )}
      </div>

      <table className="w-full group-table">
        <thead>
          <tr className="bg-white/5">
            <th className="text-left">#</th>
            <th className="text-left">Équipe</th>
            <th className="text-center">J</th>
            {!compact && (
              <>
                <th className="text-center">V</th>
                <th className="text-center">N</th>
                <th className="text-center">D</th>
                <th className="text-center">BP</th>
                <th className="text-center">BC</th>
                <th className="text-center">Diff</th>
              </>
            )}
            <th className="text-center font-bold text-white">Pts</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((team, i) => (
            <tr
              key={team.teamId}
              className={`${qualifiedColors[team.qualified ?? 'possible']} transition-colors hover:bg-white/5`}
            >
              <td className="text-white/40 font-mono text-xs pl-4">{i + 1}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span>{team.teamFlag}</span>
                  <span className={`font-semibold ${i < 2 ? 'text-white' : 'text-white/70'}`}>
                    {compact ? team.teamName.split(' ')[0] : team.teamName}
                  </span>
                </div>
              </td>
              <td className="text-center text-white/60">{team.played}</td>
              {!compact && (
                <>
                  <td className="text-center text-green-400">{team.wins}</td>
                  <td className="text-center text-yellow-400">{team.draws}</td>
                  <td className="text-center text-red-400">{team.losses}</td>
                  <td className="text-center text-white/60">{team.goalsFor}</td>
                  <td className="text-center text-white/60">{team.goalsAgainst}</td>
                  <td className={`text-center font-semibold ${getGoalDiff(team) > 0 ? 'text-green-400' : getGoalDiff(team) < 0 ? 'text-red-400' : 'text-white/60'}`}>
                    {getGoalDiff(team) > 0 ? `+${getGoalDiff(team)}` : getGoalDiff(team)}
                  </td>
                </>
              )}
              <td className="text-center">
                <span className="font-black text-white text-base">{team.points}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
