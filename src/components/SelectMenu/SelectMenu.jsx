import React from "react";
import "./SelectMenu.css";

const SelectMenu = ({
  options = [],
  value,
  onChange,
  disabled = false,
  className = "",
  placeholder = "Выбрать...",
  label = "", // Новый пропс
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
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMenu;