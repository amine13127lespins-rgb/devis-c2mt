'use client'

import type { BookmakerOdds } from '@/data/matchDetails'

interface Props {
  odds:         BookmakerOdds[]
  homeTeamName: string
  awayTeamName: string
  isLive?:      boolean
}

// Formate une cote en probabilité implicite
function oddToProb(odd: string): string {
  const o = parseFloat(odd)
  if (isNaN(o) || o <= 0) return ''
  return `${Math.round((1 / o) * 100)}%`
}

// Couleur selon la hauteur de la cote
function oddColor(odd: string): string {
  const o = parseFloat(odd)
  if (isNaN(o)) return 'text-white'
  if (o < 1.5)  return 'text-green-400'   // favori
  if (o < 2.5)  return 'text-brand-gold'  // légèrement favori
  if (o < 4.0)  return 'text-orange-400'  // incertain
  return 'text-red-400'                    // outsider
}

export default function MatchOdds({ odds, homeTeamName, awayTeamName, isLive }: Props) {
  if (!odds || odds.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-white/40 text-sm">Cotes non disponibles pour ce match.</p>
      </div>
    )
  }

  // On affiche le premier bookmaker en hero, puis les autres en condensé
  const [primary, ...secondary] = odds

  return (
    <div className="space-y-5">
      {/* Badge avertissement légal */}
      <div className="flex items-start gap-2 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3">
        <span className="text-orange-400 text-sm shrink-0">⚠️</span>
        <p className="text-orange-300/80 text-xs leading-relaxed">
          <strong>Jeu responsable</strong> — Les paris sportifs s&apos;adressent aux personnes majeures (18+).
          Ces cotes sont fournies à titre indicatif. Pariez de manière responsable via des opérateurs agréés ANJ.
          <a href="https://www.anj.fr" className="ml-1 underline" target="_blank" rel="noopener noreferrer">
            anj.fr
          </a>
          {' '}• <a href="tel:0974751313" className="underline">09 74 75 13 13</a>
        </p>
      </div>

      {isLive && (
        <div className="flex items-center gap-2 text-sm text-red-400 font-bold">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Cotes en direct – fluctuent en temps réel
        </div>
      )}

      {/* Bookmaker principal */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{primary.logo}</span>
            <span className="font-bold text-white">{primary.name}</span>
          </div>
          <a
            href={primary.url}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="btn-gold text-xs py-1.5 px-4"
          >
            Parier →
          </a>
        </div>

        <div className="divide-y divide-white/5">
          {primary.markets.map(market => (
            <div key={market.name} className="p-5">
              <h4 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-4">
                {market.name}
              </h4>
              <div className={`grid gap-3 ${market.lines.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {market.lines.map(line => (
                  <a
                    key={line.label}
                    href={primary.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="group flex flex-col items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold/30 rounded-xl p-3 transition-all text-center"
                  >
                    <span className="text-white/70 text-xs font-semibold group-hover:text-white transition-colors truncate w-full text-center">
                      {line.label}
                    </span>
                    <span className={`text-2xl font-black tabular-nums ${oddColor(line.odd)}`}>
                      {line.odd}
                    </span>
                    <span className="text-white/30 text-[10px]">
                      prob. {oddToProb(line.odd)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparatif bookmakers secondaires */}
      {secondary.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h4 className="font-bold text-white text-sm">Comparatif des cotes – Résultat du match</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Bookmaker</th>
                  <th className="text-center px-4 py-3 text-white/40 text-xs uppercase tracking-wider">
                    {homeTeamName.split(' ')[0]}
                  </th>
                  <th className="text-center px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Nul</th>
                  <th className="text-center px-4 py-3 text-white/40 text-xs uppercase tracking-wider">
                    {awayTeamName.split(' ')[0]}
                  </th>
                  <th className="text-center px-4 py-3 text-white/40 text-xs uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {/* Ligne bookmaker principal */}
                {(() => {
                  const m = primary.markets.find(m => m.name === 'Résultat du match')
                  if (!m) return null
                  return (
                    <tr className="border-t border-white/5 bg-brand-gold/5">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{primary.logo}</span>
                          <span className="font-bold text-white text-sm">{primary.name}</span>
                          <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-1.5 py-0.5 rounded font-bold">Meilleur</span>
                        </div>
                      </td>
                      {m.lines.map(l => (
                        <td key={l.label} className={`text-center px-4 py-3 font-black text-lg ${oddColor(l.odd)}`}>
                          {l.odd}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        <a href={primary.url} target="_blank" rel="noopener noreferrer nofollow sponsored"
                          className="text-xs text-brand-gold hover:underline font-semibold">
                          Parier →
                        </a>
                      </td>
                    </tr>
                  )
                })()}

                {secondary.map(bm => {
                  const m = bm.markets.find(m => m.name === 'Résultat du match')
                  if (!m) return null
                  return (
                    <tr key={bm.name} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{bm.logo}</span>
                          <span className="text-white/70 text-sm font-semibold">{bm.name}</span>
                        </div>
                      </td>
                      {m.lines.map(l => (
                        <td key={l.label} className={`text-center px-4 py-3 font-bold ${oddColor(l.odd)}`}>
                          {l.odd}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        <a href={bm.url} target="_blank" rel="noopener noreferrer nofollow sponsored"
                          className="text-xs text-white/40 hover:text-brand-gold hover:underline transition-colors">
                          Parier →
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-white/20 text-[10px] text-center">
        🔗 Liens d&apos;affiliation – Les cotes peuvent varier. Vérifiez les conditions sur les sites des bookmakers.
        18+ • Jeu responsable • Opérateurs agréés ANJ uniquement.
      </p>
    </div>
  )
}
