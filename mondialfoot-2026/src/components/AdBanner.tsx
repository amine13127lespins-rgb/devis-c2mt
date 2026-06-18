// Composant espace publicitaire
// Remplacez le contenu par votre code Google AdSense ou votre affiliation

interface AdBannerProps {
  slot?: string
  format?: 'horizontal' | 'square' | 'vertical' | 'rectangle'
  className?: string
  label?: string
}

const formatSizes: Record<string, string> = {
  horizontal:  'h-24 md:h-28',  // 728x90 leaderboard
  square:      'h-64 w-64',     // 250x250
  vertical:    'h-[600px] w-40',// 160x600 skyscraper
  rectangle:   'h-64',          // 300x250 medium rectangle
}

export default function AdBanner({
  slot = 'default',
  format = 'horizontal',
  className = '',
  label = 'Publicité',
}: AdBannerProps) {
  return (
    <div
      className={`ad-banner w-full ${formatSizes[format]} ${className}`}
      data-ad-slot={slot}
      aria-label="Espace publicitaire"
    >
      {/* ─── REMPLACEZ CE BLOC PAR VOTRE CODE ADSENSE ───
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-1 pointer-events-none select-none">
        <span className="text-white/20 text-[10px] uppercase tracking-widest">{label}</span>
        <span className="text-white/10 text-xs">
          {format === 'horizontal' ? '728×90' : format === 'rectangle' ? '300×250' : format === 'square' ? '250×250' : '160×600'}
        </span>
      </div>
    </div>
  )
}
