// Step1.js
import React from 'react';
import CartItem from "../../components/CartItem/CartItem";
import { formatPrice } from "../../utils/formatMessageTime";
import Button from '../Buttons/Button';
import Empty from '../Empty/Empty';

const Step1 = ({ cart, totalPrice, oldTotal, updateQuantity, onNextStep, handleNavigaeToItemPage }) => {
  return (
    <div className="cart-list">
      {cart.length === 0 ? (
              <Empty text="Корзина пуста" />
            ) : (
              <div className="cart-list">
                {cart.map((product) => (
                  <CartItem
                    key={product._id}
                    item={product}
                    onClickAction={handleNavigaeToItemPage}
                    onQuantityChange={updateQuantity} // <== передаём колбэк
                  />
                ))}
      
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