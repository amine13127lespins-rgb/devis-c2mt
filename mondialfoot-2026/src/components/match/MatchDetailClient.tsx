'use client'

import { useEffect, useState, useCallback } from 'react'
import MatchTimeline from './MatchTimeline'
import MatchStats    from './MatchStats'
import MatchLineups  from './MatchLineups'
import MatchOdds     from './MatchOdds'
import type { MatchEvent, MatchStat, TeamLineup, BookmakerOdds } from '@/data/matchDetails'

interface MatchDetailData {
  source:    'api' | 'static'
  events:    MatchEvent[]
  stats:     MatchStat[]
  lineups:   { home: TeamLineup; away: TeamLineup }
  odds:      { bookmakers: BookmakerOdds[] } | null
  updatedAt: string
  warning?:  string
}

type Tab = 'resume' | 'stats' | 'compos' | 'cotes'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'resume',  label: 'Résumé',        icon: '⚡' },
  { id: 'stats',   label: 'Statistiques',  icon: '📊' },
  { id: 'compos',  label: 'Compositions',  icon: '🧑‍💼' },
  { id: 'cotes',   label: 'Cotes',         icon: '💰' },
]

interface Props {
  matchId:      string
  homeTeamName: string
  awayTeamName: string
  homeTeamFlag: string
  awayTeamFlag: string
  isLive:       boolean
}

export default function MatchDetailClient({
  matchId, homeTeamName, awayTeamName, homeTeamFlag, awayTeamFlag, isLive,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('resume')
  const [data, setData]           = useState<MatchDetailData | null>(null)
  const [loading, setLoading]     = useState(true)
  const [countdown, setCountdown] = useState(30)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/match/${matchId}`, { cache: 'no-store' })
      const json = await res.json()
      setData(json)
    } catch {
      // silently keep previous data
    } finally {
      setLoading(false)
      setCountdown(30)
    }
  }, [matchId])

  // Initial fetch + live refresh every 30s
  useEffect(() => {
    fetchData()
    if (!isLive) return
    const interval = setInterval(fetchData, 30_000)
    return () => clearInterval(interval)
  }, [fetchData, isLive])

  // Countdown display (live only)
  useEffect(() => {
    if (!isLive || loading) return
    const tick = setInterval(() => setCountdown(c => (c <= 1 ? 30 : c - 1)), 1_000)
    return () => clearInterval(tick)
  }, [isLive, loading])

  return (
    <div className="space-y-6">
      {/* Live refresh indicator */}
      {isLive && !loading && (
        <div className="flex items-center justify-between text-xs text-white/40 px-1">
          <span>Mise à jour auto dans <span className="text-brand-gold font-bold">{countdown}s</span></span>
          <button
            onClick={fetchData}
            className="text-brand-gold hover:text-brand-gold-light transition-colors font-semibold"
          >
            ↺ Actualiser
          </button>
        </div>
      )}

      {/* Demo data warning */}
      {data?.warning && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-blue-300/80 text-xs">
          ℹ️ {data.warning}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-2xl p-1.5">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-brand-gold text-black shadow-lg'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="hidden sm:inline">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded-full w-1/3 mb-4" />
              <div className="space-y-2">
                <div className="h-3 bg-white/5 rounded-full" />
                <div className="h-3 bg-white/5 rounded-full w-4/5" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {activeTab === 'resume' && (
            <MatchTimeline
              events={data?.events ?? []}
              homeTeamName={homeTeamName}
              awayTeamName={awayTeamName}
            />
          )}

          {activeTab === 'stats' && (
            <MatchStats
              stats={data?.stats ?? []}
              homeTeamName={homeTeamName}
              awayTeamName={awayTeamName}
              homeTeamFlag={homeTeamFlag}
              awayTeamFlag={awayTeamFlag}
            />
          )}

          {activeTab === 'compos' && data?.lineups && (
            <MatchLineups home={data.lineups.home} away={data.lineups.away} />
          )}

          {activeTab === 'compos' && !data?.lineups && (
            <div className="card p-8 text-center">
              <p className="text-white/40 text-sm">Compositions non disponibles.</p>
            </div>
          )}

          {activeTab === 'cotes' && (
            <MatchOdds
              odds={data?.odds?.bookmakers ?? []}
              homeTeamName={homeTeamName}
              awayTeamName={awayTeamName}
              isLive={isLive}
            />
          )}
        </>
      )}
    </div>
  )
}
