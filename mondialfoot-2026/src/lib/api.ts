// ============================================================
//  CONNECTEUR API FOOTBALL
//  Pour passer de données statiques à des données en temps réel,
//  décommentez et configurez l'un des providers ci-dessous.
// ============================================================

// ── PROVIDER 1 : football-data.org (gratuit jusqu'à 10 req/min) ──
// const FOOTBALL_DATA_TOKEN = process.env.FOOTBALL_DATA_TOKEN
// const BASE_URL = 'https://api.football-data.org/v4'
// const WC2026_ID = 2018 // ID de la compétition à vérifier

// export async function fetchLiveMatches() {
//   const res = await fetch(`${BASE_URL}/competitions/${WC2026_ID}/matches?status=LIVE`, {
//     headers: { 'X-Auth-Token': FOOTBALL_DATA_TOKEN! },
//     next: { revalidate: 30 }, // Revalidation ISR toutes les 30 secondes
//   })
//   if (!res.ok) throw new Error('Erreur API football-data.org')
//   return res.json()
// }

// ── PROVIDER 2 : Api-Football (via RapidAPI) ──
// const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY
// const API_FOOTBALL_HOST = 'api-football-v1.p.rapidapi.com'

// export async function fetchMatchesByDate(date: string) {
//   const res = await fetch(`https://${API_FOOTBALL_HOST}/v3/fixtures?date=${date}&league=1&season=2026`, {
//     headers: {
//       'X-RapidAPI-Key': API_FOOTBALL_KEY!,
//       'X-RapidAPI-Host': API_FOOTBALL_HOST,
//     },
//     next: { revalidate: 60 },
//   })
//   return res.json()
// }

// ── DONNÉES STATIQUES (mode par défaut) ──
export function getApiStatus() {
  return {
    provider: 'static',
    message: 'Mode données statiques. Configurez une API pour les données en temps réel.',
    docs: 'https://www.football-data.org/documentation/quickstart',
  }
}
