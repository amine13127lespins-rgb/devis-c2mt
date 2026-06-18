'use client'

import type { MatchEvent } from '@/data/matchDetails'

const EVENT_ICONS: Record<MatchEvent['type'], string> = {
  goal:         '⚽',
  penalty:      '⚽🎯',
  ownGoal:      '⚽😬',
  yellowCard:   '🟨',
  redCard:      '🟥',
  substitution: '🔄',
  var:          '📺',
}

const EVENT_LABELS: Record<MatchEvent['type'], string> = {
  goal:         'But',
  penalty:      'Penalty',
  ownGoal:      'CSC',
  yellowCard:   'Carton jaune',
  redCard:      'Carton rouge',
  substitution: 'Remplacement',
  var:          'VAR',
}

interface Props {
  events:       MatchEvent[]
  homeTeamName: string
  awayTeamName: string
}

export default function MatchTimeline({ events, homeTeamName, awayTeamName }: Props) {
  if (events.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-white/40 text-sm">Aucun événement pour l&apos;instant.</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10">
        <h3 className="font-bold text-white">⚡ Événements du match</h3>
      </div>

      <div className="divide-y divide-white/5">
        {events.map((ev, i) => {
          const isHome = ev.team === 'home'
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
                isHome ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Minute */}
              <div className="w-12 shrink-0 text-center">
                <span className={`text-xs font-black px-2 py-1 rounded-full ${
                  ev.type === 'goal' || ev.type === 'penalty'
                    ? 'bg-brand-gold/20 text-brand-gold'
                    : ev.type === 'yellowCard'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : ev.type === 'redCard'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-white/10 text-white/50'
                }`}>
                  {ev.minute}{ev.extraTime ? `+${ev.extraTime}` : ''}&apos;
                </span>
              </div>

              {/* Icône */}
              <div className="text-xl shrink-0">{EVENT_ICONS[ev.type]}</div>

              {/* Détail */}
              <div className={`flex-1 min-w-0 ${isHome ? 'text-left' : 'text-right'}`}>
                <div className="font-semibold text-white text-sm">{ev.player}</div>
                {ev.assist && (
                  <div className="text-white/40 text-xs">Passeur : {ev.assist}</div>
                )}
                <div className={`text-xs mt-0.5 ${
                  ev.type === 'goal' ? 'text-brand-gold' : 'text-white/40'
                }`}>
                  {EVENT_LABELS[ev.type]}{ev.detail && ev.detail !== 'But normal' ? ` – ${ev.detail}` : ''}
                </div>
              </div>

              {/* Nom équipe */}
              <div className={`text-xs text-white/30 shrink-0 hidden sm:block ${
                isHome ? '' : ''
              }`}>
                {ev.teamName}
              </div>
            </div>
          )
        })}
      </div>

      {/* Légende */}
      <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/30">
        <span>← {homeTeamName}</span>
        <div className="flex gap-4">
          {Object.entries(EVENT_ICONS).slice(0, 4).map(([type, icon]) => (
            <span key={type} title={EVENT_LABELS[type as MatchEvent['type']]}>{icon}</span>
          ))}
        </div>
        <span>{awayTeamName} →</span>
      </div>
    </div>
  )
}
