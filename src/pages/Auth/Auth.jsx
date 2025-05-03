import { useState } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import EmailConfirmationNotice from "../../components/EmailConfirmationNotice/EmailConfirmationNotice";
import "./Auth.css";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [showEmailNotice, setShowEmailNotice] = useState(false);
  const navigate = useNavigate(); // Хук для навигации

  const handleShowNotice = () => {
    setShowEmailNotice(true);
  };

  const handleActivationSuccess = () => {
    navigate("/profile");
  };

  const renderForm = () => {
    if (showEmailNotice) {
      return <EmailConfirmationNotice onConfirmed={handleActivationSuccess} />;
    }

    switch (activeForm) {
      case "login":
        return <Login onLoginSuccess={handleShowNotice} />;
      case "register":
        return <Register onRegisterSuccess={handleShowNotice} />;
      case "forgot":
        return <ForgotPassword />;
      default:
        return null;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {renderForm()}
        {!showEmailNotice && (
          <div className="auth-buttons">
            {activeForm === "login" && <a onClick={() => setActiveForm("register")}>Зарегистрироваться</a>}
            {activeForm !== "login" && <a onClick={() => setActiveForm("login")}>Войти</a>}
            <a onClick={() => setActiveForm("forgot")}>Восстановить пароль</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;