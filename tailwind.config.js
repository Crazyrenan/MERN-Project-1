/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // This simplified pattern is less prone to glob parsing bugs
    "./index.html",
    "./src/**/*{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}