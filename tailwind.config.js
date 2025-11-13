/* eslint-disable no-undef */
// tailwind.config.js (পরিবর্তিত)
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Tailwind এর 'dark:' প্রিফিক্সের জন্য ঠিক আছে
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: safelist,
  plugins: [
    require("daisyui"), // 👈 DaisyUI প্লাগইন যুক্ত করা হলো
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"], // 👈 আপনার ব্যবহৃত থিমগুলো এখানে উল্লেখ করুন
    darkTheme: "dark", // 👈 ডার্ক থিম হিসাবে 'dark' সেট করুন
  },
};
