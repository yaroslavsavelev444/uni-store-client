import React, { useState } from "react";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import { Check, Pencil } from "lucide-react"; // или свои иконки
import "./Steps.css";
import { deliveryOptions, deliveryVariants } from "../../utils/options";
import CartItem from "../CartItem/CartItem";
import { formatPrice } from "../../utils/formatMessageTime";
import ReCAPTCHA from "react-google-recaptcha";
import { log } from "../../utils/logger";
import { validateOrder } from "../../utils/validateOrder";
import { showToast } from "../../providers/toastService";

const EditableField = ({
  label,
  value,
  onChange,
  canEdit = true,
  error,
  mask,
  selectMenu,
  options = [],
}) => {
  const [isEditing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || "");

  const handleSave = () => {
    onChange(tempValue);
    setEditing(false);
  };

  const handleChange = (e) => {
    setTempValue(e.target.value);
  };

  return (
    <div className="editable-wrapper">
      <div className="editable-row">
        <label>{label}:</label>
        {isEditing ? (
          <>
            {selectMenu ? (
              <select
                value={tempValue}
                onChange={handleChange}
                style={{ flex: 1 }}
              >
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                style={{ flex: 1 }}
                mask={mask}
              />
            )}
            <Check className="icon" onClick={handleSave} />
          </>
        ) : (
          <>
            <span style={{ flex: 1 }}>
              {selectMenu
                ? options.find((opt) => opt.value === value)?.label || "—"
                : value || "—"}
            </span>
            {canEdit && (
              <Pencil className="icon" onClick={() => setEditing(true)} />
            )}
          </>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default function Step4({
  cart,
  order,
  updateOrder,
  onBack,
  prices,
  handleOrder,
}) {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const handleCheckToOrder = () => {
    const newErrors = validateOrder(order);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast({
        type: "error",
        message: "Проверьте ваши данные",
      });
      console.log("Ошибки:", newErrors);
      return;
    }

    log("handleCheckToOrder", handleCheckToOrder);
    handleOrder();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "5% 0",
      }}
    >
      <div className="block-background input-wrapper">
        <h2>Проверьте ваши данные</h2>

        <h3>Получатель</h3>
        <EditableField
          label="ФИО"
          value={order.recipientData.name}
          onChange={(value) => updateOrder("recipientData.name", value)}
          error={errors.name}
        />
        <EditableField
          label="Телефон"
          value={order.recipientData.phone}
          onChange={(value) => updateOrder("recipientData.phone", value)}
          error={errors.phone}
          mask="+7 (999) 999-99-99"
        />

        <h3>Доставка</h3>
        <div className="editable-row">
          <label>Тип доставки:</label>
          <span style={{ flex: 1 }}>
            {deliveryVariants.find((v) => v.value === order.deliveryMethod)
              ?.label || "—"}
          </span>{" "}
        </div>

        {order.deliveryMethod === "delivery" && (
          <>
            <EditableField
              label="Транспортная компания"
              value={order.deliveryData.tk}
              onChange={(value) => updateOrder("deliveryData.tk", value)}
              error={errors.tk}
              selectMenu={true}
              options={deliveryOptions}
            />
            <EditableField
              label="Адрес"
              value={order.deliveryData.address}
              onChange={(value) => updateOrder("deliveryData.address", value)}
              error={errors.address}
            />
            <EditableField
              label="Комментарий"
              value={order.deliveryData.comment}
              onChange={(value) => updateOrder("deliveryData.comment", value)}
              error={errors.comment}
            />
          </>
        )}

        {order.isCompany && (
          <>
            <h3>Компания (если оформляете как юр. лицо)</h3>
            <EditableField
              label="Название компании"
              value={order.companyData.companyName}
              onChange={(value) =>
                updateOrder("companyData.companyName", value)
              }
              error={errors.companyName}
            />
            <EditableField
              label="ИНН"
              value={order.companyData.inn}
              onChange={(value) => updateOrder("companyData.inn", value)}
              error={errors.inn}
              mask="9999999999"
            />
            <EditableField
              label="КПП"
              value={order.companyData.kpp}
              onChange={(value) => updateOrder("companyData.kpp", value)}
              error={errors.kpp}
              mask="999999999"
            />
            <EditableField
              label="ОГРН"
              value={order.companyData.ogrn}
              onChange={(value) => updateOrder("companyData.ogrn", value)}
              error={errors.ogrn}
              mask="999999999999999"
            />
            <EditableField
              label="Юридический адрес"
              value={order.companyData.legalAddress}
              onChange={(value) =>
                updateOrder("companyData.legalAddress", value)
              }
              error={errors.legalAddress}
            />
            <EditableField
              label="Банк"
              value={order.companyData.bankName}
              onChange={(value) => updateOrder("companyData.bankName", value)}
              error={errors.bankName}
            />
            <EditableField
              label="Расчетный счет"
              value={order.companyData.checkingAccount}
              onChange={(value) => updateOrder("companyData.checkingAccount", value)}
              error={errors.checkingAccount}
            />
            <EditableField
              label="БИК"
              value={order.companyData.bik}
              onChange={(value) => updateOrder("companyData.bik", value)}
              error={errors.bik}
              mask="999999999"
            />
            <EditableField
              label="Корреспондентский счет"
              value={order.companyData.correspondentAccount}
              onChange={(value) =>
                updateOrder("companyData.correspondentAccount", value)
              }
              error={errors.correspondentAccount}
            />
          </>
        )}

        {cart.map((product) => (
          <CartItem key={product._id} item={product} mode="readonly" />
        ))}

        <div style={{ marginTop: 30, width: "100%", textAlign: "right" }}>
          <h3>ИТОГО:</h3>
          {prices[0] !== prices[1] ? (
            <>
              <div>
                <span style={{ fontWeight: "bold", fontSize: 18 }}>
                  Со скидкой:
                </span>
                <span style={{ fontSize: 18, color: "#28a745" }}>
                  {formatPrice(prices[0])}
                </span>
              </div>
              <div>
                <span
                  style={{ fontWeight: "bold", fontSize: 14, color: "#777" }}
                >
                  Без скидки: {formatPrice(prices[1])}
                </span>
              </div>
            </>
          ) : (
            <div>
              <span style={{ fontWeight: "bold", fontSize: 18 }}>
                {formatPrice(prices[0])}
              </span>
            </div>
          )}
        </div>

        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
          onExpired={() => setCaptchaVerified(false)}
        />

        <div className="btn-horizontal-wrapper">
          <Button onClick={onBack}>Назад</Button>
          <Button
            onClick={handleCheckToOrder}
            disabled={
              !captchaVerified && import.meta.env.VITE_PROJECT !== "dev"
            }
          >
            Заказать
          </Button>
        </div>
      </div>
    </div>
  );
}
