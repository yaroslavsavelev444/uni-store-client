import React from "react";
import "./Button.css"; 

const Button = ({ children, onClick, disabled = false , ...props }) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined} 
      disabled={disabled} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;