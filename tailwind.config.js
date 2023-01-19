/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#666793", // purple
        secondary: "#E71019", // red
        'primary-light': "#EFEFF8", // light purple
        dark: "#292929", // off-black
      },
      fontFamily: {
        heading: ["__GOOD_DOG_3cfdbc"],
        body: ["__LIGURINO_71f35e"],
      },
    },
  },
  plugins: [],
};
