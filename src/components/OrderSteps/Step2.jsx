import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/CartItem";
import Button from "../Buttons/Button";
import "./Steps.css";
import Input from "../Input/Input";
import { productStore } from "../../main";
import OfferUserCompany from "../OfferUserCompany/OfferUserCompany";
import { log } from "../../utils/logger";

export default function Step2({
  order,
  updateOrder,
  cart,
  onNextStep,
  onBack,
}) {
  const [errors, setErrors] = useState({});
  const [selectedUserCompany, setSelectedUserCompany] = useState(null);
 const handleNextStep = () => {
  
  const newErrors = {};


  const phone = order.recipientData.phone?.trim();
  
  if (!phone) {
    newErrors.phone = "Укажите номер телефона";
  } else if (phone.length < 18) {
    newErrors.phone = "Неправильный номер телефона";
  }

  if (!order.recipientData.name?.trim()) {
    newErrors.name = "Укажите имя получателя";
  }

  if (order.isCompany) {
    const cd = order.companyData;

    if (!cd.companyName?.trim()) newErrors.companyName = "Укажите название компании";
    if (!cd.legalAddress?.trim()) newErrors.legalAddress = "Укажите юридический адрес";

    if (!cd.inn?.trim()) {
      newErrors.inn = "Укажите ИНН";
    } else if (cd.inn.replace(/\D/g, "").length !== 10) {
      newErrors.inn = "Неправильный ИНН";
    }

    if (!cd.kpp?.trim()) {
      newErrors.kpp = "Укажите КПП";
    } else if (cd.kpp.replace(/\D/g, "").length !== 9) {
      newErrors.kpp = "Неправильный КПП";
    }

    if (!cd.ogrn?.trim()) {
      newErrors.ogrn = "Укажите ОГРН";
    } else if (![13, 15].includes(cd.ogrn.replace(/\D/g, "").length)) {
      newErrors.ogrn = "Неправильный ОГРН";
    }

    if (!cd.checkingAccount?.trim()) {
      newErrors.checkingAccount = "Укажите расчетный счет";
    }

    if (!cd.bankName?.trim()) {
      newErrors.bankName = "Укажите название банка";
    }

    if (!cd.bik?.trim()) {
      newErrors.bik = "Укажите БИК";
    } else if (cd.bik.replace(/\D/g, "").length !== 9) {
      newErrors.bik = "Неправильный БИК";
    }

    if (!cd.correspondentAccount?.trim()) {
      newErrors.correspondentAccount = "Укажите корреспондентский счет";
    }
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    onNextStep();
  }
};

  const handleCompanyChange = (field, value) => {
    updateOrder(`companyData.${field}`, value);
  };

  useEffect(() => {
  if (productStore.userCompanies.length === 0) {
    productStore.fetchUserCompanies();
  }
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
          errorMessage={errors.name}
          label={order.recipientData.name ? "ФИО получателя" : ""}
        />

        <Input
          placeholder="Телефон"
          value={order.recipientData.phone || ""}
          onChange={(e) => updateOrder("recipientData.phone", e.target.value)}
          
          style={{ width: "100%" }}
          errorMessage={errors.phone}
          mask="+7 (999) 999-99-99"
          label={order.recipientData.phone ? "Телефон" : ""}
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
            
            <h3>Данные компании</h3>
            <Input
              placeholder="Название компании"
              value={order.companyData.companyName || ""}
              onChange={(e) =>
                handleCompanyChange("companyName", e.target.value)
              }
              style={{ width: "100%" }}
              errorMessage={errors.companyName}
              label={order.companyData.companyName ? "Название компании" : ""}
            />
            <Input
              placeholder="Юридический адрес"
              value={order.companyData.legalAddress || ""}
              onChange={(e) =>
                handleCompanyChange("legalAddress", e.target.value)
              }
              style={{ width: "100%" }}
              errorMessage={errors.legalAddress}
              label={
                order.companyData.legalAddress ? "Юридический адрес" : ""
              }
            />
            <Input
              placeholder="ИНН"
              value={order.companyData.inn || ""}
              onChange={(e) => handleCompanyChange("inn", e.target.value)}
              style={{ width: "100%" }}
              mask={"9999999999"}
              errorMessage={errors.inn}
              label={order.companyData.inn ? "ИНН" : ""}
            />
            <Input
              placeholder="КПП"
              value={order.companyData.kpp || ""}
              onChange={(e) => handleCompanyChange("kpp", e.target.value)}
              style={{ width: "100%" }}
              mask={"999999999"}
              errorMessage={errors.kpp}
              label={order.companyData.kpp ? "КПП" : ""}
            />
            <Input
              placeholder="ОГРН"
              value={order.companyData.ogrn || ""}
              onChange={(e) => handleCompanyChange("ogrn", e.target.value)}
              style={{ width: "100%" }}
              mask={"999999999999999"}
              errorMessage={errors.ogrn}
              label={order.companyData.ogrn ? "ОГРН" : ""}
            />
            <Input
            placeholder={"Расчетный счет"}
            value={order.companyData.checkingAccount || ""}
            onChange={(e) => handleCompanyChange("checkingAccount", e.target.value)}
            style={{ width: "100%" }}
            errorMessage={errors.checkingAccount}
            label={order.companyData.checkingAccount ? "Расчетный счет" : ""}
            />
            <Input
              placeholder="Банк"
              value={order.companyData.bankName || ""}
              onChange={(e) => handleCompanyChange("bankName", e.target.value)}
              style={{ width: "100%" }}
              errorMessage={errors.bankName}
              label={order.companyData.bankName ? "Банк" : ""}
            />
            <Input
              placeholder="БИК"
              value={order.companyData.bik || ""}
              onChange={(e) => handleCompanyChange("bik", e.target.value)}
              style={{ width: "100%" }}
              mask={"999999999"}
              errorMessage={errors.bik}
              label={order.companyData.bik ? "БИК" : ""}
            />
            <Input
              placeholder="Корр. счёт"
              value={order.companyData.correspondentAccount || ""}
              onChange={(e) =>
                handleCompanyChange("correspondentAccount", e.target.value)
              }
              style={{ width: "100%" }}
              errorMessage={errors.correspondentAccount}
              label={
                order.companyData.correspondentAccount
                  ? "Корр. счёт"
                  : ""
              }
            />
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
