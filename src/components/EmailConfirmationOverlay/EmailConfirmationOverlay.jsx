import React, { useEffect, useState, useContext } from "react";
import "./EmailConfirmationOverlay.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { log } from "../../utils/logger";

const EmailConfirmationOverlay = () => {
  const { store } = useContext(Context);
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.waitingForEmailConfirmation) return;

    const interval = setInterval(async () => {
      if (checking) return;
      setChecking(true);
      try {
        const confirmed = await store.checkEmailConfirmed();
        if (confirmed ) {
          navigate("/profile");
        }
        else{
          log("errors in EmailConfirmationOverlay");
        }
      } catch (e) {
        console.error("Ошибка при проверке подтверждения email:", e);
      } finally {
        setChecking(false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [store, checking]);

  if (!store.waitingForEmailConfirmation) return null;

  return (
    <div className="email-confirmation-overlay">
      <div className="confirmation-box">
        <h2>Подтвердите Email</h2>
        <p>На вашу почту отправлено письмо с подтверждением.</p>
        <p>Как только вы подтвердите — мы откроем вам доступ.</p>
        <p className="small">Ожидаем подтверждения…</p>
      </div>
    </div>
  );
};

export default EmailConfirmationOverlay;