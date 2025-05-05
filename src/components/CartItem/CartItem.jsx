import React, { useEffect, useState } from "react";
import "./CartItem.css";
import { API_URL } from "../../http/axios";
import { ShoppingCart, Package } from "lucide-react";
import QuantityRegulator from "../QuantityRegulator/QuantityRegulator";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { productStore } from "../../main";

const CartItem = ({ item, onClickAction, showToast }) => {
  const { productId, quantity, price } = item;

  const imageUrl = productId?.images?.[0]
    ? `${API_URL}/${productId.images[0]}`
    : "/placeholder.png";

  const [localQuantity, setLocalQuantity] = useState(quantity);

  const debouncedQuantity = useDebouncedValue(localQuantity, 500);

  useEffect(() => {
    if (debouncedQuantity !== quantity) {
      productStore.setCartItem(productId._id, debouncedQuantity, showToast);
    }
  }, [debouncedQuantity, productId._id, quantity]); 

  const handleIncrease = () => {
    if (localQuantity < productId.totalQuantity) {
      setLocalQuantity((prev) => prev + 1);
    } else {
      showToast("Нельзя добавить больше товара, чем есть в наличии");
    }
  };

  const handleDecrease = () => {
    if (localQuantity > 1) {
      setLocalQuantity((prev) => prev - 1);
    } else if (localQuantity === 1) {
      setLocalQuantity(0);
    }
  };

  return (
    <div
      className="block-background cart-item"
      onClick={() => onClickAction(productId.categoryId, productId._id)}
    >
      <img src={imageUrl} alt={productId?.title} className="cart-item-image" />
      <div className="cart-item-info">
        <div className="cart-item-details">
          <h3 className="cart-item-title">
            {productId?.title || "Без названия"}
          </h3>
          <div className="cart-item-flex-wrap">
            <div className="cart-item-flex-column">
              <div className="cart-item-row">
                <ShoppingCart size={16} /> {price} ₽/шт
              </div>
              <div className="cart-item-row">
                <Package size={16} /> {productId.totalQuantity} шт.
              </div>
            </div>
          </div>
          <p className="cart-item-total">
            <strong>{price * localQuantity} ₽</strong>
          </p>
          <div className="left-side-wrapper">
            <div onClick={(e) => e.stopPropagation()}>
              <QuantityRegulator
                quantity={localQuantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                max={productId.totalQuantity}
                min={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;