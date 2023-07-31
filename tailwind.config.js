/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        site: "url('./image/moroccan-flower.png')",
      },
    },
  },
  plugins: [],
}

