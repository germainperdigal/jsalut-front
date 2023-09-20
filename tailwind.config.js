const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'green': '#509866',
      'dark-green': '#2c5b3b',
      'white': '#fff',
      'gold': '#D8B866',
      'secondary': '#6B5827',
      black: colors.black,
      white: colors.white,
      red: colors.red,
      blue: colors.blue,
      orange: colors.orange,
      purple: colors.purple,
      gray: colors.gray,
      yellow: colors.green,
    },
    extend: {},
  },
  plugins: [],
}

