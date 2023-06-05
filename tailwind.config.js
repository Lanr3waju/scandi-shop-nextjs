/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
  daisyui: {
    themes: ["cmyk"],
    darkTheme: "cmyk",
    lightTheme: "cmyk",
    base: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      Raleway: "Raleway, sans-serif",
      Inter: "Inter, sans-serif",
      Roboto: "Roboto, sans-serif",
      RobotoCondensed: "Roboto Condensed, sans-serif",
      SourceSans: "Source Sans Pro, sans-serif",
    },
    colors: {
      white: "white",
      black: "black",
      primary: "#5ECE7B",
      text: "#1D1F22",
      btnHover: "#3abb5c",
      btnActive: "#2e9449",
      light: "#a7fabd",
      dark: "#2f613c",
      red: "red",
      hoverBackground: "#EEEEEE",
      transparent: "transparent",
      overlay: "rgba(57, 55, 72, 0.60)",
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ".scrollbar": {
          overflowY: "auto",
          scrollbarColor: "#5ECE7B",
          scrollbarWidth: "large",
        },
        ".scrollbar::-webkit-scrollbar": {
          width: "5px",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "#5ECE7B",
          borderRadius: 30,
        },
        ".scrollbar::-webkit-scrollbar-track-piece": {
          backgroundColor: "transparent",
        },
      })
    }),
    require("daisyui"),
  ],
}
