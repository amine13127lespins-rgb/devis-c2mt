// ============================================================
//  DONNÉES DÉMO – Détails de match (stats, événements, compos, cotes)
//  Ces données s'affichent quand API_FOOTBALL_KEY n'est pas définie.
//  Clé = id du match (ex: "match-001")
// ============================================================

// ── Types internes (miroir du format Api-Football normalisé) ──

export interface MatchEvent {
  minute:     number
  extraTime?: number
  team:       'home' | 'away'
  teamName:   string
  player:     string
  assist?:    string
  type:       'goal' | 'yellowCard' | 'redCard' | 'substitution' | 'penalty' | 'ownGoal' | 'var'
  detail?:    string
}

export interface MatchStat {
  label:     string
  home:      number | string
  away:      number | string
  homeRaw?:  number   // pour la barre de progression
  awayRaw?:  number
}

export interface LineupPlayer {
  number:   number
  name:     string
  position: string
  grid?:    string  // "col:row" pour affichage tactique
}

export interface TeamLineup {
  name:        string
  flag:        string
  formation:   string
  coach:       string
  startXI:     { player: LineupPlayer }[]
  substitutes: { player: LineupPlayer }[]
}

export interface OddLine {
  label: string     // "Victoire domicile", "Nul", "Victoire extérieur"
  odd:   string     // ex: "1.85"
}

export interface OddMarket {
  name:   string    // "Résultat du match", "Plus/Moins de 2.5 buts"…
  lines:  OddLine[]
}

export interface BookmakerOdds {
  name:    string   // "Winamax", "Betclic", "PMU"
  logo:    string   // emoji ou URL
  markets: OddMarket[]
  url:     string   // lien affilié
}

export interface MatchDetail {
  events:     MatchEvent[]
  stats:      MatchStat[]
  homeLineup: TeamLineup
  awayLineup: TeamLineup
  odds:       BookmakerOdds[]
}

// ────────────────────────────────────────────────────────────
//  DONNÉES DÉMO – France 4-1 Australie (match-001)
// ────────────────────────────────────────────────────────────
const francAustralieDetail: MatchDetail = {
  events: [
    { minute: 12, team: 'home', teamName: 'France',    player: 'Kylian Mbappé',      type: 'goal',         detail: 'But normal', assist: 'Griezmann' },
    { minute: 28, team: 'away', teamName: 'Australie', player: 'Riley McGree',        type: 'yellowCard',   detail: 'Faute' },
    { minute: 35, team: 'home', teamName: 'France',    player: 'Antoine Griezmann',   type: 'goal',         detail: 'But normal', assist: 'Mbappé' },
    { minute: 51, team: 'away', teamName: 'Australie', player: 'Mat Ryan',            type: 'yellowCard',   detail: 'Perte de temps' },
    { minute: 57, team: 'away', teamName: 'Australie', player: 'Ajdin Hrustic',       type: 'goal',         detail: 'But normal', assist: 'McGree' },
    { minute: 63, team: 'home', teamName: 'France',    player: 'Marcus Thuram',       type: 'substitution', detail: 'Remplace Dembélé' },
    { minute: 71, team: 'home', teamName: 'France',    player: 'Kylian Mbappé',       type: 'goal',         detail: 'Penalty' },
    { minute: 78, team: 'home', teamName: 'France',    player: 'Ousmane Dembélé',     type: 'substitution', detail: 'Remplacé par Camavinga' },
    { minute: 85, team: 'home', teamName: 'France',    player: 'Kylian Mbappé',       type: 'goal',         detail: 'But normal', assist: 'Thuram' },
    { minute: 89, team: 'away', teamName: 'Australie', player: 'Martin Boyle',        type: 'yellowCard',   detail: 'Faute' },
  ],
  stats: [
    { label: 'Possession',        home: '63%',           away: '37%',           homeRaw: 63, awayRaw: 37 },
    { label: 'Tirs totaux',       home: 18,              away: 7 },
    { label: 'Tirs cadrés',       home: 10,              away: 3 },
    { label: 'Corners',           home: 8,               away: 2 },
    { label: 'Fautes',            home: 9,               away: 14 },
    { label: 'Cartons jaunes',    home: 0,               away: 3 },
    { label: 'Cartons rouges',    home: 0,               away: 0 },
    { label: 'Hors-jeux',         home: 3,               away: 1 },
    { label: 'Arrêts gardien',    home: 2,               away: 6 },
    { label: 'Passes réussies',   home: '543 (88%)',     away: '231 (72%)' },
  ],
  homeLineup: {
    name: 'France', flag: '🇫🇷', formation: '4-3-3', coach: 'Didier Deschamps',
    startXI: [
      { player: { number: 1,  name: 'Mike Maignan',        position: 'GB',  grid: '1:1' } },
      { player: { number: 5,  name: 'Benjamin Pavard',      position: 'DD',  grid: '2:4' } },
      { player: { number: 4,  name: 'Dayot Upamecano',      position: 'DC',  grid: '2:3' } },
      { player: { number: 17, name: 'William Saliba',       position: 'DC',  grid: '2:2' } },
      { player: { number: 22, name: 'Theo Hernandez',       position: 'DG',  grid: '2:1' } },
      { player: { number: 8,  name: 'Aurélien Tchouaméni', position: 'MDC', grid: '3:2' } },
      { player: { number: 14, name: 'Adrien Rabiot',        position: 'MG',  grid: '3:1' } },
      { player: { number: 7,  name: 'Antoine Griezmann',    position: 'MD',  grid: '3:3' } },
      { player: { number: 11, name: 'Ousmane Dembélé',      position: 'AD',  grid: '4:3' } },
      { player: { number: 10, name: 'Kylian Mbappé',        position: 'BU',  grid: '4:2' } },
      { player: { number: 9,  name: 'Marcus Thuram',        position: 'AG',  grid: '4:1' } },
    ],
    substitutes: [
      { player: { number: 16, name: 'Brice Samba',        position: 'GB' } },
      { player: { number: 23, name: 'Jules Koundé',       position: 'DD' } },
      { player: { number: 6,  name: 'Eduardo Camavinga',  position: 'MG' } },
      { player: { number: 13, name: "N'Golo Kanté",       position: 'MC' } },
      { player: { number: 18, name: 'Randal Kolo Muani',  position: 'AT' } },
    ],
  },
  awayLineup: {
    name: 'Australie', flag: '🇦🇺', formation: '4-2-3-1', coach: 'Tony Popovic',
    startXI: [
      { player: { number: 1,  name: 'Mat Ryan',              position: 'GB',  grid: '1:1' } },
      { player: { number: 5,  name: 'Nathaniel Atkinson',    position: 'DD',  grid: '2:4' } },
      { player: { number: 15, name: 'Harry Souttar',         position: 'DC',  grid: '2:3' } },
      { player: { number: 6,  name: 'Kye Rowles',            position: 'DC',  grid: '2:2' } },
      { player: { number: 3,  name: 'Aziz Behich',           position: 'DG',  grid: '2:1' } },
      { player: { number: 4,  name: 'Bailey Wright',         position: 'MDC', grid: '3:2' } },
      { player: { number: 8,  name: 'Jackson Irvine',        position: 'MDC', grid: '3:1' } },
      { player: { number: 10, name: 'Ajdin Hrustic',         position: 'MD',  grid: '4:3' } },
      { player: { number: 7,  name: 'Martin Boyle',          position: 'MG',  grid: '4:1' } },
      { player: { number: 14, name: 'Riley McGree',          position: 'MA',  grid: '4:2' } },
      { player: { number: 9,  name: 'Mathew Leckie',         position: 'AT',  grid: '5:1' } },
    ],
    substitutes: [
      { player: { number: 12, name: 'Danny Vukovic', position: 'GB' } },
      { player: { number: 11, name: 'Awer Mabil',    position: 'AD' } },
      { player: { number: 17, name: 'Garang Kuol',   position: 'AT' } },
    ],
  },
  odds: [
    {
      name: 'Winamax', logo: '🎯', url: '#',
      markets: [
        {
          name: 'Résultat du match',
          lines: [
            { label: '🇫🇷 France',      odd: '1.25' },
            { label: 'Nul',              odd: '5.80' },
            { label: '🇦🇺 Australie',   odd: '10.00' },
          ],
        },
        {
          name: 'Plus / Moins de 2.5 buts',
          lines: [
            { label: 'Plus de 2.5',  odd: '1.55' },
            { label: 'Moins de 2.5', odd: '2.35' },
          ],
        },
        {
          name: 'Les 2 équipes marquent',
          lines: [
            { label: 'Oui', odd: '2.10' },
            { label: 'Non', odd: '1.65' },
          ],
        },
        {
          name: '1er buteur',
          lines: [
            { label: 'Mbappé',     odd: '2.40' },
            { label: 'Griezmann',  odd: '5.00' },
            { label: 'Thuram',     odd: '6.50' },
          ],
        },
      ],
    },
    {
      name: 'Betclic', logo: '⚽', url: '#',
      markets: [
        {
          name: 'Résultat du match',
          lines: [
            { label: '🇫🇷 France',      odd: '1.28' },
            { label: 'Nul',              odd: '5.50' },
            { label: '🇦🇺 Australie',   odd: '9.50' },
          ],
        },
        {
          name: 'Plus / Moins de 2.5 buts',
          lines: [
            { label: 'Plus de 2.5',  odd: '1.50' },
            { label: 'Moins de 2.5', odd: '2.45' },
          ],
        },
        {
          name: 'Les 2 équipes marquent',
          lines: [
            { label: 'Oui', odd: '2.05' },
            { label: 'Non', odd: '1.70' },
          ],
        },
      ],
    },
    {
      name: 'PMU', logo: '🏇', url: '#',
      markets: [
        {
          name: 'Résultat du match',
          lines: [
            { label: '🇫🇷 France',      odd: '1.30' },
            { label: 'Nul',              odd: '5.60' },
            { label: '🇦🇺 Australie',   odd: '9.80' },
          ],
        },
        {
          name: 'Plus / Moins de 2.5 buts',
          lines: [
            { label: 'Plus de 2.5',  odd: '1.52' },
            { label: 'Moins de 2.5', odd: '2.40' },
          ],
        },
      ],
    },
  ],
}

// ────────────────────────────────────────────────────────────
//  DONNÉES DÉMO – Brésil 1-1 Suisse (match-009, en direct)
// ────────────────────────────────────────────────────────────
const bresilSuisseDetail: MatchDetail = {
  events: [
    { minute: 23, team: 'home', teamName: 'Brésil', player: 'Vinicius Jr',   type: 'goal',       detail: 'But normal', assist: 'Rodrygo' },
    { minute: 41, team: 'away', teamName: 'Suisse', player: 'Granit Xhaka',  type: 'yellowCard', detail: 'Tacle par derrière' },
    { minute: 58, team: 'away', teamName: 'Suisse', player: 'Breel Embolo',  type: 'goal',       detail: 'But normal', assist: 'Xhaka' },
    { minute: 62, team: 'home', teamName: 'Brésil', player: 'Lucas Paquetá', type: 'yellowCard', detail: 'Protestation' },
  ],
  stats: [
    { label: 'Possession',      home: '58%', away: '42%', homeRaw: 58, awayRaw: 42 },
    { label: 'Tirs totaux',     home: 11,    away: 6 },
    { label: 'Tirs cadrés',     home: 5,     away: 3 },
    { label: 'Corners',         home: 5,     away: 3 },
    { label: 'Fautes',          home: 7,     away: 11 },
    { label: 'Cartons jaunes',  home: 1,     away: 1 },
    { label: 'Hors-jeux',       home: 2,     away: 0 },
    { label: 'Arrêts gardien',  home: 2,     away: 4 },
  ],
  homeLineup: {
    name: 'Brésil', flag: '🇧🇷', formation: '4-2-3-1', coach: 'Fernando Diniz',
    startXI: [
      { player: { number: 1,  name: 'Alisson',         position: 'GB',  grid: '1:1' } },
      { player: { number: 2,  name: 'Danilo',          position: 'DD',  grid: '2:4' } },
      { player: { number: 3,  name: 'Éder Militão',   position: 'DC',  grid: '2:3' } },
      { player: { number: 4,  name: 'Marquinhos',      position: 'DC',  grid: '2:2' } },
      { player: { number: 6,  name: 'Alex Sandro',     position: 'DG',  grid: '2:1' } },
      { player: { number: 5,  name: 'Casemiro',        position: 'MDC', grid: '3:2' } },
      { player: { number: 8,  name: 'Fred',            position: 'MDC', grid: '3:1' } },
      { player: { number: 11, name: 'Raphinha',        position: 'AD',  grid: '4:3' } },
      { player: { number: 10, name: 'Lucas Paquetá',  position: 'MA',  grid: '4:2' } },
      { player: { number: 20, name: 'Vinicius Jr',     position: 'AG',  grid: '4:1' } },
      { player: { number: 9,  name: 'Rodrygo',         position: 'AT',  grid: '5:1' } },
    ],
    substitutes: [
      { player: { number: 21, name: 'Endrick',            position: 'AT' } },
      { player: { number: 13, name: 'Bremer',             position: 'DC' } },
      { player: { number: 7,  name: 'Gabriel Martinelli', position: 'AG' } },
    ],
  },
  awayLineup: {
    name: 'Suisse', flag: '🇨🇭', formation: '4-2-3-1', coach: 'Murat Yakin',
    startXI: [
      { player: { number: 1,  name: 'Yann Sommer',       position: 'GB',  grid: '1:1' } },
      { player: { number: 2,  name: 'Silvan Widmer',     position: 'DD',  grid: '2:4' } },
      { player: { number: 5,  name: 'Manuel Akanji',     position: 'DC',  grid: '2:3' } },
      { player: { number: 20, name: 'Fabian Schär',     position: 'DC',  grid: '2:2' } },
      { player: { number: 13, name: 'Ricardo Rodríguez', position: 'DG',  grid: '2:1' } },
      { player: { number: 10, name: 'Granit Xhaka',      position: 'MC',  grid: '3:2' } },
      { player: { number: 23, name: 'Remo Freuler',      position: 'MC',  grid: '3:1' } },
      { player: { number: 7,  name: 'Ruben Vargas',      position: 'MD',  grid: '4:3' } },
      { player: { number: 17, name: 'Denis Zakaria',     position: 'MC',  grid: '4:2' } },
      { player: { number: 11, name: 'Xherdan Shaqiri',  position: 'MG',  grid: '4:1' } },
      { player: { number: 9,  name: 'Breel Embolo',      position: 'AT',  grid: '5:1' } },
    ],
    substitutes: [
      { player: { number: 12, name: 'Gregor Kobel', position: 'GB' } },
      { player: { number: 18, name: 'Noah Okafor',  position: 'AT' } },
    ],
  },
  odds: [
    {
      name: 'Winamax', logo: '🎯', url: '#',
      markets: [
        {
          name: 'Résultat du match',
          lines: [
            { label: '🇧🇷 Brésil',  odd: '1.70' },
            { label: 'Nul',          odd: '3.80' },
            { label: '🇨🇭 Suisse',  odd: '4.90' },
          ],
        },
        {
          name: 'Plus / Moins de 2.5 buts',
          lines: [
            { label: 'Plus de 2.5',  odd: '1.85' },
            { label: 'Moins de 2.5', odd: '1.92' },
          ],
        },
        {
          name: 'Les 2 équipes marquent',
          lines: [
            { label: 'Oui', odd: '1.90' },
            { label: 'Non', odd: '1.85' },
          ],
        },
      ],
    },
    {
      name: 'Betclic', logo: '⚽', url: '#',
      markets: [
        {
          name: 'Résultat du match',
          lines: [
            { label: '🇧🇷 Brésil',  odd: '1.72' },
            { label: 'Nul',          odd: '3.75' },
            { label: '🇨🇭 Suisse',  odd: '4.80' },
          ],
        },
        {
          name: 'Plus / Moins de 2.5 buts',
          lines: [
            { label: 'Plus de 2.5',  odd: '1.80' },
            { label: 'Moins de 2.5', odd: '1.95' },
          ],
        },
      ],
    },
  ],
}

// Registre global
const MATCH_DETAILS: Record<string, MatchDetail> = {
  'match-001': francAustralieDetail,
  'france-vs-australie': francAustralieDetail,
  'match-009': bresilSuisseDetail,
  'bresil-vs-suisse': bresilSuisseDetail,
}

// Pour les matchs sans détails, génère des données génériques
function generateGenericDetail(homeTeam: string, awayTeam: string): MatchDetail {
  return {
    events: [],
    stats: [
      { label: 'Possession',   home: '50%', away: '50%', homeRaw: 50, awayRaw: 50 },
      { label: 'Tirs totaux',  home: 0,     away: 0 },
      { label: 'Tirs cadrés', home: 0,     away: 0 },
      { label: 'Corners',      home: 0,     away: 0 },
    ],
    homeLineup: {
      name: homeTeam, flag: '', formation: '4-3-3', coach: 'À confirmer',
      startXI: [], substitutes: [],
    },
    awayLineup: {
      name: awayTeam, flag: '', formation: '4-3-3', coach: 'À confirmer',
      startXI: [], substitutes: [],
    },
    odds: [
      {
        name: 'Winamax', logo: '🎯', url: '#',
        markets: [
          {
            name: 'Résultat du match',
            lines: [
              { label: homeTeam,  odd: '2.50' },
              { label: 'Nul',     odd: '3.10' },
              { label: awayTeam,  odd: '2.80' },
            ],
          },
          {
            name: 'Plus / Moins de 2.5 buts',
            lines: [
              { label: 'Plus de 2.5',  odd: '1.90' },
              { label: 'Moins de 2.5', odd: '1.88' },
            ],
          },
        ],
      },
    ],
  }
}

export function getMatchDetail(matchId: string, homeTeam = '', awayTeam = ''): MatchDetail {
  return MATCH_DETAILS[matchId] ?? generateGenericDetail(homeTeam, awayTeam)
}
