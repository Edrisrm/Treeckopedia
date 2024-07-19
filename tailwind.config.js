/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

const CustomStyle = plugin(function ({addUtilities}) {
  addUtilities({
    ".rotate-y-180" : {
      transform : "rotateY(180deg)"
    },
    ".preserve-3d" : {
      transformStyle : "preserve-3d"
    },
    ".perspective-1000" : {
      perspective : "1000px"
    },
    ".backface-hidden" : {
      backfaceVisibility : "hidden",
    }
  })
}) 


module.exports = {
  
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      'node_modules/flowbite-react/lib/esm/**/*.js'
    ],
    theme: {
      extend: {},
    },
    plugins: [CustomStyle, 'flowbite/plugin'],
  }
  