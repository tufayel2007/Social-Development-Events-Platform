/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: safelist,
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"],
    darkTheme: "dark",
  },
};
