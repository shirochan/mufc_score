import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mufc-red': '#DA291C',
        'mufc-yellow': '#FBE122',
        'mufc-black': '#000000',
      },
    },
  },
  plugins: [],
}
export default config
