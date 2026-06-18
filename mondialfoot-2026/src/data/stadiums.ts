// ============================================================
//  DONNÉES DES STADES – Coupe du Monde 2026
//  USA, Canada, Mexique
//  Modifiez ici pour mettre à jour les informations d'un stade
// ============================================================

export interface Stadium {
  id: string
  name: string
  city: string
  country: string
  countryFlag: string
  capacity: number
  surface: string
  opened: number
  description: string
  matchesCount: number   // nombre de matchs hébergés
  image?: string
  coordinates: { lat: number; lng: number }
}

export const stadiums: Stadium[] = [
  // ──── ÉTATS-UNIS ────
  {
    id: 'metlife-stadium',
    name: 'MetLife Stadium',
    city: 'New York / New Jersey',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 82_500,
    surface: 'Gazon naturel',
    opened: 2010,
    description: 'Le plus grand stade du tournoi, MetLife Stadium accueille la finale de la Coupe du Monde 2026 le 19 juillet. Situé à East Rutherford, New Jersey, il est le domicile des Giants et des Jets de la NFL.',
    matchesCount: 8,
    coordinates: { lat: 40.8135, lng: -74.0745 },
  },
  {
    id: 'rose-bowl',
    name: 'Rose Bowl Stadium',
    city: 'Los Angeles',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 90_888,
    surface: 'Gazon naturel',
    opened: 1922,
    description: 'Stade historique qui avait déjà accueilli la finale de la Coupe du Monde 1994. Le Rose Bowl est l\'un des stades les plus mythiques du monde.',
    matchesCount: 7,
    coordinates: { lat: 34.1613, lng: -118.1676 },
  },
  {
    id: 'at&t-stadium',
    name: 'AT&T Stadium',
    city: 'Dallas',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 80_000,
    surface: 'Gazon artificiel',
    opened: 2009,
    description: 'Surnommé "Jerry World", l\'AT&T Stadium est réputé pour son écran géant suspendu et son atmosphère électrisante. Domicile des Cowboys de Dallas.',
    matchesCount: 6,
    coordinates: { lat: 32.7473, lng: -97.0945 },
  },
  {
    id: 'sofi-stadium',
    name: 'SoFi Stadium',
    city: 'Los Angeles',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 70_240,
    surface: 'Gazon artificiel',
    opened: 2020,
    description: 'Inauguré en 2020, le SoFi Stadium est l\'un des stades les plus modernes du monde avec une toiture translucide impressionnante. Domicile des Rams et des Chargers.',
    matchesCount: 6,
    coordinates: { lat: 33.9535, lng: -118.3392 },
  },
  {
    id: 'lumen-field',
    name: 'Lumen Field',
    city: 'Seattle',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 69_000,
    surface: 'Gazon artificiel',
    opened: 2002,
    description: 'Connu pour son atmosphère bruyante grâce à son toit, Lumen Field est le domicile des Seahawks de Seattle. La ville de Seattle est proche de Vancouver, Canada.',
    matchesCount: 5,
    coordinates: { lat: 47.5952, lng: -122.3316 },
  },
  {
    id: 'arrowhead-stadium',
    name: 'Arrowhead Stadium',
    city: 'Kansas City',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 76_416,
    surface: 'Gazon naturel',
    opened: 1972,
    description: 'Domicile des Chiefs de Kansas City, Arrowhead Stadium est réputé pour être l\'un des stades les plus bruyants du monde et pour son ambiance incomparable.',
    matchesCount: 6,
    coordinates: { lat: 39.0489, lng: -94.4839 },
  },
  {
    id: 'nrg-stadium',
    name: 'NRG Stadium',
    city: 'Houston',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 72_220,
    surface: 'Gazon naturel amovible',
    opened: 2002,
    description: 'Stade à toit rétractable, NRG Stadium accueille régulièrement le Super Bowl et offre un confort optimal par la chaleur de l\'été texan.',
    matchesCount: 5,
    coordinates: { lat: 29.6847, lng: -95.4107 },
  },
  {
    id: 'lincoln-financial-field',
    name: 'Lincoln Financial Field',
    city: 'Philadelphie',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 67_594,
    surface: 'Gazon artificiel',
    opened: 2003,
    description: 'Domicile des Eagles de Philadelphie, le Lincoln Financial Field est un stade moderne dans une ville à l\'histoire sportive riche.',
    matchesCount: 5,
    coordinates: { lat: 39.9008, lng: -75.1675 },
  },
  {
    id: 'bank-of-america-stadium',
    name: 'Bank of America Stadium',
    city: 'Charlotte',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 74_867,
    surface: 'Gazon naturel',
    opened: 1996,
    description: 'Domicile des Panthers de Charlotte, ce stade a une longue tradition d\'accueil de grands événements sportifs dans la ville de Charlotte.',
    matchesCount: 5,
    coordinates: { lat: 35.2258, lng: -80.8528 },
  },
  {
    id: 'hard-rock-stadium',
    name: 'Hard Rock Stadium',
    city: 'Miami',
    country: 'États-Unis',
    countryFlag: '🇺🇸',
    capacity: 65_326,
    surface: 'Gazon naturel',
    opened: 1987,
    description: 'Domicile des Dolphins de Miami, ce stade en Floride accueille une ambiance tropicale unique. Miami est l\'une des villes les plus cosmopolites des États-Unis.',
    matchesCount: 6,
    coordinates: { lat: 25.9580, lng: -80.2389 },
  },

  // ──── CANADA ────
  {
    id: 'bmo-field',
    name: 'BC Place',
    city: 'Vancouver',
    country: 'Canada',
    countryFlag: '🇨🇦',
    capacity: 54_500,
    surface: 'Gazon artificiel',
    opened: 1983,
    description: 'BC Place à Vancouver est le plus grand stade couvert du Canada. Son toit gonflable est une prouesse architecturale. Vancouver est une ville multiculturelle au pied des Rocheuses.',
    matchesCount: 6,
    coordinates: { lat: 49.2767, lng: -123.1117 },
  },
  {
    id: 'toronto-stadium',
    name: 'BMO Field',
    city: 'Toronto',
    country: 'Canada',
    countryFlag: '🇨🇦',
    capacity: 30_991,
    surface: 'Gazon naturel',
    opened: 2007,
    description: 'Domicile du Toronto FC et de l\'équipe du Canada, le BMO Field a subi des agrandissements pour la Coupe du Monde 2026. Toronto est la plus grande ville canadienne.',
    matchesCount: 5,
    coordinates: { lat: 43.6333, lng: -79.4179 },
  },

  // ──── MEXIQUE ────
  {
    id: 'estadio-azteca',
    name: 'Estadio Azteca',
    city: 'Mexico',
    country: 'Mexique',
    countryFlag: '🇲🇽',
    capacity: 87_523,
    surface: 'Gazon naturel',
    opened: 1966,
    description: 'Le légendaire Estadio Azteca à Mexico est le seul stade au monde à avoir accueilli deux finales de Coupe du Monde (1970 et 1986). Il accueille le match d\'ouverture de 2026.',
    matchesCount: 8,
    coordinates: { lat: 19.3029, lng: -99.1505 },
  },
  {
    id: 'estadio-akron',
    name: 'Estadio Akron',
    city: 'Guadalajara',
    country: 'Mexique',
    countryFlag: '🇲🇽',
    capacity: 49_850,
    surface: 'Gazon naturel',
    opened: 2010,
    description: 'Domicile du Deportivo Guadalajara (Chivas), l\'Estadio Akron est l\'un des plus modernes du Mexique avec son design inspiré des volcans mexicains.',
    matchesCount: 5,
    coordinates: { lat: 20.6864, lng: -103.4667 },
  },
  {
    id: 'estadio-bbva',
    name: 'Estadio BBVA',
    city: 'Monterrey',
    country: 'Mexique',
    countryFlag: '🇲🇽',
    capacity: 51_348,
    surface: 'Gazon naturel',
    opened: 2015,
    description: 'L\'Estadio BBVA est considéré comme l\'un des plus beaux stades d\'Amérique latine. Le contexte montagneux de Monterrey crée un panorama exceptionnel.',
    matchesCount: 5,
    coordinates: { lat: 25.6692, lng: -100.3142 },
  },
]

export function getStadiumById(id: string): Stadium | undefined {
  return stadiums.find(s => s.id === id)
}
