import React, { useRef } from "react";
import "./Button.css"; // Оставляем ripple и кастомные стили здесь

const Button = ({ children, onClick, disabled = false, ...props }) => {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    if (disabled) return;

    const button = buttonRef.current;

    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 500);

    onClick?.(e);
  };

  return (
    <button
      className={`btn ripple-container ${props.className || ""}`}
      onClick={handleClick}
      disabled={disabled}
      ref={buttonRef}
    >
      <p style={{margin: 0}}>{children}</p>
    </button>
  );
};

export default Button;