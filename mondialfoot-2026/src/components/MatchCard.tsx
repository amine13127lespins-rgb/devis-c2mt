import Link from 'next/link'
import type { Match } from '@/data/matches'

interface MatchCardProps {
  match: Match
  compact?: boolean
}

export default function MatchCard({ match, compact = false }: MatchCardProps) {
  const isLive     = match.status === 'live'
  const isFinished = match.status === 'finished'
  const slug       = `${match.homeTeam}-vs-${match.awayTeam}`

  return (
    <Link href={`/match/${slug}`} className="block">
      <div className={`card-hover p-4 ${compact ? 'py-3' : 'py-5'}`}>
        {/* En-tête : phase + stade */}
        {!compact && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/40 text-xs">{match.round}</span>
            <span className="text-white/40 text-xs truncate max-w-[140px]">{match.stadiumCity}</span>
          </div>
        )}

        {/* Statut */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/40 text-xs">{match.date.split('-').reverse().join('/')} • {match.time}</span>
          {isLive && (
            <span className="badge-live">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse inline-block" />
              {match.minute}&apos;
            </span>
          )}
          {isFinished && <span className="badge-finished">Terminé</span>}
          {!isLive && !isFinished && <span className="badge-upcoming">À venir</span>}
        </div>

        {/* Score principal */}
        <div className="flex items-center justify-between gap-2">
          {/* Équipe domicile */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-2xl">{match.homeTeamFlag}</span>
            <span className={`font-bold text-sm truncate ${isFinished && (match.homeScore ?? 0) > (match.awayScore ?? 0) ? 'text-white' : 'text-white/70'}`}>
              {match.homeTeamName}
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1 shrink-0">
            {isFinished || isLive ? (
              <div className="flex items-center gap-1">
                <span className={`text-xl font-black tabular-nums ${isLive ? 'text-white' : 'text-white/90'}`}>
                  {match.homeScore}
                </span>
                <span className="text-white/30 font-bold">–</span>
                <span className={`text-xl font-black tabular-nums ${isLive ? 'text-white' : 'text-white/90'}`}>
                  {match.awayScore}
                </span>
              </div>
            ) : (
              <span className="text-brand-gold font-bold text-base px-2">{match.time}</span>
            )}
          </div>

          {/* Équipe extérieur */}
          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
            <span className={`font-bold text-sm truncate text-right ${isFinished && (match.awayScore ?? 0) > (match.homeScore ?? 0) ? 'text-white' : 'text-white/70'}`}>
              {match.awayTeamName}
            </span>
            <span className="text-2xl">{match.awayTeamFlag}</span>
          </div>
        </div>

        {/* Chaînes TV */}
        {!compact && match.tvChannels && match.tvChannels.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-white/30 text-xs">📺</span>
            <div className="flex gap-1.5">
              {match.tvChannels.map(ch => (
                <span key={ch} className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-white/50">
                  {ch}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
