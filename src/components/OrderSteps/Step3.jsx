import React from "react";
import CartItem from "../CartItem/CartItem";
import SelectMenu from "../SelectMenu/SelectMenu";
import { deliveryOptions, deliveryVariants } from "../../utils/options";
import Button from "../Buttons/Button";
import Input from "../Input/Input";

export default function Step3({
  order,
  updateOrder,
  cart,
  onNextStep,
  onBack,
}) {
  const deliveryMethod = order.deliveryMethod;

  const handleSetDeliveryMethod = (value) => {
    updateOrder("deliveryMethod", value);
    if (value === "pickup") {
      updateOrder("deliveryData", {});
    }
  };

  const handleDeliveryDataChange = (field, value) => {
    updateOrder(`deliveryData.${field}`, value);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "50%" }} className="cart-list">
        {cart.map((product) => (
          <CartItem key={product._id} item={product} mode="readonly" />
        ))}
      </div>
      <div className="block-background input-wrapper">
        <h2>Доставка</h2>
        <SelectMenu
          options={deliveryVariants}
          value={deliveryMethod || ""}
          onChange={handleSetDeliveryMethod}
          label="Выберите тип доставки"
          style={{ width: "100%" }}
        />
        {deliveryMethod === "delivery" && (
          <>
            <SelectMenu
              options={deliveryOptions}
              value={order.deliveryData.tk || ""}
              onChange={(value) => handleDeliveryDataChange("tk", value)}
              label="Транспортная компания"
              style={{ width: "100%" }}
            />
            <Input
              placeholder="Адрес доставки"
              value={order.deliveryData.address || ""}
              onChange={(e) =>
                handleDeliveryDataChange("address", e.target.value)
              }
              style={{ width: "100%" }}
            />
            <Input
              placeholder="Комментарий (необязательно)"
              value={order.deliveryData.comment || ""}
              onChange={(e) =>
                handleDeliveryDataChange("comment", e.target.value)
              }
              style={{ width: "100%" }}
            />
          </>
        )}
      </div>
      <div className="btn-horizontal-wrapper">
        <Button onClick={onBack}>Назад</Button>
        <Button onClick={onNextStep}>Далее</Button>
      </div>
    </div>
  );
}
