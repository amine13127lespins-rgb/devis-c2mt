import type { Metadata } from 'next'
import Link from 'next/link'
import MatchCard from '@/components/MatchCard'
import GroupTable from '@/components/GroupTable'
import AdBanner from '@/components/AdBanner'
import { getLiveMatches, getUpcomingMatches, getRecentMatches } from '@/data/matches'
import { groups } from '@/data/groups'
import { getFeaturedArticles } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Coupe du Monde 2026 : Calendrier, Résultats, Groupes et Actualités',
  description: 'MondialFoot 2026 – Suivez la Coupe du Monde 2026 en direct : calendrier des matchs, résultats, classements des groupes A à L, équipes et dernières actualités football.',
  alternates: { canonical: '/' },
}

// Schema.org JSON-LD pour le SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Coupe du Monde de Football 2026',
  startDate: '2026-06-11',
  endDate: '2026-07-19',
  location: {
    '@type': 'Country',
    name: 'États-Unis, Canada, Mexique',
  },
  organizer: {
    '@type': 'Organization',
    name: 'FIFA',
    url: 'https://www.fifa.com',
  },
  description: 'La 23ème édition de la Coupe du Monde de football se déroule dans 3 pays hôtes avec 48 équipes.',
}

export default function HomePage() {
  const liveMatches     = getLiveMatches()
  const upcomingMatches = getUpcomingMatches(4)
  const recentMatches   = getRecentMatches(4)
  const featuredGroups  = groups.slice(0, 4)
  const featuredArticles = getFeaturedArticles()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A3A6B 55%, #0A1628 100%)' }}
      >
        {/* Grille décorative */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#D4A017 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-brand-gold font-semibold text-sm">En cours – Groupe A, B, C…</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Coupe du Monde
            <span
              className="block text-gradient-gold"
              style={{ background: 'linear-gradient(90deg,#D4A017,#F5C842,#D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              2026
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Calendrier complet, résultats en direct, classements des groupes, équipes, stades et actualités de la FIFA World Cup 2026.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/calendrier" className="btn-gold text-sm">
              📅 Voir le calendrier
            </Link>
            <Link href="/groupes" className="btn-outline text-sm">
              📊 Classements groupes
            </Link>
            <Link href="/live" className="inline-flex items-center gap-2 bg-red-600/90 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-all">
              🔴 Matchs en direct
            </Link>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto">
            {[
              { value: '48', label: 'Équipes', icon: '🌍' },
              { value: '104', label: 'Matchs', icon: '⚽' },
              { value: '16', label: 'Stades', icon: '🏟️' },
              { value: '39j', label: 'Durée', icon: '📅' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-white/40 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUB LEADERBOARD ── */}
      <div className="max-w-7xl mx-auto px-4 my-6">
        <AdBanner slot="homepage-top" format="horizontal" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">

        {/* ── MATCHS EN DIRECT ── */}
        {liveMatches.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="section-subtitle">🔴 En ce moment</div>
                <h2 className="section-title">Matchs en direct</h2>
              </div>
              <Link href="/live" className="btn-outline text-xs py-2 px-4">Voir tout</Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {liveMatches.map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          </section>
        )}

        {/* ── RÉSULTATS RÉCENTS + PROCHAINS MATCHS ── */}
        <section>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Résultats récents */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="section-subtitle">✅ Derniers résultats</div>
                  <h2 className="section-title text-xl">Résultats</h2>
                </div>
                <Link href="/resultats" className="btn-outline text-xs py-2 px-4">Tous</Link>
              </div>
              <div className="space-y-3">
                {recentMatches.map(m => <MatchCard key={m.id} match={m} compact />)}
              </div>
            </div>

            {/* Prochains matchs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="section-subtitle">📅 Programme</div>
                  <h2 className="section-title text-xl">Prochains matchs</h2>
                </div>
                <Link href="/calendrier" className="btn-outline text-xs py-2 px-4">Calendrier</Link>
              </div>
              <div className="space-y-3">
                {upcomingMatches.map(m => <MatchCard key={m.id} match={m} compact />)}
              </div>
            </div>
          </div>
        </section>

        {/* ── PUB RECTANGLE ── */}
        <div className="flex justify-center">
          <AdBanner slot="homepage-mid" format="rectangle" className="max-w-sm" />
        </div>

        {/* ── CLASSEMENTS GROUPES ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="section-subtitle">📊 Classements</div>
              <h2 className="section-title">Groupes A – D</h2>
            </div>
            <Link href="/groupes" className="btn-outline text-xs py-2 px-4">Tous les groupes</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredGroups.map(g => <GroupTable key={g.id} group={g} compact />)}
          </div>
        </section>

        {/* ── ARTICLES / BLOG ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="section-subtitle">📰 Actualités</div>
              <h2 className="section-title">Articles populaires</h2>
            </div>
            <Link href="/blog" className="btn-outline text-xs py-2 px-4">Voir tout</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.slice(0, 3).map(article => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <article className="card-hover p-5 h-full flex flex-col">
                  <span className="inline-block bg-brand-gold/20 text-brand-gold text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 self-start">
                    {article.category}
                  </span>
                  <h3 className="text-white font-bold text-sm leading-tight mb-3 flex-1">
                    {article.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-3 mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/30 mt-auto">
                    <span>{article.publishedAt.split('-').reverse().join('/')}</span>
                    <span>{article.readingTime} min de lecture</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ── NAVIGATION RAPIDE ── */}
        <section>
          <div className="section-subtitle mb-4">🧭 Explorer</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/equipes', icon: '🌍', label: 'Équipes', sub: '48 nations' },
              { href: '/stades', icon: '🏟️', label: 'Stades', sub: '16 enceintes' },
              { href: '/calendrier', icon: '📅', label: 'Calendrier', sub: '104 matchs' },
              { href: '/blog', icon: '📰', label: 'Blog & Pronostics', sub: 'Guides & analyses' },
            ].map(item => (
              <Link key={item.href} href={item.href}>
                <div className="card-hover p-5 text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="font-bold text-white text-sm">{item.label}</div>
                  <div className="text-white/40 text-xs mt-1">{item.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
