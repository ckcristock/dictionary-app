/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Muy importante para que el toggle funcione
  theme: {
    extend: {},
  },
  plugins: [],
};
