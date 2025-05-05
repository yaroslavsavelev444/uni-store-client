import React, { useState } from "react";
import "./ProductCard.css";
import { API_URL } from "../../http/axios";
import Button from "../Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import QuantityRegulator from "../QuantityRegulator/QuantityRegulator";
import StockBadge from "../StockBadge/StockBadge";
import { productStore } from "../../main";
import { useToast } from "../../providers/ToastProvider";


const ProductCard = ({ product, isAdmin, onClickAction }) => {
  const [quantity, setQuantity] = useState(1); // <-- Сюда
  const {showToast} = useToast();

  if (!product) return null;
  const imageUrl = `${API_URL}/${product.images[0]}`;

  // Обработчики для изменения количества
  const increaseQuantity = (event) => {
    event.stopPropagation(); 
    if (quantity < product.totalQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = (event) => {
    event.stopPropagation(); 
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = (event) => {
    event.stopPropagation(); 
    console.log(`Добавлено в корзину ${quantity} шт. товара: ${product.title} id: ${product._id}`);
    productStore.setCartItem(product._id, quantity, 'increase', showToast);
  };

  return (
    <div className="block-background product-card" onClick={onClickAction}>
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.title} className="product-image" />
      </div>

      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>

        <div className="product-pricing">
        <span className="price-individual">
  {product.priceIndividual.toLocaleString('ru-RU')} ₽
</span>
          {product.discountPersentage > 0 && (
            <span className="discount">
              −{product.discountPersentage}% от {product.discountFromQuantity} шт.
            </span>
          )}
        </div>

        <div className="product-meta">
          <StockBadge isAvailable={product.isAvailable} quantity={product.totalQuantity} />
        </div>

        {/* Кнопка и регулятор количества */}
        {!isAdmin && product.isAvailable && (
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