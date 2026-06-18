import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation – MondialFoot 2026',
  description: 'CGU du site MondialFoot 2026 – informations légales, droits d\'utilisation et responsabilités.',
  robots: { index: false },
}

export default function CGUPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
        <Link href="/" className="hover:text-white">Accueil</Link>
        <span>/</span>
        <span className="text-white">CGU</span>
      </nav>
      <h1 className="text-3xl font-black text-white mb-8">Conditions Générales d&apos;Utilisation</h1>
      <div className="prose-article space-y-6 text-white/70">
        <p className="text-white/50 text-sm">Dernière mise à jour : juin 2026</p>

        <section>
          <h2>1. Présentation du site</h2>
          <p>MondialFoot 2026 est un site d&apos;information sur la Coupe du Monde de football 2026. Il fournit des informations sur les matchs, les équipes, les groupes, les stades et les résultats à titre informatif uniquement.</p>
        </section>

        <section>
          <h2>2. Accès au site</h2>
          <p>L&apos;accès au site est gratuit et ouvert à tout utilisateur disposant d&apos;une connexion internet. Nous nous réservons le droit de modifier, suspendre ou interrompre l&apos;accès au site sans préavis.</p>
        </section>

        <section>
          <h2>3. Propriété intellectuelle</h2>
          <p>L&apos;ensemble du contenu de ce site (textes, données, structure) est protégé par le droit d&apos;auteur. Toute reproduction sans autorisation est interdite. Les drapeaux et emblèmes des équipes nationales appartiennent à leurs organisations respectives (FIFA, confédérations).</p>
        </section>

        <section>
          <h2>4. Responsabilité</h2>
          <p>Les informations présentées sont fournies à titre indicatif. MondialFoot 2026 ne garantit pas l&apos;exactitude en temps réel des scores et statistiques. Nous déclinons toute responsabilité en cas d&apos;erreur ou d&apos;omission.</p>
        </section>

        <section>
          <h2>5. Paris sportifs</h2>
          <p>Les cotes affichées sur ce site sont fournies à titre indicatif via des liens d&apos;affiliation. Le jeu est réservé aux personnes majeures (18+). Jouez de manière responsable. Ligne d&apos;aide : <strong>09 74 75 13 13</strong> (ANJ). Seuls les opérateurs agréés par l&apos;ANJ sont référencés.</p>
        </section>

        <section>
          <h2>6. Publicité</h2>
          <p>Ce site utilise Google AdSense pour afficher des publicités. Les annonces peuvent être personnalisées en fonction de votre navigation. Vous pouvez gérer vos préférences publicitaires via les paramètres de cookies.</p>
        </section>

        <section>
          <h2>7. Liens externes</h2>
          <p>Ce site contient des liens vers des sites tiers (bookmakers, diffuseurs). MondialFoot 2026 n&apos;est pas responsable du contenu de ces sites externes.</p>
        </section>

        <section>
          <h2>8. Droit applicable</h2>
          <p>Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français sont compétents.</p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>Pour toute question : <a href="mailto:contact@mondialfoot2026.fr">contact@mondialfoot2026.fr</a></p>
        </section>
      </div>
    </div>
  )
}
