/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily : {
        cinzel : ['var(--font-cinzel)'],
        quicksand : ['var(--font-quicksand)'],
        poppins : ['var(--font-poppins)'],
        raleway : ['var(--font-raleway)']
      }
    },
  },
  plugins: [],
}

