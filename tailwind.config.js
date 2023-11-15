const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        success: colors.green[500],
        error: colors.red[500],
      },
    },
  },
  plugins: [],
};
