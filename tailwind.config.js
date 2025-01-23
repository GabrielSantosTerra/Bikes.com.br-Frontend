/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js", // Adiciona Flowbite-React
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")], // Adiciona o plugin Flowbite
};
