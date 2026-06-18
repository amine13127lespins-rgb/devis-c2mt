// Route API Next.js : GET /api/fixtures?date=YYYY-MM-DD
// Retourne tous les matchs d'une date donnée

import { NextRequest, NextResponse } from 'next/server'
import { fetchMatchesByDate, translateStatus, translateRound, hasApiKey } from '@/lib/api'
import { getTodayMatches } from '@/data/matches'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date') ?? new Date().toISOString().slice(0, 10)

  if (hasApiKey()) {
    try {
      const fixtures = await fetchMatchesByDate(date)
      return NextResponse.json({
        source: 'api',
        date,
        fixtures: fixtures.map(f => ({
          id:           String(f.fixture.id),
          homeTeamName: f.teams.home.name,
          awayTeamName: f.teams.away.name,
          homeTeamLogo: f.teams.home.logo,
          awayTeamLogo: f.teams.away.logo,
          homeScore:    f.goals.home,
          awayScore:    f.goals.away,
          status:       translateStatus(f.fixture.status.short),
          statusShort:  f.fixture.status.short,
          minute:       f.fixture.status.elapsed,
          round:        translateRound(f.league.round),
          stadiumName:  f.fixture.venue.name,
          stadiumCity:  f.fixture.venue.city,
          date:         f.fixture.date.slice(0, 10),
          time:         new Date(f.fixture.date).toLocaleTimeString('fr-FR', {
            hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris',
          }),
        })),
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue'
      return NextResponse.json({ source: 'static', error: message, fixtures: getTodayMatches(date) })
    }
  }

  return NextResponse.json({
    source: 'static',
    date,
    fixtures: getTodayMatches(date),
    warning: 'Ajoutez API_FOOTBALL_KEY dans .env.local pour des données réelles.',
  })
}
