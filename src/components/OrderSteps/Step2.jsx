import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/CartItem";
import Button from "../Buttons/Button";
import "./Steps.css";
import Input from "../Input/Input";
import { productStore } from "../../main";
import OfferUserCompany from "../OfferUserCompany/OfferUserCompany";

export default function Step2({
  order,
  updateOrder,
  cart,
  onNextStep,
  onBack,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedUserCompany, setSelectedUserCompany] = useState(null);
  const handleNextStep = () => {
    if (order.recipientData.name && order.recipientData.phone) {
      onNextStep();
    } else {
      setErrorMessage("Заполните все поля");
    }
  };

  const handleCompanyChange = (field, value) => {
    updateOrder(`companyData.${field}`, value);
  };

  useEffect(() => {
    productStore.fetchUserCompanies();
  }, []);

  const fillCompanyData = (company) => ({
    companyName: company.companyName || "",
    legalAddress: company.legalAddress || "",
    inn: company.inn || "",
    kpp: company.kpp || "",
    ogrn: company.ogrn || "",
    checkingAccount: company.checkingAccount || "",
    bankName: company.bankName || "",
    bik: company.bik || "",
    correspondentAccount: company.correspondentAccount || "",
    email: company.email || "",
    saveCompany: false,
  });

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
        <h2>Данные получателя</h2>

        <Input
          placeholder="ФИО получателя"
          value={order.recipientData.name || ""}
          onChange={(e) => updateOrder("recipientData.name", e.target.value)}
          style={{ width: "100%" }}
          errorMessage={errorMessage}
        />

        <Input
          placeholder="Телефон"
          value={order.recipientData.phone || ""}
          onChange={(e) => updateOrder("recipientData.phone", e.target.value)}
          style={{ width: "100%" }}
          errorMessage={errorMessage}
          mask="+7 (999) 999-99-99"
        />

        <label style={{ marginTop: "1rem" }}>
          <input
            type="checkbox"
            name="isCompany"
            checked={order.isCompany}
            onChange={(e) => updateOrder("isCompany", e.target.checked)}
          />{" "}
          Оформить как юр. лицо
        </label>

        {order.isCompany && (
          <div
            className="company-data"
            style={{
              marginTop: "1rem",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <h3>Данные компании</h3>
            <Input
              placeholder="Название компании"
              value={order.companyData.companyName || ""}
              onChange={(e) =>
                handleCompanyChange("companyName", e.target.value)
              }
              style={{ width: "100%" }}
            />
            <Input
              placeholder="Юридический адрес"
              value={order.companyData.legalAddress || ""}
              onChange={(e) =>
                handleCompanyChange("legalAddress", e.target.value)
              }
              style={{ width: "100%" }}
            />
            <Input
              placeholder="ИНН"
              value={order.companyData.inn || ""}
              onChange={(e) => handleCompanyChange("inn", e.target.value)}
              style={{ width: "100%" }}
              mask={"9999999999"}
            />
            <Input
              placeholder="КПП"
              value={order.companyData.kpp || ""}
              onChange={(e) => handleCompanyChange("kpp", e.target.value)}
              style={{ width: "100%" }}
              mask={"999999999"}
            />
            <Input
              placeholder="ОГРН"
              value={order.companyData.ogrn || ""}
              onChange={(e) => handleCompanyChange("ogrn", e.target.value)}
              style={{ width: "100%" }}
              mask={"999999999999999"}
            />
            <Input
              placeholder="Банк"
              value={order.companyData.bankName || ""}
              onChange={(e) => handleCompanyChange("bankName", e.target.value)}
              style={{ width: "100%" }}
            />
            <Input
              placeholder="БИК"
              value={order.companyData.bik || ""}
              onChange={(e) => handleCompanyChange("bik", e.target.value)}
              style={{ width: "100%" }}
              mask={"999999999"}
            />
            <Input
              placeholder="Корр. счёт"
              value={order.companyData.correspondentAccount || ""}
              onChange={(e) =>
                handleCompanyChange("correspondentAccount", e.target.value)
              }
              style={{ width: "100%" }}
            />
            {productStore.userCompanies.length > 0 && (
              <>
              <h2>Мои компании</h2>
                {productStore.userCompanies.map((company) => (
                  <OfferUserCompany
                    key={company._id}
                    company={company}
                    selected={selectedUserCompany}
                    onCancelSelection={() => {
                      setSelectedUserCompany(null);
                      updateOrder("companyData", fillCompanyData({}));
                    }}
                    onSelect={(company) => {
                      updateOrder("companyData", fillCompanyData(company));
                      setSelectedUserCompany(company._id); // для визуальной подсветки
                    }}
                  />
                ))}
              </>
            )}
            {!selectedUserCompany && (
              <label style={{ marginTop: "0.5rem" }}>
              <input
                type="checkbox"
                name="saveCompany"
                checked={order.companyData.saveCompany || false}
                onChange={(e) =>
                  handleCompanyChange("saveCompany", e.target.checked)
                }
              />{" "}
              Сохранить данные для будущих заказов
            </label>
            )}
          </div>
        )}
      </div>

      <div className="btn-horizontal-wrapper">
        <Button onClick={onBack}>Назад</Button>
        <Button onClick={handleNextStep}>Далее</Button>
      </div>
    </div>
  );
}
