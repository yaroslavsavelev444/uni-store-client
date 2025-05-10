import React, { useState, useEffect, useContext } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import { useToast } from "../../providers/ToastProvider";
import { Context } from "../../main";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import validatePassword from "../../utils/validatePassword";
import "./Register.css";
import { error, log } from "../../utils/logger";

const Register = ({ onRegisterSuccess }) => {
  const { store } = useContext(Context);
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const debouncedEmail = useDebouncedValue(email, 800);

   // 1. Извлечение данных из localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("registerFormData"));
    const currentTime = new Date().getTime();
    if (savedData && savedData.timestamp + 5 * 60 * 1000 < currentTime) {
      localStorage.removeItem("registerFormData");
      return;
    }

    log("Saved Data:", savedData); // Для отладки

    if (savedData) {
      setEmail(savedData.email);
      setPhone(savedData.phone);
      setName(savedData.name);
      setSurname(savedData.surname);
    }
  }, []); // Только при первом рендере

  // 2. Сохранение данных в localStorage
  useEffect(() => {
    // Проверка: сохраняем данные только если они изменились
    if (email ||   phone || name || surname) {
      const formData = {
        email,
        phone,
        name,
        surname,
        timestamp: new Date().getTime(),
      };
      log("Saving Data:", formData); // Для отладки
      localStorage.setItem("registerFormData", JSON.stringify(formData));
    }
  }, [email, phone, name, surname]); // Сохраняем только при изменении значений


  useEffect(() => {
    const validateEmail = async () => {
      if (!debouncedEmail || !/\S+@\S+\.\S+/.test(debouncedEmail)) {
        setEmailExists(null);
        return;
      }
      const exists = await store.checkEmailExists(debouncedEmail);
      setEmailExists(exists);
    };
    validateEmail();
  }, [debouncedEmail, store]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedRepeat = passwordRepeat.trim();
    const trimmedPhone = phone.trim();
    const trimmedName = name.trim();
    const trimmedSurname = surname.trim();

    if (!trimmedEmail || !trimmedPassword || !trimmedRepeat || !trimmedPhone) {
      error("Заполните все поля");

      return showToast({ text1: "Заполните все поля", type: "error" });
    }

    const passwordError = validatePassword(trimmedPassword);
    if (passwordError) {
      error(passwordError);
      return showToast({ text1: passwordError, type: "error" });
    }

    if (trimmedPassword !== trimmedRepeat) {
      error("Пароли не совпадают");

      return showToast({ text1: "Пароли не совпадают", type: "error" });
    }

    try {
      const user = await store.registration(trimmedEmail, trimmedPassword, trimmedPhone, trimmedName, trimmedSurname);
      localStorage.removeItem("registerFormData");
      if (!user?.isActivated) {
        onRegisterSuccess(); // показать окно
      } else {
        window.location.href = "/profile"; // можно использовать useNavigate
      }
    } catch (error) {
      showToast({ text1: error?.message || "Ошибка регистрации", type: "error" });
    }
  };

  return (
    <>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegistration} className="form-wrapper">
        <div className="email-input-wrapper" style={{ position: "relative", width: "100%" }}>
          <Input
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "70%" }}
          />
          {email && emailExists !== null && (
            <div style={{ color: emailExists ? "red" : "green", position: "absolute", right: "100px" }}>
              {emailExists ? <FaTimesCircle /> : <FaCheckCircle />}
            </div>
          )}
        </div>
        <Input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          isPassword={true}
          style={{ width: "70%" }}
        />
        <Input
          type="password"
          placeholder="Повторите пароль"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          required
                    isPassword={true}

          style={{ width: "70%" }}
        />
        <Input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "70%" }}
        />
        <Input
          type="text"
          placeholder="Фамилия"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          style={{ width: "70%" }}
        />
        <Input
          type="text"
          placeholder="+7 (___) ___-__-__"
          mask={"+7 (999) 999-99-99"}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ width: "70%" }}
        />
        <div className="btn-wrapper">
          <Button type="submit">Зарегистрироваться</Button>
        </div>
      </form>
    </>
  );
};

export default observer(Register);