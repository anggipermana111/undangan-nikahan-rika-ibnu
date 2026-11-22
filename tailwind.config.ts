import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        forest: { 700: '#2E4F47', 900: '#1F3A34' },
        cream: { 50: '#F5EFE4', 100: '#EDE4D3' },
        gold: { 500: '#B89B5E' },
        ink: '#1C2A26',
        sage: { 500: '#6B7F73' },
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        script: ['var(--font-pinyon)', 'cursive'],
        sans: ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
