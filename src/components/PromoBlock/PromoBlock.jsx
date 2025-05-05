import React from "react";
import { useNavigate } from "react-router-dom";
import "./PromoBlock.css"; // подключи стили по своему пути
import Button from "../Buttons/Button";

const PromoBlock = ({
  title,
  subtitle,
  image,
  productId,
  reversed = false,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="promo-wrapper">
      <div
        className={`block-background promo-block ${reversed ? "reversed" : ""}`}
      >
        <div className="promo-image">
          <img src={image} alt={title} />
        </div>
        <div className="promo-content">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <Button onClick={handleNavigate}>Перейти к товару</Button>
        </div>
      </div>
    </div>
  );
};

export default PromoBlock;
