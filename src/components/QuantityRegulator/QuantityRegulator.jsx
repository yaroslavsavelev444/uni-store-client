// components/QuantityRegulator.js
import React from "react";
import "./QuantityRegulator.css";

const QuantityRegulator = ({ quantity, onIncrease, onDecrease, max }) => {
  return (
    <div className="quantity-regulator">
      <button
        className="quantity-btn"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        −
      </button>
      <span className="quantity-display">{quantity}</span>
      <button
        className="quantity-btn"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
};

export default QuantityRegulator;