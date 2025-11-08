/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99cfff',
          400: '#3399ff',
          500: '#1a8cff',
          600: '#0088ff',
          700: '#0077e6',
          800: '#0066cc',
        }
      }
    },
  },
  plugins: [],
}