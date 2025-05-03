import { useEffect, useState, useContext } from "react";
import { Context } from "../../main";

const EmailConfirmationNotice = ({ onConfirmed }) => {
  const { store } = useContext(Context);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      setChecking(true);
      try {
        const updatedUser = await store.checkEmailConfirmed();
        if (updatedUser?.isActivated) {
          clearInterval(interval);
          onConfirmed();
        }
      } catch (err) {
        console.error("Ошибка при проверке активации", err);
      } finally {
        setChecking(false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [store, onConfirmed]);

  return (
    <div className="email-confirmation-notice">
      <h2>Подтвердите вашу почту</h2>
      <p>Мы отправили вам письмо. Пожалуйста, перейдите по ссылке в письме.</p>
      {checking && <p>Проверяем статус...</p>}
    </div>
  );
};

export default EmailConfirmationNotice;