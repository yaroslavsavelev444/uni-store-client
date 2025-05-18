// Step1.js
import React from "react";
import CartItem from "../../components/CartItem/CartItem";
import { formatPrice } from "../../utils/formatMessageTime";
import Button from "../Buttons/Button";
import Empty from "../Empty/Empty";
import { Trash, X } from "lucide-react";
import "./Steps.css";

const Step1 = ({
  cart,
  totalPrice,
  oldTotal,
  updateQuantity,
  onNextStep,
  handleNavigaeToItemPage,
  handleClearCart,
}) => {
  return (
    <div>
      {cart.length === 0 ? (
        <Empty text="Корзина пуста" />
      ) : (
        <div className="cart-list">
          <div className="cart-summary">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleClearCart}
            >
              <X color="red" size={20} />
              <p style={{ fontSize: "12px" }}>Удалить все</p>
            </div>
          </div>

          <div className="scroll-container">
            {cart.map((product) => (
              <CartItem
                key={product._id}
                item={product}
                onClickAction={handleNavigaeToItemPage}
                onQuantityChange={updateQuantity} // <== передаём колбэк
              />
            ))}
          </div>

          <div className="cart-summary">
            <div className="total-label">
              {totalPrice !== oldTotal ? (
                <>
                  <span className="old-price">{formatPrice(oldTotal)}</span>
                  <strong>{formatPrice(totalPrice)}</strong>
                </>
              ) : (
                <strong>{formatPrice(totalPrice)}</strong>
              )}
            </div>
            <Button onClick={onNextStep}>Далее</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1;
