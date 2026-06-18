import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AdBanner from '@/components/AdBanner'
import { getArticleBySlug, articles, getFeaturedArticles } from '@/data/articles'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
    },
  }
}

export default function BlogArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const related = getFeaturedArticles().filter(a => a.slug !== article.slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: 'MondialFoot 2026' },
    keywords: article.tags.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Article principal */}
          <article className="lg:col-span-3">
            {/* Fil d'Ariane */}
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/" className="hover:text-white">Accueil</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span>/</span>
              <span className="text-white line-clamp-1">{article.title}</span>
            </nav>

            {/* Catégorie + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-brand-gold/20 text-brand-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-gold/30">
                {article.category}
              </span>
              <span className="text-white/40 text-xs">{article.readingTime} min de lecture</span>
              <span className="text-white/40 text-xs">
                Mis à jour le {(article.updatedAt ?? article.publishedAt).split('-').reverse().join('/')}
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
              {article.title}
            </h1>

            {/* Description */}
            <p className="text-white/70 text-lg leading-relaxed mb-8 border-l-4 border-brand-gold/50 pl-4">
              {article.description}
            </p>

            {/* Pub article haut */}
            <AdBanner slot="article-top" format="horizontal" className="mb-8" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map(tag => (
                <span key={tag} className="bg-white/5 border border-white/10 text-white/50 text-xs px-3 py-1.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Contenu article */}
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                color: 'rgba(255,255,255,0.75)',
                lineHeight: '1.8',
                fontSize: '1rem',
              }}
            />

            {/* Pub article bas */}
            <AdBanner slot="article-bottom" format="horizontal" className="mt-10" />

            {/* Author */}
            <div className="mt-10 card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center text-xl">⚽</div>
              <div>
                <div className="font-bold text-white">{article.author}</div>
                <div className="text-white/50 text-sm">Rédaction MondialFoot 2026 – Expert football international</div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Pub sidebar */}
            <AdBanner slot="sidebar-top" format="rectangle" />

            {/* Articles liés */}
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4">Articles populaires</h3>
              <div className="space-y-4">
                {related.map(a => (
                  <Link key={a.id} href={`/blog/${a.slug}`}>
                    <div className="border-b border-white/10 pb-4 last:border-0 last:pb-0 hover:opacity-80 transition-opacity">
                      <span className="text-brand-gold text-xs font-bold uppercase">{a.category}</span>
                      <p className="text-white text-sm font-semibold leading-tight mt-1">{a.title}</p>
                      <p className="text-white/40 text-xs mt-1">{a.readingTime} min</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Liens rapides */}
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4">Explorer</h3>
              <div className="space-y-2">
                {[
                  { href: '/calendrier', label: '📅 Calendrier complet' },
                  { href: '/resultats',  label: '⚽ Résultats' },
                  { href: '/groupes',    label: '📊 Classements' },
                  { href: '/equipes',    label: '🌍 Équipes' },
                  { href: '/live',       label: '🔴 En direct' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="block py-2 px-3 rounded-lg bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Affiliation paris sportifs */}
            <div className="card p-5 border border-brand-gold/20">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Partenaire</div>
              <h4 className="font-bold text-white mb-2">Paris sportifs légaux 🎯</h4>
              <p className="text-white/50 text-xs mb-4">Pariez sur vos équipes préférées avec des opérateurs agréés ANJ.</p>
              <a href="#" className="btn-gold text-xs py-2 px-4 inline-block w-full text-center">
                Voir les offres →
              </a>
              <p className="text-white/20 text-[10px] mt-2 text-center">18+ • Jeu responsable • ANJ</p>
            </div>
          </aside>
        </div>
      </div>

      {/* Style article inline */}
    </>
  )
}
