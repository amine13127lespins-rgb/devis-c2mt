import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette MondialFoot 2026
        brand: {
          navy:    '#0A1628', // bleu marine très foncé
          blue:    '#1A3A6B', // bleu principal
          light:   '#2563EB', // bleu vif accent
          gold:    '#D4A017', // or principal
          'gold-light': '#F5C842', // or clair
          white:   '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A1628 0%, #1A3A6B 60%, #0A1628 100%)',
        'card-gradient': 'linear-gradient(180deg, #1A3A6B 0%, #0A1628 100%)',
        'gold-gradient': 'linear-gradient(90deg, #D4A017 0%, #F5C842 50%, #D4A017 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
