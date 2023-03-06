/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        primary: "#666793", // purple
        "primary-light": "#EFEFF8", // light purple
        secondary: "#E71019", // red
        "secondary-light": "#D04F4F", // light red
        "med-dark": "#585858", // medium dark
        dark: "#292929", // off-black
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
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
      gridTemplateColumns: {
        "3and4": "25% 75%",
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
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
      },
      minHeight: {
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
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-primary",
    "bg-secondary-light",
    "bg-dark",
    "grid-cols-3",
    "grid-cols-1",
  ],
};
