import React, { useRef, useState } from 'react';
import { X } from "lucide-react";
import "../FloatingMessageButton/FloatingMessageButton.css";
import Input from '../Input/Input';
import Button from '../Buttons/Button';
import { showToast } from '../../providers/toastService';

export default function Form({ onClose }) {
  const formRef = useRef();

  const [errorMessagePhone, setErrorMessagePhone] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Упрощённая валидация:
  const validateEmail = (email) =>
    email.includes("@") && email.includes(".");
  const validatePhone = (phone) =>
    phone.replace(/\D/g, "").length === 11;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!name || !email || !phone) {
      showToast({ text1: "Заполните все поля!", type: "warning" });
      console.log("Заполните все поля!" , name, email, phone);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessageEmail("Некорректный email");
      valid = false;
    } else {
      setErrorMessageEmail("");
    }

    if (!validatePhone(phone)) {
      setErrorMessagePhone("Введите корректный номер телефона");
      valid = false;
    } else {
      setErrorMessagePhone("");
    }

    if (!valid) return;

    setIsLoading(true);

    try {
      // await sendEmail(formRef.current, 'form');
      showToast({ text1: "Сообщение отправлено", type: "success" });
      onClose();
    } catch (error) {
      showToast({ text1: "Ошибка при отправке", text2: error, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="floating-form">
      <X size={20} color="#fff" onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }} />
      <div className="form-header">
        <h2>Отправить заявку</h2>
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <Input name="name" placeholder="Имя" onChange={(e, value) => setName(value)} mask={false} />
        </div>
        <div className="form-group">
          <Input
            name="email"
            placeholder="Email"
            onChange={(e, value) => setEmail(value)}
            mask={false}
            errorMessage={errorMessageEmail}
          />
        </div>
        <div className="form-group">
          <Input
            name="phone"
            placeholder="Телефон"
            onChange={(e, value) => setPhone(value)}
            errorMessage={errorMessagePhone}
            mask="+7 (999) 999-99-99"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Отправка..." : "Отправить"}
        </Button>
      </form>
    </div>
  );
}