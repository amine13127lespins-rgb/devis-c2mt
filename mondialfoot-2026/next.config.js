/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  // Permet d'utiliser NEXT_PUBLIC_SITE_URL dans sitemap et métadonnées
  env: {
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://mondialfoot2026.vercel.app',
  },
}

module.exports = nextConfig
