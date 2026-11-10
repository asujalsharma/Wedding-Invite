/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wed: {
          crimson: {
            50: '#FDF4F5',
            100: '#FAE6E9',
            200: '#F4CFD6',
            300: '#E9A7B4',
            400: '#D77286',
            500: '#BF435D',
            600: '#9E243F',
            700: '#7E152D',
            800: '#5C0D1E',
            900: '#3D0612',
          },
          // Backwards compatible aliases for wed-blue
          blue: {
            50: '#FDF7E7',
            100: '#FAEFD0',
            200: '#F5DC9F',
            300: '#E9BE57',
            400: '#D4AF37',
            500: '#B8860B',
            600: '#9E243F',
            700: '#7E152D',
            800: '#5C0D1E',
            900: '#3D0612',
          },
          ivory: {
            light: '#FFFDF9',
            DEFAULT: '#FAF7F0',
            dark: '#F2EBDC',
            border: '#E8DCB8',
          },
          gold: {
            light: '#FAF2D9',
            DEFAULT: '#D4AF37',
            muted: '#C5A059',
            deep: '#B8860B',
            dark: '#8B6508',
          },
          saffron: {
            light: '#FDE68A',
            DEFAULT: '#F59E0B',
            dark: '#D97706',
          },
          emerald: {
            light: '#86EFAC',
            DEFAULT: '#2D5A3C',
            dark: '#1C3E27',
          }
        }
      },
      fontFamily: {
        royal: ['"Cinzel"', 'serif'],
        marcellus: ['"Marcellus"', 'serif'],
        devanagari: ['"Tiro Devanagari Hindi"', 'serif'],
        cursive: ['"Great Vibes"', '"Playfair Display"', 'cursive'],
        script: ['"Alex Brush"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'envelope': '0 20px 45px -10px rgba(126, 21, 45, 0.35), 0 10px 20px -5px rgba(212, 175, 55, 0.2)',
        'card-glow': '0 15px 35px -5px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
