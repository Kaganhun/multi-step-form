/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#022959',
          dark: '#012045',
        },
        accent: '#483EFF',
        sky: '#BEE2FD',
        neutral: {
          100: '#F8FAFC',
          200: '#EEF2F7',
          400: '#94A3B8',
          600: '#475569',
        },
      },
      fontFamily: {
        sans: ['Ubuntu', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 20px rgba(2, 41, 89, 0.06)',
      },
    },
  },
  plugins: [],
}

