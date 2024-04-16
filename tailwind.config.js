const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "header-bg": "#DBF2FF",
      },
      width: {
        content: "1150px",
      },
      margin: {
        center: "margin: 0 auto",
      },
    },
    colors: {
      ...colors,
    },
    layout: {
      back: "#BDBDBD",
    },
  },
  plugins: [],
};
