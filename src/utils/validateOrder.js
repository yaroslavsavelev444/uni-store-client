export function validateOrder(order) {
  const errors = {};

  // === Получатель ===
  const phone = order.recipientData.phone?.trim();
  const name = order.recipientData.name?.trim();

  if (!name) {
    errors.name = "Укажите имя получателя";
  } else if (name.length < 3) {
    errors.name = "Имя должно содержать минимум 3 символа";
  }

  if (!phone) {
    errors.phone = "Укажите номер телефона";
  } else if (phone.replace(/\D/g, "").length < 11) {
    errors.phone = "Неправильный номер телефона";
  }

  // === Способ доставки ===
  if (!order.deliveryMethod) {
    errors.deliveryMethod = "Выберите способ доставки";
  }

  // === Если выбрана доставка, проверяем ТК и адрес ===
  if (order.deliveryMethod === "delivery") {
    const tk = order.deliveryData.tk?.trim();
    const address = order.deliveryData.address?.trim();

    if (!tk) {
      errors.tk = "Выберите транспортную компанию";
    }

    if (!address) {
      errors.address = "Укажите адрес доставки";
    } else if (address.length < 5) {
      errors.address = "Адрес слишком короткий";
    }
  }

  // === Данные компании ===
  if (order.isCompany) {
    const cd = order.companyData;

    if (!cd.companyName?.trim()) {
      errors.companyName = "Укажите название компании";
    }

    if (!cd.legalAddress?.trim()) {
      errors.legalAddress = "Укажите юридический адрес";
    } else if (cd.legalAddress.trim().length < 5) {
      errors.legalAddress = "Юридический адрес слишком короткий";
    }

    if (!cd.inn?.trim()) {
      errors.inn = "Укажите ИНН";
    } else if (!/^\d{10}$/.test(cd.inn.trim())) {
      errors.inn = "ИНН должен состоять из 10 цифр";
    }

    if (!cd.kpp?.trim()) {
      errors.kpp = "Укажите КПП";
    } else if (!/^\d{9}$/.test(cd.kpp.trim())) {
      errors.kpp = "КПП должен состоять из 9 цифр";
    }

    if (!cd.ogrn?.trim()) {
      errors.ogrn = "Укажите ОГРН";
    } else {
      const ogrnDigits = cd.ogrn.replace(/\D/g, "");
      if (![13, 15].includes(ogrnDigits.length)) {
        errors.ogrn = "ОГРН должен содержать 13 или 15 цифр";
      }
    }

    if (!cd.checkingAccount?.trim()) {
      errors.checkingAccount = "Укажите расчетный счет";
    } 

    if (!cd.bankName?.trim()) {
      errors.bankName = "Укажите название банка";
    }

    if (!cd.bik?.trim()) {
      errors.bik = "Укажите БИК";
    } else if (!/^\d{9}$/.test(cd.bik.trim())) {
      errors.bik = "БИК должен содержать 9 цифр";
    }

    if (!cd.correspondentAccount?.trim()) {
      errors.correspondentAccount = "Укажите корреспондентский счет";
    } 
  }

  return errors;
}