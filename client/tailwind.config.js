/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ["'Nunito'", 'system-ui', 'ui-sans-serif'],
      }
    },
  },
  plugins: [],
}
