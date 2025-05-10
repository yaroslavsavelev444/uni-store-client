// components/ThemeToggle.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={darkTheme}
        onChange={toggleTheme}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeToggle;