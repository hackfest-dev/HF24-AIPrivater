/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",

    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        priC:"#0067FF",
        YelC:"#FEB60D",
        purC:"#9771FF",
        iris:"#01B5C5",
        head:"#181A1E",
        textC:"#4E545F",

      },
      boxShadow:{
        panaelS: "rgba(17,12,46,0.15) 0px 48px 100px 0px"
      }
    },
  },
  plugins: [],
}

