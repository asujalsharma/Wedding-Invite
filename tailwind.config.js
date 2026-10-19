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
          blue: {
            50: '#F0F6FA',
            100: '#E1EDF5',
            200: '#C4DCED',
            300: '#9ECAE4',
            400: '#73B2D9',
            500: '#5297C7',
            600: '#3D7BAA',
            700: '#31628A',
            800: '#2A5171',
            900: '#1F3C55',
          },
          ivory: {
            DEFAULT: '#FDFCF7',
            dark: '#F7F4EA',
            border: '#E8E3D5',
          },
          sage: {
            DEFAULT: '#889C86',
            light: '#B2C4B0',
            dark: '#586A56',
          },
          gold: {
            light: '#F4E9D3',
            DEFAULT: '#D4AF37',
            muted: '#C5A880',
          }
        }
      },
      fontFamily: {
        cursive: ['"Great Vibes"', '"Playfair Display"', 'cursive'],
        script: ['"Alex Brush"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'envelope': '0 20px 45px -10px rgba(50, 80, 110, 0.25), 0 10px 20px -5px rgba(50, 80, 110, 0.15)',
        'card-glow': '0 15px 35px -5px rgba(115, 178, 217, 0.3)',
      }
    },
  },
  plugins: [],
}
