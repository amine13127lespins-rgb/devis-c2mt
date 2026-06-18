'use client'

// Carte de match pour données Api-Football (format normalisé /api/live)

export interface LiveFixture {
  id: string
  homeTeamName: string
  awayTeamName: string
  homeTeamFlag?: string
  homeTeamLogo?: string
  awayTeamFlag?: string
  awayTeamLogo?: string
  homeScore:    number | null
  awayScore:    number | null
  status:       'live' | 'finished' | 'upcoming'
  statusShort:  string
  minute:       number | null
  round:        string
  stadiumName:  string
  stadiumCity:  string
  date:         string
  halfTimeHome: number | null
  halfTimeAway: number | null
  tvChannels?:  string[]
}

interface Props {
  fixture: LiveFixture
  highlight?: boolean
}

const STATUS_LABELS: Record<string, string> = {
  '1H':  '1ère mi-temps',
  'HT':  'Mi-temps',
  '2H':  '2ème mi-temps',
  'ET':  'Prolongations',
  'BT':  'Pause prolong.',
  'P':   'Tirs au but',
  'FT':  'Terminé',
  'AET': 'Ap. prolong.',
  'PEN': 'Ap. TAB',
  'NS':  'À venir',
  'PST': 'Reporté',
  'CANC':'Annulé',
}

export default function LiveMatchCard({ fixture, highlight = false }: Props) {
  const isLive     = fixture.status === 'live'
  const isFinished = fixture.status === 'finished'

  return (
    <div className={`relative rounded-2xl overflow-hidden ${highlight ? 'ring-2 ring-red-500/50' : ''}`}>
      {/* Halo rouge pour les matchs en direct */}
      {isLive && highlight && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-brand-gold/20 rounded-2xl blur-sm pointer-events-none" />
      )}

      <div className="relative bg-brand-blue/30 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/40 text-xs truncate max-w-[160px]">{fixture.round}</span>
          <div className="flex items-center gap-2 shrink-0">
            {isLive && (
              <span className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {STATUS_LABELS[fixture.statusShort] ?? fixture.statusShort}
                {fixture.minute && ` ${fixture.minute}'`}
              </span>
            )}
            {isFinished && (
              <span className="bg-white/5 border border-white/20 text-white/50 text-xs font-bold px-2.5 py-1 rounded-full">
                {STATUS_LABELS[fixture.statusShort] ?? 'Terminé'}
              </span>
            )}
            {!isLive && !isFinished && (
              <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full">
                {STATUS_LABELS[fixture.statusShort] ?? 'À venir'}
              </span>
            )}
          </div>
        </div>

        {/* Score + équipes */}
        <div className="flex items-center justify-between gap-3">
          {/* Domicile */}
          <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
            {fixture.homeTeamLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={fixture.homeTeamLogo} alt={fixture.homeTeamName} className="w-12 h-12 object-contain" />
            ) : (
              <span className="text-4xl">{fixture.homeTeamFlag ?? '🏳️'}</span>
            )}
            <span className={`font-bold text-sm text-center leading-tight ${
              isFinished && (fixture.homeScore ?? 0) > (fixture.awayScore ?? 0) ? 'text-white' : 'text-white/70'
            }`}>
              {fixture.homeTeamName}
            </span>
          </div>

          {/* Score central */}
          <div className="shrink-0 text-center min-w-[80px]">
            {isLive || isFinished ? (
              <>
                <div className={`text-4xl font-black tabular-nums ${isLive ? 'text-white' : 'text-white/90'}`}>
                  {fixture.homeScore ?? 0} – {fixture.awayScore ?? 0}
                </div>
                {/* Score mi-temps */}
                {(fixture.halfTimeHome !== null || fixture.halfTimeAway !== null) && (
                  <div className="text-white/30 text-xs mt-1">
                    Mi-temps : {fixture.halfTimeHome ?? 0} – {fixture.halfTimeAway ?? 0}
                  </div>
                )}
              </>
            ) : (
              <div className="text-brand-gold font-black text-2xl">VS</div>
            )}
          </div>

          {/* Extérieur */}
          <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
            {fixture.awayTeamLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={fixture.awayTeamLogo} alt={fixture.awayTeamName} className="w-12 h-12 object-contain" />
            ) : (
              <span className="text-4xl">{fixture.awayTeamFlag ?? '🏳️'}</span>
            )}
            <span className={`font-bold text-sm text-center leading-tight ${
              isFinished && (fixture.awayScore ?? 0) > (fixture.homeScore ?? 0) ? 'text-white' : 'text-white/70'
            }`}>
              {fixture.awayTeamName}
            </span>
          </div>
        </div>

        {/* Stade + TV */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <span className="text-white/30 text-xs truncate">
            🏟️ {fixture.stadiumName}, {fixture.stadiumCity}
          </span>
          {fixture.tvChannels && fixture.tvChannels.length > 0 && (
            <div className="flex gap-1 shrink-0">
              {fixture.tvChannels.slice(0, 2).map(ch => (
                <span key={ch} className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-white/40">
                  {ch}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
