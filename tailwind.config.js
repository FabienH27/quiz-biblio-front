/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      title: [
        "Fira Sans",
        "Open Sans",
        "Nunito Sans",
        "sans-serif",
        "Arial",
        "Segoe UI",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
      ],
      display: [
        "Karla",
        "Nunito",
        " Halant",
        "PT Serif",
        "sans-serif",
        "Arial",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
      ],
    },
    extend: {
      screens: {
        "3xl": "2500px",
      },
    },
  },
  plugins: [],
};
