import React, { useState } from "react";
import "./ProductCard.css";
import { API_URL } from "../../http/axios";
import Button from "../Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faLock } from "@fortawesome/free-solid-svg-icons";
import QuantityRegulator from "../QuantityRegulator/QuantityRegulator";
import StockBadge from "../StockBadge/StockBadge";
import { productStore } from "../../main";
import { useAuthAction } from "../../hooks/useAuthAction";
import { log } from "../../utils/logger";
import ProductPrice from "../ProductPrice/ProductPrice";

const ProductCard = ({ product, isAdmin, onClickAction, isAuth }) => {
  const [quantity, setQuantity] = useState(1); // <-- Сюда
  const authGuard = useAuthAction();
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
    event.stopPropagation(); // Останавливаем распространение события на родительский элемент
    authGuard(() => {
      log(
        `Добавлено в корзину ${quantity} шт. товара: ${product.title} id: ${product._id}`
      );
      productStore.setCartItem(product._id, quantity, "increase");
    });
  };

  return (
    <div className="block-background product-card" onClick={onClickAction}>
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.title} className="product-image" />
      </div>

      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>

        <ProductPrice
          price={product?.priceIndividual}
          discountPercentage={product?.discountPersentage}
          discountFromQuantity={product?.discountFromQuantity}
        />

        <div className="product-meta">
          <StockBadge
            isAvailable={product.isAvailable}
            quantity={product.totalQuantity}
          />
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
              {isAuth ? (
                <FontAwesomeIcon icon={faCartShopping} />
              ) : (
                <FontAwesomeIcon icon={faLock} color="red" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
