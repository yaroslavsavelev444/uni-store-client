import React, { useState } from "react";
import "./ProductCard.css";
import { API_URL } from "../../http/axios";
import Button from "../Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import QuantityRegulator from "../QuantityRegulator/QuantityRegulator";


const ProductCard = ({ product, isAdmin, onClickAction }) => {
  const [quantity, setQuantity] = useState(1); // <-- Сюда
  if (!product) return null;
  const imageUrl = `${API_URL}/${product.images[0]}`;

  // Обработчики для изменения количества
  const increaseQuantity = () => {
    if (quantity < product.totalQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // Логика добавления товара в корзину
    console.log(`Добавлено в корзину ${quantity} шт. товара: ${product.title}`);
  };

  return (
    <div className="product-card" onClick={onClickAction}>
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.title} className="product-image" />
      </div>

      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>

        <div className="product-pricing">
          <span className="price-individual">
            {product.priceIndividual?.toFixed(2)} ₽
          </span>
          <span className="price-legal">
            {product.priceLegalEntity?.toFixed(2)} ₽ для юр. лиц
          </span>
          {product.discountPersentage > 0 && (
            <span className="discount">
              −{product.discountPersentage}% от {product.discountFromQuantity} шт.
            </span>
          )}
        </div>

        <div className="product-meta">
          <span className="product-status">
            {product.isAvailable ? "✅ В наличии" : "❌ Нет в наличии"} — {product.status}
          </span>
          <span className="product-quantity">
            Всего: {product.totalQuantity} шт.
          </span>
        </div>

        {/* Кнопка и регулятор количества */}
        {!isAdmin && (
          <div className="product-actions">
            <QuantityRegulator
              quantity={quantity}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              max={product.totalQuantity}
            />
            <Button onClick={addToCart}>
              <FontAwesomeIcon icon={faCartShopping} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;