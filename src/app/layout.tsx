import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  metadataBase: new URL('https://mondialfoot2026.fr'),
  title: {
    default: 'MondialFoot 2026 – Calendrier, Résultats, Groupes Coupe du Monde',
    template: '%s | MondialFoot 2026',
  },
  description: 'Site officieux de référence pour la Coupe du Monde 2026 : calendrier complet, résultats en direct, classements des groupes, équipes, stades et actualités.',
  keywords: [
    'Coupe du Monde 2026', 'FIFA World Cup 2026', 'calendrier Coupe du Monde',
    'résultats football', 'groupes Coupe du Monde', 'équipes Mondial 2026',
    'France Coupe du Monde', 'Maroc Mondial', 'matchs en direct',
  ],
  authors: [{ name: 'MondialFoot 2026' }],
  creator: 'MondialFoot 2026',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'MondialFoot 2026',
    title: 'MondialFoot 2026 – Coupe du Monde en direct',
    description: 'Calendrier, résultats, groupes, équipes et actualités de la Coupe du Monde 2026.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MondialFoot 2026',
    description: 'Suivez la Coupe du Monde 2026 en direct : résultats, classements, équipes.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Google AdSense – remplacez XXXXXXXX par votre ID éditeur */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className="min-h-screen bg-brand-navy">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
