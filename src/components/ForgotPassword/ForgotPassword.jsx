import React, { useContext, useState } from "react";
import "./ForgotPassword.css";
import { Context } from "../../main";
import { useToast } from "../../providers/ToastProvider";
import Input from "../Input/Input";
import Button from "../Buttons/Button";

const ForgotPassword = () => {
  const { store } = useContext(Context);
  const { showToast } = useToast();

  const [email, setEmail] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!validateEmail(email.trim())) {
      return showToast({ text1: "Введите корректный email", type: "error" });
    }

    try {
      store.setLoading(true);
      await store.forgotPassword(email.trim(), showToast);
      showToast({ text1: "Письмо отправлено", type: "success" });
    } catch (error) {
      console.error("Ошибка:", error);
      showToast({
        text1: error.response?.data?.message || "Неизвестная ошибка",
        type: "error",
      });
    } finally {
      store.setLoading(false);
    }
  };

  return (
    <>
      <h3>Восстановление пароля</h3>

      <form onSubmit={handleForgotPassword} className="form-wrapper">
        <Input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "70%" }}
        />
        <Button type="submit" disabled={!email.trim()}>
          Восстановить
        </Button>
      </form>
    </>
  );
};

export default ForgotPassword;
