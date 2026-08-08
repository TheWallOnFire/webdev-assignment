/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      colors: {
        background: '#0f172a',
        primary: '#3b82f6',
        secondary: '#1e293b',
        accent: '#38bdf8',
      }
    },
  },
  plugins: [],
}
