// /* eslint-disable react-refresh/only-export-components */

// import React, { createContext, useContext, useState, useEffect } from "react";

// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem("theme") || "light";
//   });

//   useEffect(() => {
//     // document.documentElement.setAttribute("data-theme", theme);
//     // localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
// src/context/ThemeContext.jsx (পরিবর্তিত)
// src/context/ThemeContext.jsx (আপডেটেড কোড)
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// সিস্টেম প্রেফারেন্স চেক করার ফাংশন
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  // যদি লোকাল স্টোরেজে না থাকে, তবে সিস্টেম প্রেফারেন্স চেক করুন
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

export const ThemeProvider = ({ children }) => {
  // ১. getInitialTheme ব্যবহার করে থিম সেট করা
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // 2. থিম স্টেট পরিবর্তন হলে, DOM-এর <html> ট্যাগে তা প্রয়োগ করুন
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("data-theme", theme);

    // 3. লোকাল স্টোরেজে নতুন থিমটি সেভ করুন
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ...
