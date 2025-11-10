/* eslint-disable react-refresh/only-export-components */
// src/context/ThemeContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

// Named export
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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

// default export (যদি অন্য কোথাও দরকার হয়)
// export default ThemeProvider;
