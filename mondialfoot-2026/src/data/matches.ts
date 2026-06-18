// ============================================================
//  DONNÉES DES MATCHS – Coupe du Monde 2026
//  Phase de groupes + phases éliminatoires
//  Modifiez "score" et "status" pour mettre à jour les résultats
//  status: 'upcoming' | 'live' | 'finished'
// ============================================================

export type MatchStatus = 'upcoming' | 'live' | 'finished'

export interface Match {
  id: string
  homeTeam: string        // id équipe domicile
  awayTeam: string        // id équipe extérieur
  homeTeamName: string
  awayTeamName: string
  homeTeamFlag: string
  awayTeamFlag: string
  homeScore: number | null
  awayScore: number | null
  date: string            // ISO 8601
  time: string            // Heure locale France (CET+2 été)
  stadium: string         // id stade
  stadiumName: string
  stadiumCity: string
  group: string           // 'A'–'L' ou 'R32', 'R16', 'QF', 'SF', '3rd', 'F'
  round: string           // Libellé phase
  status: MatchStatus
  minute?: number         // si live
  tvChannels?: string[]   // chaînes TV françaises
}

export const matches: Match[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  GROUPE A – France, Australie, Nigeria, Mexique
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-001',
    homeTeam: 'france', homeTeamName: 'France', homeTeamFlag: '🇫🇷',
    awayTeam: 'australie', awayTeamName: 'Australie', awayTeamFlag: '🇦🇺',
    homeScore: 4, awayScore: 1,
    date: '2026-06-12', time: '21h00',
    stadium: 'metlife-stadium', stadiumName: 'MetLife Stadium', stadiumCity: 'New York',
    group: 'A', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-002',
    homeTeam: 'nigeria', homeTeamName: 'Nigeria', homeTeamFlag: '🇳🇬',
    awayTeam: 'mexique', awayTeamName: 'Mexique', awayTeamFlag: '🇲🇽',
    homeScore: 1, awayScore: 2,
    date: '2026-06-12', time: '18h00',
    stadium: 'at&t-stadium', stadiumName: 'AT&T Stadium', stadiumCity: 'Dallas',
    group: 'A', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },
  {
    id: 'match-003',
    homeTeam: 'france', homeTeamName: 'France', homeTeamFlag: '🇫🇷',
    awayTeam: 'nigeria', awayTeamName: 'Nigeria', awayTeamFlag: '🇳🇬',
    homeScore: 2, awayScore: 0,
    date: '2026-06-17', time: '21h00',
    stadium: 'rose-bowl', stadiumName: 'Rose Bowl', stadiumCity: 'Los Angeles',
    group: 'A', round: 'Phase de groupes – Journée 2',
    status: 'finished',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-004',
    homeTeam: 'australie', homeTeamName: 'Australie', homeTeamFlag: '🇦🇺',
    awayTeam: 'mexique', awayTeamName: 'Mexique', awayTeamFlag: '🇲🇽',
    homeScore: 0, awayScore: 1,
    date: '2026-06-17', time: '18h00',
    stadium: 'hard-rock-stadium', stadiumName: 'Hard Rock Stadium', stadiumCity: 'Miami',
    group: 'A', round: 'Phase de groupes – Journée 2',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },
  {
    id: 'match-005',
    homeTeam: 'france', homeTeamName: 'France', homeTeamFlag: '🇫🇷',
    awayTeam: 'mexique', awayTeamName: 'Mexique', awayTeamFlag: '🇲🇽',
    homeScore: null, awayScore: null,
    date: '2026-06-22', time: '21h00',
    stadium: 'sofi-stadium', stadiumName: 'SoFi Stadium', stadiumCity: 'Los Angeles',
    group: 'A', round: 'Phase de groupes – Journée 3',
    status: 'upcoming',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-006',
    homeTeam: 'australie', homeTeamName: 'Australie', homeTeamFlag: '🇦🇺',
    awayTeam: 'nigeria', awayTeamName: 'Nigeria', awayTeamFlag: '🇳🇬',
    homeScore: null, awayScore: null,
    date: '2026-06-22', time: '21h00',
    stadium: 'lumen-field', stadiumName: 'Lumen Field', stadiumCity: 'Seattle',
    group: 'A', round: 'Phase de groupes – Journée 3',
    status: 'upcoming',
    tvChannels: ['beIN Sports 2'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  GROUPE B – Brésil, Suisse, Serbie, Cameroun
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-007',
    homeTeam: 'bresil', homeTeamName: 'Brésil', homeTeamFlag: '🇧🇷',
    awayTeam: 'serbie', awayTeamName: 'Serbie', awayTeamFlag: '🇷🇸',
    homeScore: 3, awayScore: 1,
    date: '2026-06-13', time: '21h00',
    stadium: 'arrowhead-stadium', stadiumName: 'Arrowhead Stadium', stadiumCity: 'Kansas City',
    group: 'B', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-008',
    homeTeam: 'suisse', homeTeamName: 'Suisse', homeTeamFlag: '🇨🇭',
    awayTeam: 'cameroun', awayTeamName: 'Cameroun', awayTeamFlag: '🇨🇲',
    homeScore: 1, awayScore: 0,
    date: '2026-06-13', time: '18h00',
    stadium: 'nrg-stadium', stadiumName: 'NRG Stadium', stadiumCity: 'Houston',
    group: 'B', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },
  {
    id: 'match-009',
    homeTeam: 'bresil', homeTeamName: 'Brésil', homeTeamFlag: '🇧🇷',
    awayTeam: 'suisse', awayTeamName: 'Suisse', awayTeamFlag: '🇨🇭',
    homeScore: 1, awayScore: 1,
    date: '2026-06-18', time: '21h00',
    stadium: 'lincoln-financial-field', stadiumName: 'Lincoln Financial Field', stadiumCity: 'Philadelphie',
    group: 'B', round: 'Phase de groupes – Journée 2',
    status: 'live',
    minute: 67,
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-010',
    homeTeam: 'cameroun', homeTeamName: 'Cameroun', homeTeamFlag: '🇨🇲',
    awayTeam: 'serbie', awayTeamName: 'Serbie', awayTeamFlag: '🇷🇸',
    homeScore: 0, awayScore: 2,
    date: '2026-06-18', time: '18h00',
    stadium: 'bank-of-america-stadium', stadiumName: 'Bank of America Stadium', stadiumCity: 'Charlotte',
    group: 'B', round: 'Phase de groupes – Journée 2',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },
  {
    id: 'match-011',
    homeTeam: 'bresil', homeTeamName: 'Brésil', homeTeamFlag: '🇧🇷',
    awayTeam: 'cameroun', awayTeamName: 'Cameroun', awayTeamFlag: '🇨🇲',
    homeScore: null, awayScore: null,
    date: '2026-06-23', time: '21h00',
    stadium: 'bmo-field', stadiumName: 'BC Place', stadiumCity: 'Vancouver',
    group: 'B', round: 'Phase de groupes – Journée 3',
    status: 'upcoming',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-012',
    homeTeam: 'suisse', homeTeamName: 'Suisse', homeTeamFlag: '🇨🇭',
    awayTeam: 'serbie', awayTeamName: 'Serbie', awayTeamFlag: '🇷🇸',
    homeScore: null, awayScore: null,
    date: '2026-06-23', time: '21h00',
    stadium: 'toronto-stadium', stadiumName: 'BMO Field', stadiumCity: 'Toronto',
    group: 'B', round: 'Phase de groupes – Journée 3',
    status: 'upcoming',
    tvChannels: ['beIN Sports 2'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  GROUPE C – Espagne, Japon, Équateur, Costa Rica
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-013',
    homeTeam: 'espagne', homeTeamName: 'Espagne', homeTeamFlag: '🇪🇸',
    awayTeam: 'equateur', awayTeamName: 'Équateur', awayTeamFlag: '🇪🇨',
    homeScore: 3, awayScore: 0,
    date: '2026-06-14', time: '21h00',
    stadium: 'estadio-azteca', stadiumName: 'Estadio Azteca', stadiumCity: 'Mexico',
    group: 'C', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-014',
    homeTeam: 'japon', homeTeamName: 'Japon', homeTeamFlag: '🇯🇵',
    awayTeam: 'costa-rica', awayTeamName: 'Costa Rica', awayTeamFlag: '🇨🇷',
    homeScore: 2, awayScore: 0,
    date: '2026-06-14', time: '18h00',
    stadium: 'estadio-akron', stadiumName: 'Estadio Akron', stadiumCity: 'Guadalajara',
    group: 'C', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },
  {
    id: 'match-015',
    homeTeam: 'espagne', homeTeamName: 'Espagne', homeTeamFlag: '🇪🇸',
    awayTeam: 'japon', awayTeamName: 'Japon', awayTeamFlag: '🇯🇵',
    homeScore: null, awayScore: null,
    date: '2026-06-19', time: '21h00',
    stadium: 'at&t-stadium', stadiumName: 'AT&T Stadium', stadiumCity: 'Dallas',
    group: 'C', round: 'Phase de groupes – Journée 2',
    status: 'upcoming',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-016',
    homeTeam: 'equateur', homeTeamName: 'Équateur', homeTeamFlag: '🇪🇨',
    awayTeam: 'costa-rica', awayTeamName: 'Costa Rica', awayTeamFlag: '🇨🇷',
    homeScore: null, awayScore: null,
    date: '2026-06-19', time: '18h00',
    stadium: 'estadio-bbva', stadiumName: 'Estadio BBVA', stadiumCity: 'Monterrey',
    group: 'C', round: 'Phase de groupes – Journée 2',
    status: 'upcoming',
    tvChannels: ['beIN Sports 2'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  GROUPE D – Angleterre, USA, Iran, Pays de Galles
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-017',
    homeTeam: 'angleterre', homeTeamName: 'Angleterre', homeTeamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayTeam: 'iran', awayTeamName: 'Iran', awayTeamFlag: '🇮🇷',
    homeScore: 2, awayScore: 0,
    date: '2026-06-13', time: '15h00',
    stadium: 'sofi-stadium', stadiumName: 'SoFi Stadium', stadiumCity: 'Los Angeles',
    group: 'D', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 1'],
  },
  {
    id: 'match-018',
    homeTeam: 'usa', homeTeamName: 'États-Unis', homeTeamFlag: '🇺🇸',
    awayTeam: 'pays-de-galles', awayTeamName: 'Pays de Galles', awayTeamFlag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    homeScore: 1, awayScore: 1,
    date: '2026-06-13', time: '02h00',
    stadium: 'lincoln-financial-field', stadiumName: 'Lincoln Financial Field', stadiumCity: 'Philadelphie',
    group: 'D', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  GROUPE E – Allemagne, Maroc, Colombie, Arabie Saoudite
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-019',
    homeTeam: 'allemagne', homeTeamName: 'Allemagne', homeTeamFlag: '🇩🇪',
    awayTeam: 'arabie-saoudite', awayTeamName: 'Arabie Saoudite', awayTeamFlag: '🇸🇦',
    homeScore: 3, awayScore: 0,
    date: '2026-06-14', time: '15h00',
    stadium: 'hard-rock-stadium', stadiumName: 'Hard Rock Stadium', stadiumCity: 'Miami',
    group: 'E', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 1'],
  },
  {
    id: 'match-020',
    homeTeam: 'maroc', homeTeamName: 'Maroc', homeTeamFlag: '🇲🇦',
    awayTeam: 'colombie', awayTeamName: 'Colombie', awayTeamFlag: '🇨🇴',
    homeScore: 1, awayScore: 0,
    date: '2026-06-14', time: '18h00',
    stadium: 'metlife-stadium', stadiumName: 'MetLife Stadium', stadiumCity: 'New York',
    group: 'E', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },
  {
    id: 'match-021',
    homeTeam: 'allemagne', homeTeamName: 'Allemagne', homeTeamFlag: '🇩🇪',
    awayTeam: 'maroc', awayTeamName: 'Maroc', awayTeamFlag: '🇲🇦',
    homeScore: null, awayScore: null,
    date: '2026-06-19', time: '21h00',
    stadium: 'bmo-field', stadiumName: 'BC Place', stadiumCity: 'Vancouver',
    group: 'E', round: 'Phase de groupes – Journée 2',
    status: 'upcoming',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  GROUPE F – Portugal, Sénégal, Pologne, Corée du Sud
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-022',
    homeTeam: 'portugal', homeTeamName: 'Portugal', homeTeamFlag: '🇵🇹',
    awayTeam: 'corée-du-sud', awayTeamName: 'Corée du Sud', awayTeamFlag: '🇰🇷',
    homeScore: 2, awayScore: 1,
    date: '2026-06-15', time: '21h00',
    stadium: 'arrowhead-stadium', stadiumName: 'Arrowhead Stadium', stadiumCity: 'Kansas City',
    group: 'F', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-023',
    homeTeam: 'senegal', homeTeamName: 'Sénégal', homeTeamFlag: '🇸🇳',
    awayTeam: 'pologne', awayTeamName: 'Pologne', awayTeamFlag: '🇵🇱',
    homeScore: 2, awayScore: 1,
    date: '2026-06-15', time: '18h00',
    stadium: 'nrg-stadium', stadiumName: 'NRG Stadium', stadiumCity: 'Houston',
    group: 'F', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  GROUPE G – Argentine, Canada, Ghana, Croatie
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-024',
    homeTeam: 'argentine', homeTeamName: 'Argentine', homeTeamFlag: '🇦🇷',
    awayTeam: 'ghana', awayTeamName: 'Ghana', awayTeamFlag: '🇬🇭',
    homeScore: 2, awayScore: 0,
    date: '2026-06-16', time: '21h00',
    stadium: 'rose-bowl', stadiumName: 'Rose Bowl', stadiumCity: 'Los Angeles',
    group: 'G', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-025',
    homeTeam: 'canada', homeTeamName: 'Canada', homeTeamFlag: '🇨🇦',
    awayTeam: 'croatie', awayTeamName: 'Croatie', awayTeamFlag: '🇭🇷',
    homeScore: 0, awayScore: 1,
    date: '2026-06-16', time: '18h00',
    stadium: 'toronto-stadium', stadiumName: 'BMO Field', stadiumCity: 'Toronto',
    group: 'G', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  GROUPE H – Pays-Bas, Uruguay, Danemark, Tunisie
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-026',
    homeTeam: 'pays-bas', homeTeamName: 'Pays-Bas', homeTeamFlag: '🇳🇱',
    awayTeam: 'tunisie', awayTeamName: 'Tunisie', awayTeamFlag: '🇹🇳',
    homeScore: 3, awayScore: 0,
    date: '2026-06-16', time: '15h00',
    stadium: 'estadio-azteca', stadiumName: 'Estadio Azteca', stadiumCity: 'Mexico',
    group: 'H', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 1'],
  },
  {
    id: 'match-027',
    homeTeam: 'uruguay', homeTeamName: 'Uruguay', homeTeamFlag: '🇺🇾',
    awayTeam: 'danemark', awayTeamName: 'Danemark', awayTeamFlag: '🇩🇰',
    homeScore: 1, awayScore: 1,
    date: '2026-06-16', time: '18h00',
    stadium: 'estadio-akron', stadiumName: 'Estadio Akron', stadiumCity: 'Guadalajara',
    group: 'H', round: 'Phase de groupes – Journée 1',
    status: 'finished',
    tvChannels: ['beIN Sports 2'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  MATCHS DU JOUR (18 JUIN) – en direct
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-028',
    homeTeam: 'belgique', homeTeamName: 'Belgique', homeTeamFlag: '🇧🇪',
    awayTeam: 'corée-du-sud', awayTeamName: 'Corée du Sud', awayTeamFlag: '🇰🇷',
    homeScore: 1, awayScore: 1,
    date: '2026-06-18', time: '15h00',
    stadium: 'sofi-stadium', stadiumName: 'SoFi Stadium', stadiumCity: 'Los Angeles',
    group: 'I', round: 'Phase de groupes – Journée 2',
    status: 'live',
    minute: 45,
    tvChannels: ['M6', 'beIN Sports 1'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  PROCHAINS MATCHS – à venir
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 'match-029',
    homeTeam: 'angleterre', homeTeamName: 'Angleterre', homeTeamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayTeam: 'usa', awayTeamName: 'États-Unis', awayTeamFlag: '🇺🇸',
    homeScore: null, awayScore: null,
    date: '2026-06-20', time: '21h00',
    stadium: 'at&t-stadium', stadiumName: 'AT&T Stadium', stadiumCity: 'Dallas',
    group: 'D', round: 'Phase de groupes – Journée 2',
    status: 'upcoming',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-030',
    homeTeam: 'argentine', homeTeamName: 'Argentine', homeTeamFlag: '🇦🇷',
    awayTeam: 'canada', awayTeamName: 'Canada', awayTeamFlag: '🇨🇦',
    homeScore: null, awayScore: null,
    date: '2026-06-20', time: '18h00',
    stadium: 'metlife-stadium', stadiumName: 'MetLife Stadium', stadiumCity: 'New York',
    group: 'G', round: 'Phase de groupes – Journée 2',
    status: 'upcoming',
    tvChannels: ['beIN Sports 2'],
  },
  {
    id: 'match-031',
    homeTeam: 'italie', homeTeamName: 'Italie', homeTeamFlag: '🇮🇹',
    awayTeam: 'turquie', awayTeamName: 'Türkiye', awayTeamFlag: '🇹🇷',
    homeScore: null, awayScore: null,
    date: '2026-06-21', time: '21h00',
    stadium: 'hard-rock-stadium', stadiumName: 'Hard Rock Stadium', stadiumCity: 'Miami',
    group: 'J', round: 'Phase de groupes – Journée 1',
    status: 'upcoming',
    tvChannels: ['TF1', 'beIN Sports 1'],
  },
  {
    id: 'match-032',
    homeTeam: 'egypte', homeTeamName: 'Égypte', homeTeamFlag: '🇪🇬',
    awayTeam: 'ukraine', awayTeamName: 'Ukraine', awayTeamFlag: '🇺🇦',
    homeScore: null, awayScore: null,
    date: '2026-06-21', time: '18h00',
    stadium: 'nrg-stadium', stadiumName: 'NRG Stadium', stadiumCity: 'Houston',
    group: 'K', round: 'Phase de groupes – Journée 1',
    status: 'upcoming',
    tvChannels: ['beIN Sports 2'],
  },
]

// Retourne les matchs d'un groupe
export function getMatchesByGroup(group: string): Match[] {
  return matches.filter(m => m.group === group)
}

// Retourne les matchs du jour
export function getTodayMatches(date: string): Match[] {
  return matches.filter(m => m.date === date)
}

// Retourne les matchs en direct
export function getLiveMatches(): Match[] {
  return matches.filter(m => m.status === 'live')
}

// Retourne les prochains matchs
export function getUpcomingMatches(limit = 5): Match[] {
  return matches.filter(m => m.status === 'upcoming').slice(0, limit)
}

// Retourne les matchs terminés récents
export function getRecentMatches(limit = 5): Match[] {
  return matches.filter(m => m.status === 'finished').reverse().slice(0, limit)
}

// Retourne les matchs d'une équipe
export function getMatchesByTeam(teamId: string): Match[] {
  return matches.filter(m => m.homeTeam === teamId || m.awayTeam === teamId)
}
