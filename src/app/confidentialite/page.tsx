import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité – MondialFoot 2026',
  description: 'Politique de confidentialité et gestion des cookies du site MondialFoot 2026 – conformité RGPD.',
  robots: { index: false },
}

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
        <Link href="/" className="hover:text-white">Accueil</Link>
        <span>/</span>
        <span className="text-white">Politique de confidentialité</span>
      </nav>
      <h1 className="text-3xl font-black text-white mb-8">Politique de Confidentialité</h1>
      <div className="prose-article space-y-6 text-white/70">
        <p className="text-white/50 text-sm">Dernière mise à jour : juin 2026 – Conforme au RGPD</p>

        <section>
          <h2>1. Responsable du traitement</h2>
          <p>MondialFoot 2026 est responsable du traitement de vos données personnelles. Contact : <a href="mailto:contact@mondialfoot2026.fr">contact@mondialfoot2026.fr</a></p>
        </section>

        <section>
          <h2>2. Données collectées</h2>
          <p>Nous ne collectons pas directement de données personnelles identifiables. Cependant, des tiers intégrés au site peuvent collecter des données :</p>
          <ul>
            <li><strong>Google AdSense</strong> : cookies publicitaires pour personnaliser les annonces</li>
            <li><strong>Vercel Analytics</strong> : données de performance anonymisées (pages vues, temps de chargement)</li>
          </ul>
        </section>

        <section>
          <h2>3. Cookies</h2>
          <p>Ce site utilise les types de cookies suivants :</p>
          <ul>
            <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site (aucune donnée personnelle)</li>
            <li><strong>Cookies publicitaires</strong> : Google AdSense (nécessitent votre consentement)</li>
            <li><strong>Cookies analytiques</strong> : mesure d&apos;audience anonymisée</li>
          </ul>
          <p>Vous pouvez retirer votre consentement à tout moment en cliquant sur &quot;Gérer les cookies&quot; en bas de page.</p>
        </section>

        <section>
          <h2>4. Base légale</h2>
          <p>Le traitement des données publicitaires est basé sur votre <strong>consentement</strong> (Art. 6.1.a RGPD). Vous pouvez le retirer à tout moment sans que cela affecte la légalité du traitement antérieur.</p>
        </section>

        <section>
          <h2>5. Durée de conservation</h2>
          <p>Les cookies publicitaires Google sont conservés 13 mois maximum. Les données analytiques sont conservées 26 mois.</p>
        </section>

        <section>
          <h2>6. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
            <li>Droit d&apos;opposition au traitement</li>
            <li>Droit à la portabilité</li>
          </ul>
          <p>Pour exercer ces droits : <a href="mailto:contact@mondialfoot2026.fr">contact@mondialfoot2026.fr</a></p>
          <p>Vous pouvez également déposer une plainte auprès de la <strong>CNIL</strong> : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a></p>
        </section>

        <section>
          <h2>7. Transferts hors UE</h2>
          <p>Google AdSense peut transférer des données vers les États-Unis. Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne et le cadre EU-US Data Privacy Framework.</p>
        </section>

        <section>
          <h2>8. Modifications</h2>
          <p>Nous nous réservons le droit de modifier cette politique. La date de dernière mise à jour est indiquée en haut de cette page.</p>
        </section>
      </div>
    </div>
  )
}
