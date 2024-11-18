/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0F1117',
          lighter: '#1A1D27',
          card: '#1E2235'
        },
        accent: {
          primary: '#FF6B6B',
          secondary: '#6B66FF'
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(107, 102, 255, 0.15)',
      }
    },
  },
  plugins: [],
}