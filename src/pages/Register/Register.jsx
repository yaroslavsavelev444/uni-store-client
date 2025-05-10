import Register from "../../components/Register/Register";
import EmailConfirmationNotice from "../../components/EmailConfirmationNotice/EmailConfirmationNotice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Auth/Auth.css";

export default function RegisterPage() {
  const [showEmailNotice, setShowEmailNotice] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    setShowEmailNotice(true);
  };

  const handleConfirmed = () => {
    navigate("/profile");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {showEmailNotice ? (
          <EmailConfirmationNotice onConfirmed={handleConfirmed} />
        ) : (
          <Register onRegisterSuccess={handleRegisterSuccess} />
        )}

        {!showEmailNotice && (
          <div className="auth-buttons">
            <Link to="/login">Войти</Link>
            <Link to="/reset-password">Восстановить пароль</Link>
          </div>
        )}
      </div>
    </div>
  );
}