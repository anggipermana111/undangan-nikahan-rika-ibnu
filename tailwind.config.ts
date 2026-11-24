import type { Config } from "tailwindcss";
import { colors } from "./src/theme/colors";

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
      colors,
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
