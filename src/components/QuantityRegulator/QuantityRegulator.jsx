// components/QuantityRegulator.js
import React from "react";
import "./QuantityRegulator.css";
import Button from "../Buttons/Button";

const QuantityRegulator = ({ quantity, onIncrease, onDecrease, max, min }) => {
  return (
    <div className="quantity-regulator">
      <Button
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        −
      </Button>
      <span className="quantity-display">{quantity}</span>
      <Button
        onClick={onIncrease}
        disabled={quantity >= max}
        
      >
        +
      </Button>
    </div>
  );
};

export default QuantityRegulator;