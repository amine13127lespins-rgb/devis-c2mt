import { MetadataRoute } from 'next'
import { teams } from '@/data/teams'
import { stadiums } from '@/data/stadiums'
import { articles } from '@/data/articles'
import { matches } from '@/data/matches'

const BASE_URL = 'https://mondialfoot2026.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,             lastModified: now, changeFrequency: 'hourly',  priority: 1.0 },
    { url: `${BASE_URL}/live`,   lastModified: now, changeFrequency: 'always',  priority: 0.9 },
    { url: `${BASE_URL}/resultats`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/calendrier`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/groupes`, lastModified: now, changeFrequency: 'hourly', priority: 0.8 },
    { url: `${BASE_URL}/equipes`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/stades`,  lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/blog`,    lastModified: now, changeFrequency: 'daily',  priority: 0.8 },
  ]

  // Pages équipes
  const teamPages: MetadataRoute.Sitemap = teams.map(team => ({
    url: `${BASE_URL}/equipes/${team.id}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  // Pages stades
  const stadiumPages: MetadataRoute.Sitemap = stadiums.map(stadium => ({
    url: `${BASE_URL}/stades/${stadium.id}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.6,
  }))

  // Pages articles
  const articlePages: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(article.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Pages matchs
  const matchPages: MetadataRoute.Sitemap = matches.map(match => ({
    url: `${BASE_URL}/match/${match.homeTeam}-vs-${match.awayTeam}`,
    lastModified: now,
    changeFrequency: match.status === 'live' ? 'always' : 'daily',
    priority: match.status === 'live' ? 0.9 : 0.6,
  }))

  return [...staticPages, ...teamPages, ...stadiumPages, ...articlePages, ...matchPages]
}
