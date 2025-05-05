// src/utils/validators.js
import * as yup from "yup";
import validator from "validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// ======= КАСТОМНЫЕ ФУНКЦИИ =======

/**
 * Проверка телефона по libphonenumber-js
 */
export const isValidPhone = (phone, country = "RU") => {
  const parsed = parsePhoneNumberFromString(phone, country);
  return parsed?.isValid() || false;
};

/**
 * Проверка имени (только буквы, пробелы, тире)
 */
export const isValidName = (value) => {
  if (!value) return false;

  // Разрешаем буквы, цифры и символы: пробел, дефис, восклицательный знак
  const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-!@#$%^&*()_+=.,]{2,}$/;

  return regex.test(value.trim());
};


/**
 * Проверка сообщения (минимум 5 символов, максимум 1000)
 */
export const isValidMessage = (msg) =>
  typeof msg === "string" && msg.trim().length >= 5 && msg.trim().length <= 1000;

// ======= СХЕМЫ ВАЛИДАЦИИ ДЛЯ YUP =======

/**
 * Схема для контактной формы
 */
export const contactFormSchema = yup.object().shape({
  user: yup
    .string()
    .required("Имя обязательно")
    .test("is-valid-name", "Некорректное имя", isValidName),

  email: yup
    .string()
    .required("Email обязателен")
    .email("Некорректный email")
    .test(
      "is-valid-email",
      "Некорректный формат email",
      (val) => validator.isEmail(val)
    ),

    phone: yup
    .string()
    .required("Укажите номер телефона")
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Введите корректный номер"),

  msg: yup
    .string()
    .required("Сообщение обязательно")
    .test("is-valid-msg", "Сообщение должно быть от 5 до 1000 символов", isValidMessage),
});