import React from "react";
import "./Checkbox.css";

const Checkbox = ({ label, name, checked, onChange, disabled }) => {
  return (
    <div className="custom-checkbox">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="checkmark" />
      <span className="checkbox-label">{label}</span>
    </div>
  );
};

export default Checkbox;