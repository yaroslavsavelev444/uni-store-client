import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import { Link } from "react-router-dom";
import "../Auth/Auth.css";

export default function ResetPasswordPage() {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <ForgotPassword />
        <div className="auth-buttons">
          <Link to="/login">Войти</Link>
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}