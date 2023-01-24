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
        "primary-light": "#EFEFF8", // light purple
        "secondary-light": "#D04F4F", // light red
        dark: "#292929", // off-black
      },
      fontFamily: {
        heading: ["__GOOD_DOG_3cfdbc"],
        body: ["__LIGURINO_71f35e"],
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        xxs: "24rem",
      },
      minWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        xxs: "24rem",
        1: "1rem",
        2: "2rem",
        3: "3rem",
        4: "4rem",
        5: "5rem",
        6: "6rem",
        7: "7rem",
        8: "8rem",
        9: "9rem",
        10: "10rem",
      },
    },
  },
  plugins: [],
};
