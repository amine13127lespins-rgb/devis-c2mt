'use client'

// Composant client – se rafraîchit automatiquement toutes les 30 secondes
// Appelle /api/live (qui appelle Api-Football si clé disponible, sinon données statiques)

import { useEffect, useState, useCallback } from 'react'
import LiveMatchCard, { type LiveFixture } from './LiveMatchCard'
import Link from 'next/link'

interface LiveData {
  source:    'api' | 'static'
  live:      LiveFixture[]
  today:     LiveFixture[]
  updatedAt: string
  error?:    string
  warning?:  string
}

const REFRESH_INTERVAL = 30_000 // 30 secondes

export default function LiveDashboard() {
  const [data,      setData]      = useState<LiveData | null>(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState<string | null>(null)
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL / 1000)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/live', { cache: 'no-store' })
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`)
      const json: LiveData = await res.json()
      setData(json)
      setError(null)
      setLastRefresh(new Date())
      setCountdown(REFRESH_INTERVAL / 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }, [])

  // Premier chargement
  useEffect(() => { fetchData() }, [fetchData])

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(fetchData, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchData])

  // Countdown visuel
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => c <= 1 ? REFRESH_INTERVAL / 1000 : c - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const liveMatches    = data?.live ?? []
  const todayFinished  = data?.today.filter(f => f.status === 'finished') ?? []
  const todayUpcoming  = data?.today.filter(f => f.status === 'upcoming')  ?? []

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map(i => (
          <div key={i} className="card p-8 animate-pulse">
            <div className="flex items-center justify-center gap-8">
              <div className="w-12 h-12 rounded-full bg-white/10" />
              <div className="w-20 h-10 rounded-xl bg-white/10" />
              <div className="w-12 h-12 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Barre de statut */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
        <div className="flex items-center gap-3">
          {data?.source === 'api' ? (
            <>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold">Connecté à Api-Football</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="text-yellow-400 text-xs font-bold">Mode données statiques</span>
            </>
          )}
          {lastRefresh && (
            <span className="text-white/30 text-xs hidden sm:inline">
              Mis à jour {lastRefresh.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-xs">Rafraîchissement dans {countdown}s</span>
          <button
            onClick={fetchData}
            className="text-xs text-brand-gold border border-brand-gold/30 hover:bg-brand-gold/10 px-3 py-1.5 rounded-full transition-all font-semibold"
          >
            ↻ Actualiser
          </button>
        </div>
      </div>

      {/* Avertissement mode statique */}
      {data?.warning && (
        <div className="card p-4 border-yellow-500/30 bg-yellow-500/5 flex items-start gap-3">
          <span className="text-xl shrink-0">⚠️</span>
          <div>
            <p className="text-yellow-400 font-bold text-sm">Mode démo – données fictives</p>
            <p className="text-white/50 text-xs mt-1">{data.warning}</p>
            <p className="text-white/40 text-xs mt-1">
              Ajoutez <code className="text-yellow-300 bg-white/5 px-1 rounded">API_FOOTBALL_KEY=votre_clé</code> dans{' '}
              <code className="text-yellow-300 bg-white/5 px-1 rounded">.env.local</code> puis relancez le serveur.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="card p-4 border-red-500/30 bg-red-500/5">
          <p className="text-red-400 font-bold text-sm">Erreur de connexion</p>
          <p className="text-white/50 text-xs mt-1">{error}</p>
        </div>
      )}

      {/* ── MATCHS EN DIRECT ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <h2 className="text-2xl font-extrabold text-white">
            {liveMatches.length > 0
              ? `${liveMatches.length} match${liveMatches.length > 1 ? 's' : ''} en cours`
              : 'Aucun match en direct'}
          </h2>
        </div>

        {liveMatches.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {liveMatches.map(f => (
              <LiveMatchCard key={f.id} fixture={f} highlight />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center">
            <div className="text-5xl mb-4">⏸️</div>
            <p className="text-white/50 font-semibold">Aucun match en ce moment</p>
            <p className="text-white/30 text-sm mt-2">Les prochains matchs s&apos;afficheront ici automatiquement.</p>
          </div>
        )}
      </section>

      {/* ── RÉSULTATS DU JOUR ── */}
      {todayFinished.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">✅ Résultats du jour</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {todayFinished.map(f => <LiveMatchCard key={f.id} fixture={f} />)}
          </div>
        </section>
      )}

      {/* ── PROCHAINS DU JOUR ── */}
      {todayUpcoming.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">🕐 À venir aujourd&apos;hui</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {todayUpcoming.map(f => <LiveMatchCard key={f.id} fixture={f} />)}
          </div>
        </section>
      )}

      {/* ── LIENS RAPIDES ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: '/calendrier', label: '📅 Calendrier', sub: 'Tous les matchs' },
          { href: '/resultats',  label: '⚽ Résultats',  sub: 'Scores complets' },
          { href: '/groupes',    label: '📊 Groupes',    sub: 'Classements A–L' },
          { href: '/equipes',    label: '🌍 Équipes',    sub: '48 nations' },
        ].map(l => (
          <Link key={l.href} href={l.href}>
            <div className="card p-4 text-center hover:bg-brand-blue/50 transition-all">
              <div className="font-bold text-white text-sm">{l.label}</div>
              <div className="text-white/40 text-xs mt-1">{l.sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
