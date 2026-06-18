// ============================================================
//  API FOOTBALL – api-football-v1.p.rapidapi.com
//  Inscrivez-vous : https://rapidapi.com/api-sports/api/api-football
//  Ajoutez dans .env.local :
//    API_FOOTBALL_KEY=votre_clé_rapidapi
// ============================================================

const API_HOST = 'api-football-v1.p.rapidapi.com'
const API_BASE = `https://${API_HOST}/v3`

const WC_LEAGUE_ID = 1     // Coupe du Monde dans Api-Football
const WC_SEASON    = 2026

function getHeaders(): HeadersInit {
  const key = process.env.API_FOOTBALL_KEY
  if (!key) throw new Error('API_FOOTBALL_KEY manquante dans .env.local')
  return {
    'X-RapidAPI-Key':  key,
    'X-RapidAPI-Host': API_HOST,
  }
}

export function hasApiKey(): boolean {
  return Boolean(process.env.API_FOOTBALL_KEY)
}

// ────────────────────────────────────────────────────────────
//  TYPES – Fixtures
// ────────────────────────────────────────────────────────────
export interface ApiFixture {
  fixture: {
    id: number
    date: string
    status: { short: string; elapsed: number | null }
    venue: { name: string; city: string }
  }
  league: { round: string }
  teams: {
    home: { id: number; name: string; logo: string; winner: boolean | null }
    away: { id: number; name: string; logo: string; winner: boolean | null }
  }
  goals: { home: number | null; away: number | null }
  score: {
    halftime:  { home: number | null; away: number | null }
    fulltime:  { home: number | null; away: number | null }
    extratime: { home: number | null; away: number | null }
    penalty:   { home: number | null; away: number | null }
  }
}

// ────────────────────────────────────────────────────────────
//  TYPES – Événements (buts, cartons, remplacements)
// ────────────────────────────────────────────────────────────
export interface ApiEvent {
  time:   { elapsed: number; extra: number | null }
  team:   { id: number; name: string; logo: string }
  player: { id: number; name: string }
  assist: { id: number | null; name: string | null }
  type:   'Goal' | 'Card' | 'subst' | 'Var'
  detail: string   // ex: "Normal Goal", "Yellow Card", "Red Card", "Penalty"
  comments: string | null
}

// ────────────────────────────────────────────────────────────
//  TYPES – Statistiques
// ────────────────────────────────────────────────────────────
export interface ApiStatEntry {
  type:  string   // "Ball Possession", "Total Shots", "Shots on Goal"…
  value: string | number | null
}

export interface ApiTeamStats {
  team:       { id: number; name: string; logo: string }
  statistics: ApiStatEntry[]
}

// ────────────────────────────────────────────────────────────
//  TYPES – Compositions
// ────────────────────────────────────────────────────────────
export interface ApiPlayer {
  id:     number
  name:   string
  number: number
  pos:    string  // 'G' | 'D' | 'M' | 'F'
  grid:   string | null  // ex: "1:1" (colonne:ligne pour la grille)
}

export interface ApiTeamLineup {
  team:        { id: number; name: string; logo: string }
  coach:       { id: number; name: string; photo: string }
  formation:   string     // ex: "4-3-3"
  startXI:     Array<{ player: ApiPlayer }>
  substitutes: Array<{ player: ApiPlayer }>
}

// ────────────────────────────────────────────────────────────
//  TYPES – Cotes (Odds)
// ────────────────────────────────────────────────────────────
export interface ApiOddValue {
  value: string  // "Home" | "Draw" | "Away" | "Over 2.5" etc.
  odd:   string  // ex: "2.10"
}

export interface ApiOddBet {
  id:     number
  name:   string           // "Match Winner", "Goals Over/Under", "Both Teams Score"
  values: ApiOddValue[]
}

export interface ApiBookmaker {
  id:   number
  name: string             // "Betclic", "Winamax", "PMU"…
  bets: ApiOddBet[]
}

export interface ApiOddsFixture {
  fixture:    { id: number }
  bookmakers: ApiBookmaker[]
}

// ────────────────────────────────────────────────────────────
//  HELPERS
// ────────────────────────────────────────────────────────────
export function translateStatus(s: string): 'live' | 'finished' | 'upcoming' {
  if (['1H','HT','2H','ET','BT','P','INT','LIVE'].includes(s)) return 'live'
  if (['FT','AET','PEN'].includes(s))                          return 'finished'
  return 'upcoming'
}

export function translateRound(round: string): string {
  return round
    .replace('Group Stage', 'Phase de groupes')
    .replace('Round of 32', 'Huitièmes de finale')
    .replace('Round of 16', 'Huitièmes de finale')
    .replace('Quarter-finals', 'Quarts de finale')
    .replace('Semi-finals', 'Demi-finales')
    .replace('3rd Place Final', 'Match pour la 3ème place')
    .replace('Final', 'Finale')
}

// ────────────────────────────────────────────────────────────
//  FETCH – Matchs en direct
// ────────────────────────────────────────────────────────────
export async function fetchLiveMatches(): Promise<ApiFixture[]> {
  const res = await fetch(
    `${API_BASE}/fixtures?live=all&league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    { headers: getHeaders(), cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`Api-Football ${res.status}`)
  const data = await res.json()
  return data.response ?? []
}

// ────────────────────────────────────────────────────────────
//  FETCH – Matchs du jour
// ────────────────────────────────────────────────────────────
export async function fetchTodayMatches(): Promise<ApiFixture[]> {
  const today = new Date().toISOString().slice(0, 10)
  const res = await fetch(
    `${API_BASE}/fixtures?date=${today}&league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    { headers: getHeaders(), next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error(`Api-Football ${res.status}`)
  const data = await res.json()
  return data.response ?? []
}

// ────────────────────────────────────────────────────────────
//  FETCH – Matchs par date
// ────────────────────────────────────────────────────────────
export async function fetchMatchesByDate(date: string): Promise<ApiFixture[]> {
  const res = await fetch(
    `${API_BASE}/fixtures?date=${date}&league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    { headers: getHeaders(), next: { revalidate: 300 } }
  )
  if (!res.ok) throw new Error(`Api-Football ${res.status}`)
  const data = await res.json()
  return data.response ?? []
}

// ────────────────────────────────────────────────────────────
//  FETCH – Événements d'un match (buts, cartons, remplacements)
// ────────────────────────────────────────────────────────────
export async function fetchMatchEvents(fixtureId: number): Promise<ApiEvent[]> {
  const res = await fetch(
    `${API_BASE}/fixtures/events?fixture=${fixtureId}`,
    { headers: getHeaders(), next: { revalidate: 30 } }
  )
  if (!res.ok) throw new Error(`Api-Football ${res.status}`)
  const data = await res.json()
  return data.response ?? []
}

// ────────────────────────────────────────────────────────────
//  FETCH – Statistiques d'un match
// ────────────────────────────────────────────────────────────
export async function fetchMatchStatistics(fixtureId: number): Promise<ApiTeamStats[]> {
  const res = await fetch(
    `${API_BASE}/fixtures/statistics?fixture=${fixtureId}`,
    { headers: getHeaders(), next: { revalidate: 30 } }
  )
  if (!res.ok) throw new Error(`Api-Football ${res.status}`)
  const data = await res.json()
  return data.response ?? []
}

// ────────────────────────────────────────────────────────────
//  FETCH – Compositions d'un match
// ────────────────────────────────────────────────────────────
export async function fetchMatchLineups(fixtureId: number): Promise<ApiTeamLineup[]> {
  const res = await fetch(
    `${API_BASE}/fixtures/lineups?fixture=${fixtureId}`,
    { headers: getHeaders(), next: { revalidate: 300 } }
  )
  if (!res.ok) throw new Error(`Api-Football ${res.status}`)
  const data = await res.json()
  return data.response ?? []
}

// ────────────────────────────────────────────────────────────
//  FETCH – Cotes pré-match
// ────────────────────────────────────────────────────────────
export async function fetchMatchOdds(fixtureId: number): Promise<ApiOddsFixture | null> {
  const res = await fetch(
    `${API_BASE}/odds?fixture=${fixtureId}&bookmaker=8`,  // 8 = Bet365 (universel)
    { headers: getHeaders(), next: { revalidate: 300 } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.response?.[0] ?? null
}

// ────────────────────────────────────────────────────────────
//  FETCH – Cotes live
// ────────────────────────────────────────────────────────────
export async function fetchLiveOdds(fixtureId: number): Promise<ApiOddsFixture | null> {
  const res = await fetch(
    `${API_BASE}/odds/live?fixture=${fixtureId}`,
    { headers: getHeaders(), cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.response?.[0] ?? null
}

// ────────────────────────────────────────────────────────────
//  FETCH – Classements
// ────────────────────────────────────────────────────────────
export interface ApiStanding {
  rank:  number
  team:  { id: number; name: string; logo: string }
  group: string
  all:   { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } }
  points: number
  form:   string
}

export async function fetchStandings(): Promise<ApiStanding[]> {
  const res = await fetch(
    `${API_BASE}/standings?league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    { headers: getHeaders(), next: { revalidate: 300 } }
  )
  if (!res.ok) throw new Error(`Api-Football ${res.status}`)
  const data = await res.json()
  return data.response?.[0]?.league?.standings?.flat() ?? []
}
