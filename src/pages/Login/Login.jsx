import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Login from "../../components/Login/Login";
import EmailConfirmationNotice from "../../components/EmailConfirmationNotice/EmailConfirmationNotice";

export default function LoginPage() {
  const [showEmailNotice, setShowEmailNotice] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = useCallback(() => {
    setShowEmailNotice(true);
  }, []);

  const handleConfirmed = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        {showEmailNotice ? (
          <EmailConfirmationNotice onConfirmed={handleConfirmed} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}

        {!showEmailNotice && (
          <div className="auth-buttons">
            <Link to="/register">Зарегистрироваться</Link>
            <Link to="/reset-password">Восстановить пароль</Link>
          </div>
        )}
      </div>
    </div>
  );
}