import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand greens
        accent:  '#2C6E49',
        accent2: '#52B788',
        accent3: '#95D5B2',
        // Backgrounds
        bg:      '#F7F5F0',
        surface: '#FFFFFF',
        surface2:'#F0EDE6',
        border:  '#E2DDD4',
        // Text
        text:    '#1A1814',
        text2:   '#5C5649',
        text3:   '#9A9186',
        // Accents
        warm:    '#E76F51',
        warm2:   '#F4A261',
        warm3:   '#FFDDD2',
        blue:    '#2563EB',
        blue2:   '#DBEAFE',
        purple:  '#7C3AED',
        purple2: '#EDE9FE',
        gold:    '#B45309',
        gold2:   '#FEF3C7',
      },
      fontSize: {
        'xs':   '11px',
        'sm':   '12px',
        'base': '14px',
        'md':   '16px',
        'lg':   '18px',
        'xl':   '22px',
        '2xl':  '28px',
        '3xl':  '36px',
        '4xl':  '48px',
      },
      borderRadius: {
        'sm': '8px',
        DEFAULT: '12px',
        'lg': '20px',
      },
      boxShadow: {
        DEFAULT: '0 1px 3px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06)',
        'lg':    '0 8px 32px rgba(0,0,0,.12)',
      },
      fontFamily: {
        sans:  ['var(--font-sans)', 'DM Sans', 'sans-serif'],
        serif: ['var(--font-serif)', 'DM Serif Display', 'serif'],
      },
      spacing: {
        nav: '64px',   // pt-nav, mt-nav, etc.
      },
      height: {
        nav: '64px',
      },
    },
  },
  plugins: [],
}

export default config
