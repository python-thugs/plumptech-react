/** @type {import('tailwindcss').Config} */
module.exports = {
  important: "div#root",
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
