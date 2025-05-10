import React, { useEffect, useState } from "react";
import "./CartItem.css";
import { API_URL } from "../../http/axios";
import { ShoppingCart, Package, AlertCircle, Trash } from "lucide-react";
import QuantityRegulator from "../QuantityRegulator/QuantityRegulator";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { productStore } from "../../main";
import { formatPrice } from "../../utils/formatMessageTime";


const CartItem = ({
  item,
  onClickAction,
  showToast,
  onQuantityChange,
  mode = "edit", 
}) => {
  const { productId, quantity, wasQuantityReduced } = item;
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const debouncedQuantity = useDebouncedValue(localQuantity, 500);

  const {
    _id,
    title,
    images,
    priceIndividual,
    totalQuantity,
    discountPersentage = 0,
    discountFromQuantity = 0,
  } = productId;

  useEffect(() => {
    if (mode === "edit" && debouncedQuantity !== quantity) {
      productStore.setCartItem(_id, debouncedQuantity, showToast);
    }
  }, [debouncedQuantity]);

  useEffect(() => {
    if (mode === "edit") {
      onQuantityChange?.(productId._id, localQuantity);
    }
  }, [localQuantity]);

  const hasDiscount = discountPersentage > 0 && discountFromQuantity > 0;
const applyDiscount = hasDiscount && localQuantity >= discountFromQuantity;

const discountedPrice = applyDiscount
  ? priceIndividual * (1 - discountPersentage / 100)
  : priceIndividual;

const totalPrice = discountedPrice * localQuantity;
const oldTotalPrice = hasDiscount && applyDiscount
  ? priceIndividual * localQuantity
  : null;
  const imageUrl = images?.[0] ? `${API_URL}/${images[0]}` : "/placeholder.png";

  const Wrapper = mode === "edit" ? "div" : "div";

  return (
    <Wrapper
      className="block-background cart-item"
      {...(mode === "edit"
        ? {
            onClick: () =>
              onClickAction?.(productId.categoryId, _id),
          }
        : {})}
    >
      <img src={imageUrl} alt={title} className="cart-item-image" />
      <div className="cart-item-info">
        <div className="cart-item-details">
          <h3 className="cart-item-title">{title || "Без названия"}</h3>

          <div className="cart-item-flex-wrap">
            {mode == 'edit' ? (
              <div className="cart-item-flex-column">
              <div className="cart-item-row">
                <ShoppingCart size={16} />
                {applyDiscount ? (
                  <>
                    <span className="old-price">{formatPrice(priceIndividual)}</span>
                    <span className="discounted-price">
                      {formatPrice(discountedPrice)}/шт
                    </span>
                  </>
                ) : (
                  <span>{formatPrice(priceIndividual)}/шт</span>
                )}
              </div>
              <div className="cart-item-row">
                <Package size={16} /> {totalQuantity} шт.
              </div>
              {wasQuantityReduced && (
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <AlertCircle size={20} color="orange" />
                  <p style={{ margin: "0" }}>Кол-во уменьшилось</p>
                </div>
              )}
            </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}
              onClick={(e) => e.stopPropagation()}
            >{localQuantity}шт. </div>
            )}
          
          </div>

          <p className="cart-item-total">
            {applyDiscount ? (
              <div style={{display: 'flex', flexDirection: 'column-reverse', alignItems: 'center'}}>
                <span className="old-price">{formatPrice(oldTotalPrice)}</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
            ) : (
              <strong>{formatPrice(totalPrice)}</strong>
            )}
          </p>

          {mode === "edit" && (
            <div
              className="left-side-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <QuantityRegulator
                quantity={localQuantity}
                onIncrease={() => {
                  if (localQuantity < totalQuantity)
                    setLocalQuantity((prev) => prev + 1);
                  else
                    showToast(
                      "Нельзя добавить больше товара, чем есть в наличии"
                    );
                }}
                onDecrease={() => {
                  if (localQuantity > 1) setLocalQuantity((prev) => prev - 1);
                  else if (localQuantity === 1) setLocalQuantity(0);
                }}
                max={totalQuantity}
                min={0}
              />
            </div>
          )}
        </div>
        {mode === "edit" && (
  <button
    className="remove-item-btn"
    onClick={(e) => {
      e.stopPropagation();
      // Сначала обновляем локальное состояние

      productStore.deleteItemFromCart(_id);
    }}
  >
    <Trash size={20} />
  </button>
)}
      </div>
    </Wrapper>
  );
};

export default CartItem;