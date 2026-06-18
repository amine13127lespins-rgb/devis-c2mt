import Link from 'next/link'

export default function Footer() {
  const currentYear = 2026

  return (
    <footer className="bg-black/40 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                style={{ background: 'linear-gradient(135deg, #D4A017, #F5C842)' }}>
                ⚽
              </div>
              <div>
                <div className="text-white font-extrabold leading-none">MondialFoot</div>
                <div className="text-brand-gold text-[10px] font-semibold tracking-widest uppercase">2026</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Votre référence pour la Coupe du Monde 2026 : calendrier, résultats, groupes, équipes et actualités en temps réel.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                ['/', 'Accueil'],
                ['/calendrier', 'Calendrier'],
                ['/resultats', 'Résultats'],
                ['/groupes', 'Groupes'],
                ['/equipes', 'Équipes'],
                ['/stades', 'Stades'],
                ['/live', 'En Direct'],
                ['/blog', 'Blog'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/50 hover:text-brand-gold text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Articles populaires */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Articles populaires</h3>
            <ul className="space-y-2">
              {[
                ['/blog/calendrier-france-coupe-du-monde-2026', 'Calendrier France 2026'],
                ['/blog/heure-match-maroc-coupe-du-monde-2026', 'Horaires Maroc'],
                ['/blog/classement-groupe-france-coupe-du-monde-2026', 'Classement Groupe A'],
                ['/blog/comment-regarder-coupe-du-monde-2026-france', 'Regarder en France'],
                ['/blog/pronostic-france-vs-mexique-coupe-du-monde-2026', 'Pronostic France-Mexique'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/50 hover:text-brand-gold text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partenaires / Monétisation */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Partenaires</h3>
            {/* Espace affiliation maillots / streaming légal */}
            <div className="space-y-3">
              <a href="#" className="block p-3 rounded-xl bg-brand-blue/30 border border-white/10 hover:border-brand-gold/30 transition-all group">
                <div className="text-xs font-bold text-white/70 group-hover:text-white">👕 Maillots officiels</div>
                <div className="text-xs text-white/40">Boutique FIFA officielle</div>
              </a>
              <a href="#" className="block p-3 rounded-xl bg-brand-blue/30 border border-white/10 hover:border-brand-gold/30 transition-all group">
                <div className="text-xs font-bold text-white/70 group-hover:text-white">📺 Streaming légal</div>
                <div className="text-xs text-white/40">beIN Sports, TF1+, Canal+</div>
              </a>
              <a href="#" className="block p-3 rounded-xl bg-brand-blue/30 border border-white/10 hover:border-brand-gold/30 transition-all group">
                <div className="text-xs font-bold text-white/70 group-hover:text-white">🎫 Billets officiels</div>
                <div className="text-xs text-white/40">FIFA Ticketing</div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm text-center md:text-left">
            © {currentYear} MondialFoot 2026 – Tous droits réservés. Site non officiel, indépendant de la FIFA.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="text-white/30 hover:text-white/60 text-xs transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="text-white/30 hover:text-white/60 text-xs transition-colors">Confidentialité</Link>
            <Link href="/contact" className="text-white/30 hover:text-white/60 text-xs transition-colors">Contact</Link>
          </div>
        </div>

        {/* Jeu responsable */}
        <p className="text-white/20 text-xs text-center mt-4">
          ⚠️ Jouer comporte des risques : endettement, dépendance. Appelez le 09 74 75 13 13 (appel non surtaxé). Les paris sportifs sont destinés aux personnes majeures.
        </p>
      </div>
    </footer>
  )
}
