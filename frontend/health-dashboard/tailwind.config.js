/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", 
          "./src/**/*.{js,ts,jsx,tsx}"], // This is important!
  theme: {
    extend: {
      colors: {
        coralStart: '#f77460',
        coralEnd: '#f16194',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
  
};