/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D6A84F',
          dark: '#9C7330',
          light: '#E8C47A',
          glow: 'rgba(214,168,79,0.35)',
        },
        surface: {
          DEFAULT: '#101010',
          card: '#141414',
          hover: '#1a1a1a',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D6A84F 0%, #9C7330 100%)',
      },
    },
  },
  plugins: [],
}
