import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        dreamy: {
          sky: '#dbeef7',
          skyDark: '#9cc7db',
          cloud: '#fdebf1',
          sage: '#4b6151',
          forest: '#2d3d32',
          moss: '#5c7362',
          sand: '#f8f6f0',
          paper: '#fdfbf7',
        },
        primary: {
          50: '#f4f7f5',
          100: '#e5eee7',
          200: '#cbdccf',
          300: '#a7c3ae',
          400: '#7ea488',
          500: '#5c8667',
          600: '#466c50',
          700: '#395641',
          800: '#2f4535',
          900: '#28392d',
        },
        champagne: {
          light: '#fbf8f4',
          DEFAULT: '#eee8de',
          dark: '#cfc4b6',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        script: ['var(--font-alex-brush)', 'Alex Brush', 'cursive'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'spin-slow': 'spin 12s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
