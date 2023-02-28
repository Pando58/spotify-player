/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--inter-font)"],
      },
      colors: {
        "zinc-950": "rgb(12, 12, 13)",
        "zinc-850": "rgb(32, 32, 34)",
        "zinc-750": "rgb(51, 51, 56)",
        "zinc-650": "rgb(73, 73, 81)",
        "spotify-green": "#1ED760",
        "spotify-green-cmyk": "#1AB26B",
      },
    },
  },
  plugins: [],
};
