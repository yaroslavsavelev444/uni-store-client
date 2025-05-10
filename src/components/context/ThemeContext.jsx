// context/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    
  const [darkTheme, setDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkTheme);
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  const toggleTheme = () => setDarkTheme(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для удобства
export const useTheme = () => useContext(ThemeContext);