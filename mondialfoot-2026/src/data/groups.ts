// ============================================================
//  CLASSEMENTS DES GROUPES – Coupe du Monde 2026
//  Mettez à jour pts/joués/wins/draws/losses/gf/ga après chaque match
// ============================================================

export interface GroupStanding {
  teamId: string
  teamName: string
  teamFlag: string
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  points: number
  qualified?: 'qualified' | 'possible' | 'eliminated'  // statut qualification
}

export interface Group {
  id: string          // 'A'–'L'
  name: string        // 'Groupe A'
  standings: GroupStanding[]
}

export const groups: Group[] = [
  {
    id: 'A',
    name: 'Groupe A',
    standings: [
      { teamId: 'france',    teamName: 'France',    teamFlag: '🇫🇷', played: 2, wins: 2, draws: 0, losses: 0, goalsFor: 6, goalsAgainst: 1, points: 6, qualified: 'qualified' },
      { teamId: 'mexique',   teamName: 'Mexique',   teamFlag: '🇲🇽', played: 2, wins: 2, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 1, points: 6, qualified: 'possible' },
      { teamId: 'nigeria',   teamName: 'Nigeria',   teamFlag: '🇳🇬', played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 1, goalsAgainst: 4, points: 0, qualified: 'eliminated' },
      { teamId: 'australie', teamName: 'Australie', teamFlag: '🇦🇺', played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 1, goalsAgainst: 5, points: 0, qualified: 'eliminated' },
    ],
  },
  {
    id: 'B',
    name: 'Groupe B',
    standings: [
      { teamId: 'bresil',   teamName: 'Brésil',   teamFlag: '🇧🇷', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 4, goalsAgainst: 2, points: 4, qualified: 'qualified' },
      { teamId: 'serbie',   teamName: 'Serbie',   teamFlag: '🇷🇸', played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 3, goalsAgainst: 4, points: 3, qualified: 'possible' },
      { teamId: 'suisse',   teamName: 'Suisse',   teamFlag: '🇨🇭', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 2, goalsAgainst: 1, points: 4, qualified: 'qualified' },
      { teamId: 'cameroun', teamName: 'Cameroun', teamFlag: '🇨🇲', played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 0, goalsAgainst: 2, points: 0, qualified: 'eliminated' },
    ],
  },
  {
    id: 'C',
    name: 'Groupe C',
    standings: [
      { teamId: 'espagne',    teamName: 'Espagne',    teamFlag: '🇪🇸', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 0, points: 3, qualified: 'possible' },
      { teamId: 'japon',      teamName: 'Japon',      teamFlag: '🇯🇵', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 2, goalsAgainst: 0, points: 3, qualified: 'possible' },
      { teamId: 'equateur',   teamName: 'Équateur',   teamFlag: '🇪🇨', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 3, points: 0, qualified: 'possible' },
      { teamId: 'costa-rica', teamName: 'Costa Rica', teamFlag: '🇨🇷', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 2, points: 0, qualified: 'possible' },
    ],
  },
  {
    id: 'D',
    name: 'Groupe D',
    standings: [
      { teamId: 'angleterre',    teamName: 'Angleterre',    teamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 2, goalsAgainst: 0, points: 3, qualified: 'possible' },
      { teamId: 'usa',           teamName: 'États-Unis',    teamFlag: '🇺🇸', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, points: 1, qualified: 'possible' },
      { teamId: 'pays-de-galles',teamName: 'Pays de Galles',teamFlag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, points: 1, qualified: 'possible' },
      { teamId: 'iran',          teamName: 'Iran',          teamFlag: '🇮🇷', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 2, points: 0, qualified: 'possible' },
    ],
  },
  {
    id: 'E',
    name: 'Groupe E',
    standings: [
      { teamId: 'allemagne',      teamName: 'Allemagne',      teamFlag: '🇩🇪', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 0, points: 3, qualified: 'possible' },
      { teamId: 'maroc',          teamName: 'Maroc',          teamFlag: '🇲🇦', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 1, goalsAgainst: 0, points: 3, qualified: 'possible' },
      { teamId: 'colombie',       teamName: 'Colombie',       teamFlag: '🇨🇴', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 1, points: 0, qualified: 'possible' },
      { teamId: 'arabie-saoudite',teamName: 'Arabie Saoudite',teamFlag: '🇸🇦', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 3, points: 0, qualified: 'possible' },
    ],
  },
  {
    id: 'F',
    name: 'Groupe F',
    standings: [
      { teamId: 'senegal',    teamName: 'Sénégal',    teamFlag: '🇸🇳', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 2, goalsAgainst: 1, points: 3, qualified: 'possible' },
      { teamId: 'portugal',   teamName: 'Portugal',   teamFlag: '🇵🇹', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 2, goalsAgainst: 1, points: 3, qualified: 'possible' },
      { teamId: 'corée-du-sud',teamName: 'Corée du Sud',teamFlag: '🇰🇷', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 1, goalsAgainst: 2, points: 0, qualified: 'possible' },
      { teamId: 'pologne',    teamName: 'Pologne',    teamFlag: '🇵🇱', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 1, goalsAgainst: 2, points: 0, qualified: 'possible' },
    ],
  },
  {
    id: 'G',
    name: 'Groupe G',
    standings: [
      { teamId: 'argentine', teamName: 'Argentine', teamFlag: '🇦🇷', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 2, goalsAgainst: 0, points: 3, qualified: 'possible' },
      { teamId: 'croatie',   teamName: 'Croatie',   teamFlag: '🇭🇷', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 1, goalsAgainst: 0, points: 3, qualified: 'possible' },
      { teamId: 'canada',    teamName: 'Canada',    teamFlag: '🇨🇦', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 1, points: 0, qualified: 'possible' },
      { teamId: 'ghana',     teamName: 'Ghana',     teamFlag: '🇬🇭', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 2, points: 0, qualified: 'possible' },
    ],
  },
  {
    id: 'H',
    name: 'Groupe H',
    standings: [
      { teamId: 'pays-bas', teamName: 'Pays-Bas', teamFlag: '🇳🇱', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 0, points: 3, qualified: 'possible' },
      { teamId: 'uruguay',  teamName: 'Uruguay',  teamFlag: '🇺🇾', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, points: 1, qualified: 'possible' },
      { teamId: 'danemark', teamName: 'Danemark', teamFlag: '🇩🇰', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, points: 1, qualified: 'possible' },
      { teamId: 'tunisie',  teamName: 'Tunisie',  teamFlag: '🇹🇳', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 3, points: 0, qualified: 'possible' },
    ],
  },
  {
    id: 'I',
    name: 'Groupe I',
    standings: [
      { teamId: 'belgique',    teamName: 'Belgique',   teamFlag: '🇧🇪', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, points: 1, qualified: 'possible' },
      { teamId: 'corée-du-sud',teamName: 'Corée du Sud',teamFlag: '🇰🇷', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, points: 1, qualified: 'possible' },
      { teamId: 'bolivie',     teamName: 'Bolivie',    teamFlag: '🇧🇴', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'nouvelle-zélande',teamName: 'Nouvelle-Zélande',teamFlag: '🇳🇿', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
    ],
  },
  {
    id: 'J',
    name: 'Groupe J',
    standings: [
      { teamId: 'italie',    teamName: 'Italie',    teamFlag: '🇮🇹', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'turquie',   teamName: 'Türkiye',   teamFlag: '🇹🇷', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'paraguay',  teamName: 'Paraguay',  teamFlag: '🇵🇾', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'afrique-du-sud',teamName: 'Afrique du Sud',teamFlag: '🇿🇦', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
    ],
  },
  {
    id: 'K',
    name: 'Groupe K',
    standings: [
      { teamId: 'ukraine',  teamName: 'Ukraine',  teamFlag: '🇺🇦', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'egypte',   teamName: 'Égypte',   teamFlag: '🇪🇬', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'hondura',  teamName: 'Honduras', teamFlag: '🇭🇳', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'slovaquie',teamName: 'Slovaquie',teamFlag: '🇸🇰', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
    ],
  },
  {
    id: 'L',
    name: 'Groupe L',
    standings: [
      { teamId: 'cote-ivoire',teamName: "Côte d'Ivoire",teamFlag: '🇨🇮', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'chili',      teamName: 'Chili',        teamFlag: '🇨🇱', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'albanie',    teamName: 'Albanie',      teamFlag: '🇦🇱', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
      { teamId: 'mexique-l',  teamName: 'Mexique',      teamFlag: '🇲🇽', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0, qualified: 'possible' },
    ],
  },
]

export function getGroupById(id: string): Group | undefined {
  return groups.find(g => g.id === id)
}

// Calcule la différence de buts
export function getGoalDiff(s: GroupStanding): number {
  return s.goalsFor - s.goalsAgainst
}
