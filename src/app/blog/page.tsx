import type { Metadata } from 'next'
import Link from 'next/link'
import AdBanner from '@/components/AdBanner'
import { articles, ARTICLE_CATEGORIES } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Blog Coupe du Monde 2026 – Guides, pronostics et actualités',
  description: 'Actualités, analyses et pronostics Coupe du Monde 2026 – articles SEO sur les équipes, groupes, stades et favoris de la FIFA World Cup 2026.',
  keywords: ['blog football', 'articles Coupe du Monde 2026', 'pronostics Mondial', 'guides FIFA 2026', 'France Mondial 2026'],
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const featured = articles.filter(a => a.featured)
  const rest     = articles.filter(a => !a.featured)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">📰 Articles & Guides</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Blog Mondial 2026
        </h1>
        <p className="text-white/60 max-w-2xl">
          Guides pratiques, pronostics, analyses tactiques et actualités de la Coupe du Monde 2026. Tout ce que vous devez savoir pour suivre le Mondial.
        </p>
      </div>

      <AdBanner slot="blog-top" format="horizontal" className="mb-8" />

      {/* Filtres catégories */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['Tous', ...ARTICLE_CATEGORIES].map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
              cat === 'Tous'
                ? 'bg-brand-gold text-brand-navy border-brand-gold'
                : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles à la une */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">À la une</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map(article => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <article className="card-hover p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-brand-gold text-brand-navy text-xs font-black px-3 py-1 rounded-full uppercase">
                      {article.category}
                    </span>
                    <span className="text-white/30 text-xs">À la une</span>
                  </div>
                  <h2 className="text-white font-extrabold text-xl leading-tight mb-3 flex-1">
                    {article.title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/30 mt-auto border-t border-white/10 pt-4">
                    <span>{article.author}</span>
                    <span>{article.readingTime} min • {article.updatedAt?.split('-').reverse().join('/') ?? article.publishedAt.split('-').reverse().join('/')}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Tous les articles */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Tous les articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map(article => (
            <Link key={article.id} href={`/blog/${article.slug}`}>
              <article className="card-hover p-5 h-full flex flex-col">
                <span className="bg-brand-blue/50 text-brand-gold/80 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 self-start border border-brand-gold/20">
                  {article.category}
                </span>
                <h3 className="text-white font-bold text-sm leading-tight mb-3 flex-1">
                  {article.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-4">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-white/30 mt-auto">
                  {article.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-white/5 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slot="blog-bottom" format="horizontal" className="mt-10" />

      {/* SEO – topics populaires */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-white mb-4">Sujets populaires</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Calendrier France 2026', 'Horaires Maroc', 'Classement Groupe A',
            'Comment regarder le Mondial', 'Pronostics Coupe du Monde',
            'Stades FIFA 2026', 'Équipes qualifiées', 'Mbappé 2026',
            'Argentine championne', 'Brésil Mondial', 'Format 48 équipes',
          ].map(topic => (
            <span key={topic} className="bg-white/5 border border-white/10 text-white/60 text-xs px-3 py-1.5 rounded-full hover:text-white hover:border-brand-gold/30 transition-colors cursor-pointer">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
