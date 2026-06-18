// GET /api/match/[id]
// Retourne événements + stats + compos + cotes pour un match
// [id] = fixture ID Api-Football ou slug interne (ex: "france-vs-australie")

import { NextRequest, NextResponse } from 'next/server'
import {
  hasApiKey,
  fetchMatchEvents,
  fetchMatchStatistics,
  fetchMatchLineups,
  fetchMatchOdds,
  fetchLiveOdds,
  translateStatus,
} from '@/lib/api'
import { getMatchDetail } from '@/data/matchDetails'
import { matches } from '@/data/matches'

export const dynamic = 'force-dynamic'

interface Context { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = params

  // ── Validation du paramètre id ───────────────────────────
  if (!id || id.length > 100 || !/^[a-zA-Z0-9\-_]+$/.test(id)) {
    return NextResponse.json({ error: 'Paramètre id invalide' }, { status: 400 })
  }

  // ── Mode API réelle ──────────────────────────────────────
  if (hasApiKey()) {
    const fixtureId = parseInt(id)
    if (!isNaN(fixtureId)) {
      try {
        // Appels parallèles pour réduire la latence
        const [events, statistics, lineups, odds] = await Promise.allSettled([
          fetchMatchEvents(fixtureId),
          fetchMatchStatistics(fixtureId),
          fetchMatchLineups(fixtureId),
          fetchMatchOdds(fixtureId),
        ])

        // Essaie aussi les cotes live si match en cours
        let liveOdds = null
        try { liveOdds = await fetchLiveOdds(fixtureId) } catch {}

        return NextResponse.json({
          source: 'api',
          fixtureId,
          events:     events.status     === 'fulfilled' ? events.value     : [],
          statistics: statistics.status === 'fulfilled' ? statistics.value : [],
          lineups:    lineups.status    === 'fulfilled' ? lineups.value    : [],
          odds:       liveOdds ?? (odds.status === 'fulfilled' ? odds.value : null),
          updatedAt:  new Date().toISOString(),
        })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur'
        console.error('[/api/match]', message)
        return fallback(id, message)
      }
    }
  }

  return fallback(id)
}

function fallback(id: string, error?: string) {
  // Cherche le match dans les données statiques
  const match = matches.find(m =>
    m.id === id || `${m.homeTeam}-vs-${m.awayTeam}` === id
  )
  const detail = getMatchDetail(id, match?.homeTeamName, match?.awayTeamName)

  return NextResponse.json({
    source:    'static',
    matchId:   id,
    events:    detail.events,
    stats:     detail.stats,
    lineups:   { home: detail.homeLineup, away: detail.awayLineup },
    odds:      { bookmakers: detail.odds },
    updatedAt: new Date().toISOString(),
    error,
    warning:   error ? undefined : 'Données démo. Ajoutez API_FOOTBALL_KEY dans .env.local.',
  })
}
