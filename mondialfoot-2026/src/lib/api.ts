// ============================================================
//  API FOOTBALL – api-football-v1.p.rapidapi.com
//  Inscrivez-vous sur https://rapidapi.com/api-sports/api/api-football
//  Ajoutez dans .env.local :
//    API_FOOTBALL_KEY=votre_clé_rapidapi
// ============================================================

const API_HOST = 'api-football-v1.p.rapidapi.com'
const API_BASE = `https://${API_HOST}/v3`

// ID de la Coupe du Monde dans Api-Football
const WC_LEAGUE_ID = 1
const WC_SEASON    = 2026

// Headers communs
function getHeaders(): HeadersInit {
  const key = process.env.API_FOOTBALL_KEY
  if (!key) throw new Error('API_FOOTBALL_KEY manquante dans .env.local')
  return {
    'X-RapidAPI-Key':  key,
    'X-RapidAPI-Host': API_HOST,
  }
}

// ── TYPES RETOURNÉS PAR L'API ────────────────────────────────

export interface ApiFixture {
  fixture: {
    id: number
    date: string            // ISO 8601
    status: {
      short: string         // 'NS' | '1H' | 'HT' | '2H' | 'FT' | 'AET' | 'PEN'
      elapsed: number | null
    }
    venue: { name: string; city: string }
  }
  league: {
    round: string           // ex: "Group Stage - 2"
  }
  teams: {
    home: { id: number; name: string; logo: string; winner: boolean | null }
    away: { id: number; name: string; logo: string; winner: boolean | null }
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    halftime:   { home: number | null; away: number | null }
    fulltime:   { home: number | null; away: number | null }
    extratime:  { home: number | null; away: number | null }
    penalty:    { home: number | null; away: number | null }
  }
}

export interface ApiFixturesResponse {
  response: ApiFixture[]
  errors: Record<string, string>
  results: number
}

// ── Traduit le status Api-Football en statut interne ─────────
export function translateStatus(short: string): 'live' | 'finished' | 'upcoming' {
  if (['1H', 'HT', '2H', 'ET', 'BT', 'P', 'INT', 'LIVE'].includes(short)) return 'live'
  if (['FT', 'AET', 'PEN'].includes(short)) return 'finished'
  return 'upcoming'
}

// ── Traduit le libellé de la phase ──────────────────────────
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
//  MATCHS EN DIRECT
// ────────────────────────────────────────────────────────────
export async function fetchLiveMatches(): Promise<ApiFixture[]> {
  const res = await fetch(
    `${API_BASE}/fixtures?live=all&league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    {
      headers: getHeaders(),
      // Pas de cache – données en temps réel
      cache: 'no-store',
    }
  )
  if (!res.ok) throw new Error(`Api-Football erreur ${res.status}`)
  const data: ApiFixturesResponse = await res.json()
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(JSON.stringify(data.errors))
  }
  return data.response
}

// ────────────────────────────────────────────────────────────
//  MATCHS DU JOUR
// ────────────────────────────────────────────────────────────
export async function fetchTodayMatches(): Promise<ApiFixture[]> {
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  const res = await fetch(
    `${API_BASE}/fixtures?date=${today}&league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    {
      headers: getHeaders(),
      next: { revalidate: 60 }, // Revalide toutes les 60s via ISR
    }
  )
  if (!res.ok) throw new Error(`Api-Football erreur ${res.status}`)
  const data: ApiFixturesResponse = await res.json()
  return data.response
}

// ────────────────────────────────────────────────────────────
//  MATCHS PAR DATE
// ────────────────────────────────────────────────────────────
export async function fetchMatchesByDate(date: string): Promise<ApiFixture[]> {
  const res = await fetch(
    `${API_BASE}/fixtures?date=${date}&league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    }
  )
  if (!res.ok) throw new Error(`Api-Football erreur ${res.status}`)
  const data: ApiFixturesResponse = await res.json()
  return data.response
}

// ────────────────────────────────────────────────────────────
//  TOUS LES MATCHS D'UNE COMPÉTITION (phase de groupes)
// ────────────────────────────────────────────────────────────
export async function fetchAllMatches(): Promise<ApiFixture[]> {
  const res = await fetch(
    `${API_BASE}/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 }, // Revalide toutes les heures
    }
  )
  if (!res.ok) throw new Error(`Api-Football erreur ${res.status}`)
  const data: ApiFixturesResponse = await res.json()
  return data.response
}

// ────────────────────────────────────────────────────────────
//  DÉTAIL D'UN MATCH
// ────────────────────────────────────────────────────────────
export async function fetchFixtureById(id: number): Promise<ApiFixture | null> {
  const res = await fetch(
    `${API_BASE}/fixtures?id=${id}`,
    {
      headers: getHeaders(),
      next: { revalidate: 30 },
    }
  )
  if (!res.ok) return null
  const data: ApiFixturesResponse = await res.json()
  return data.response[0] ?? null
}

// ────────────────────────────────────────────────────────────
//  CLASSEMENTS
// ────────────────────────────────────────────────────────────
export interface ApiStanding {
  rank: number
  team: { id: number; name: string; logo: string }
  group: string
  all: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } }
  points: number
  form: string
}

export async function fetchStandings(): Promise<ApiStanding[]> {
  const res = await fetch(
    `${API_BASE}/standings?league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    }
  )
  if (!res.ok) throw new Error(`Api-Football erreur ${res.status}`)
  const data = await res.json()
  // La réponse est imbriquée : response[0].league.standings[][]
  return data.response?.[0]?.league?.standings?.flat() ?? []
}

// ────────────────────────────────────────────────────────────
//  VÉRIFICATION DE LA CLÉ API
// ────────────────────────────────────────────────────────────
export function hasApiKey(): boolean {
  return Boolean(process.env.API_FOOTBALL_KEY)
}
