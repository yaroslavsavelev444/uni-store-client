// SelectMenu.js
import React from "react";
import "./SelectMenu.css";

const arrowIcons = {
  asc: "▲",
  desc: "▼",
};

const SelectMenu = ({
  options = [],
  value = "",
  onChange,
  disabled = false,
  className = "",
  placeholder = "Выбрать...",
  label = "",
  showIcons = false,
}) => {
  return (
    <div className="select-wrapper">
      {label && <label className="select-label">{label}</label>}
      <select
        className={`select-menu ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {showIcons && opt.direction
              ? `${opt.label} ${arrowIcons[opt.direction] || ""}`
              : opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMenu;