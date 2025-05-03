// components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import "./ThemeToggle.css"; // стили отдельно

const ThemeToggle = () => {
  const [darkTheme, setDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkTheme);
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={darkTheme}
        onChange={() => setDarkTheme(!darkTheme)}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeToggle;