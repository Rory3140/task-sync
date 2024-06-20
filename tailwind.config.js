/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/navigation/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: "#AD40AF",
      secondary: "#E6E6FA",
      offWhite: "#f0f0f0",
      lightGrey: "#e1e0e2",
      grey: "#a6a6a6",
      darkGrey: "#545454",
      white: "#fff",
      black: "#0e1111",
    },
  },
  plugins: [],
};
