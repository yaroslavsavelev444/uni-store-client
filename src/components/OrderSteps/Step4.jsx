import React, { useState } from "react";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import { Check, Pencil } from "lucide-react"; // или свои иконки
import "./Steps.css";
import { deliveryOptions, deliveryVariants } from "../../utils/options";
import CartItem from "../CartItem/CartItem";
import { formatPrice } from "../../utils/formatMessageTime";
import ReCAPTCHA from "react-google-recaptcha";

const EditableField = ({ label, value, onChange, canEdit = true,  }) => {
  const [isEditing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || "");

  const handleSave = () => {
    onChange(tempValue);
    setEditing(false);
  };

  return (
    <div className="editable-row">
      <label>{label}:</label>
      {isEditing ? (
        <>
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            style={{ flex: 1 }}
          />
          <Check className="icon" onClick={handleSave} />
        </>
      ) : (
        <>
          <span style={{ flex: 1 }}>{value || "—"}</span>
          {canEdit && (
            <Pencil className="icon" onClick={() => setEditing(true)} />
          )}
        </>
      )}
    </div>
  );
};

export default function Step4({ cart, order, updateOrder, onBack, prices , handleOrder }) {
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const handleCaptchaChange = (value) => {
      if (value) {
        setCaptchaVerified(true);
      } else {
        setCaptchaVerified(false);
      }
    };

    const handleCheckToOrder = () => {
        console.log('handleCheckToOrder', handleCheckToOrder);
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
        />
        <EditableField
          label="Телефон"
          value={order.recipientData.phone}
          onChange={(value) => updateOrder("recipientData.phone", value)}
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
              value={
                deliveryOptions.find((v) => v.value === order.deliveryData.tk)
                  ?.label
              }
              onChange={(value) => updateOrder("deliveryData.tk", value)}
            />
            <EditableField
              label="Адрес"
              value={order.deliveryData.address}
              onChange={(value) => updateOrder("deliveryData.address", value)}
            />
            <EditableField
              label="Комментарий"
              value={order.deliveryData.comment}
              onChange={(value) => updateOrder("deliveryData.comment", value)}
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
            />
            <EditableField
              label="Телефон компании"
              value={order.companyData.phone}
              onChange={(value) => updateOrder("companyData.phone", value)}
            />
            <EditableField
              label="ИНН"
              value={order.companyData.inn}
              onChange={(value) => updateOrder("companyData.inn", value)}
            />
            <EditableField
              label="КПП"
              value={order.companyData.kpp}
              onChange={(value) => updateOrder("companyData.kpp", value)}
            />
            <EditableField
              label="ОГРН"
              value={order.companyData.ogrn}
              onChange={(value) => updateOrder("companyData.ogrn", value)}
            />
            <EditableField
              label="Юридический адрес"
              value={order.companyData.legalAddress}
              onChange={(value) =>
                updateOrder("companyData.legalAddress", value)
              }
            />
            <EditableField
              label="Банк"
              value={order.companyData.bankName}
              onChange={(value) => updateOrder("companyData.bankName", value)}
            />
            <EditableField
              label="БИК"
              value={order.companyData.bik}
              onChange={(value) => updateOrder("companyData.bik", value)}
            />
            <EditableField
              label="Р/С"
              value={order.companyData.correspondentAccount}
              onChange={(value) =>
                updateOrder("companyData.correspondentAccount", value)
              }
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
                Итого: {formatPrice(prices[0])}
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
          <Button onClick={handleCheckToOrder} disabled={!captchaVerified && import.meta.env.VITE_PROJECT !== "dev"}>
            Заказать
          </Button>
        </div>
      </div>
    </div>
  );
}
