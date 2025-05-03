import React, { useState, useContext } from "react";
import { useToast } from "../../providers/ToastProvider";
import { Context } from "../../main";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import validatePassword from "../../utils/validatePassword";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const { store } = useContext(Context);
  const { showToast } = useToast();
  const [email, setEmail] = useState("yarik.savelev.04@mail.ru");
  const [password, setPassword] = useState("228335Qwerty!");

  const handleLogin = async (e) => {
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
        onLoginSuccess(); // показать окно
      } else {
        window.location.href = "/profile"; // можно использовать useNavigate
      }
    } catch (error) {
      console.log("Ошибка входа:", error);
      showToast({ text1: error?.message || "Ошибка входа", type: "error" });
    } finally {
      store.setLoading(false);
    }
  };

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
        style={{ width: "70%" }}
      />
      <div className="btn-wrapper">
      <Button type="submit" disabled={!email.trim() || !password.trim()}>
        Войти
      </Button>
      </div>
    </form>
    </>
    
  );
};

export default Login;