// Route API Next.js : GET /api/live
// Appelée par le composant client <LivePage> toutes les 30 secondes
// Retourne les matchs en direct + les matchs du jour

import { NextResponse } from 'next/server'
import { fetchLiveMatches, fetchTodayMatches, translateStatus, translateRound, hasApiKey } from '@/lib/api'
import { getLiveMatches, getTodayMatches } from '@/data/matches'

export const dynamic = 'force-dynamic' // Jamais mis en cache par Next.js

export async function GET() {
  // ── Mode API réelle ──────────────────────────────────────
  if (hasApiKey()) {
    try {
      const [liveFixtures, todayFixtures] = await Promise.all([
        fetchLiveMatches(),
        fetchTodayMatches(),
      ])

      // Normalise le format pour le composant client
      const normalize = (f: Awaited<ReturnType<typeof fetchLiveMatches>>[number]) => ({
        id:             String(f.fixture.id),
        homeTeamName:   f.teams.home.name,
        awayTeamName:   f.teams.away.name,
        homeTeamLogo:   f.teams.home.logo,
        awayTeamLogo:   f.teams.away.logo,
        homeScore:      f.goals.home,
        awayScore:      f.goals.away,
        status:         translateStatus(f.fixture.status.short),
        statusShort:    f.fixture.status.short,
        minute:         f.fixture.status.elapsed,
        round:          translateRound(f.league.round),
        stadiumName:    f.fixture.venue.name,
        stadiumCity:    f.fixture.venue.city,
        date:           f.fixture.date.slice(0, 10),
        // Score mi-temps
        halfTimeHome:   f.score.halftime.home,
        halfTimeAway:   f.score.halftime.away,
      })

      return NextResponse.json({
        source:  'api',
        live:    liveFixtures.map(normalize),
        today:   todayFixtures.map(normalize),
        updatedAt: new Date().toISOString(),
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue'
      console.error('[/api/live] Erreur Api-Football :', message)
      // Fallback sur données statiques si l'API échoue
      return fallbackResponse(message)
    }
  }

  // ── Mode données statiques (pas de clé API) ──────────────
  return fallbackResponse()
}

function fallbackResponse(error?: string) {
  const today = '2026-06-18'
  const liveMatches  = getLiveMatches()
  const todayMatches = getTodayMatches(today)

  return NextResponse.json({
    source:    'static',
    live:      liveMatches.map(normalizeStatic),
    today:     todayMatches.map(normalizeStatic),
    updatedAt: new Date().toISOString(),
    error,
    warning:   'Données statiques. Ajoutez API_FOOTBALL_KEY dans .env.local pour le live réel.',
  })
}

// Convertit le format statique en format unifié
function normalizeStatic(m: ReturnType<typeof getLiveMatches>[number]) {
  return {
    id:           m.id,
    homeTeamName: m.homeTeamName,
    awayTeamName: m.awayTeamName,
    homeTeamFlag: m.homeTeamFlag,
    awayTeamFlag: m.awayTeamFlag,
    homeScore:    m.homeScore,
    awayScore:    m.awayScore,
    status:       m.status,
    statusShort:  m.status === 'live' ? '1H' : m.status === 'finished' ? 'FT' : 'NS',
    minute:       m.minute ?? null,
    round:        m.round,
    stadiumName:  m.stadiumName,
    stadiumCity:  m.stadiumCity,
    date:         m.date,
    halfTimeHome: null,
    halfTimeAway: null,
    tvChannels:   m.tvChannels,
  }
}
