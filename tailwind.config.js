/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#AD40AF",
      offWhite: "#faf9f6",
      lightGrey: "#d9d9d9",
      grey: "#a6a6a6",
      darkGrey: "#545454",
      white: "#fff",
      black: "#0e1111",
    },
  },
  plugins: [],
};
