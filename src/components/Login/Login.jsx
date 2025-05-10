import React, { useState, useContext, useCallback } from "react";
import { useToast } from "../../providers/ToastProvider";
import { Context } from "../../main";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import validatePassword from "../../utils/validatePassword";
import "./Login.css";

const Login = React.memo(({ onLoginSuccess }) => {
  const { store } = useContext(Context);
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (!trimmedEmail || !trimmedPassword) {
        return showToast({ text1: "Заполните все поля", type: "error" });
      }

      const passwordError = validatePassword(trimmedPassword);
      if (passwordError) {
        return showToast({ text1: passwordError, type: "error" });
      }

      store.setLoading(true);
      try {
        const user = await store.login(trimmedEmail, trimmedPassword, showToast);
        if (!user?.isActivated) {
          onLoginSuccess(); // показать окно подтверждения
        } else {
          window.location.href = "/profile";
        }
      } catch (error) {
        console.error("Ошибка входа:", error);
      
      } finally {
        store.setLoading(false);
      }
    },
    [email, password, store, showToast, onLoginSuccess]
  );

  return (
    <>
      <h2>Вход</h2>
      <form onSubmit={handleLogin} className="form-wrapper">
        <Input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "70%" }}
        />
        <Input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          isPassword={true}
          style={{ width: "70%" }}
        />
        <Button type="submit">Войти</Button>
      </form>
    </>
  );
});

export default Login;