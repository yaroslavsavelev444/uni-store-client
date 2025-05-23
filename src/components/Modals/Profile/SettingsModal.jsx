import React, { useState } from 'react';
import Button from '../../Buttons/Button';
import { log } from '../../../utils/logger';
import { NavLink, useNavigate } from 'react-router-dom';

export default function SettingsModal() {
  const [confirmExit, setConfirmExit] = useState(false);
const navigation = useNavigate();
  const handleLogoutClick = () => {
    if (!confirmExit) {
      // Первый клик: запрос подтверждения
      setConfirmExit(true);

      // Сбросить обратно через 5 секунд (по желанию)
      setTimeout(() => setConfirmExit(false), 5000);
    } else {
      // Второй клик: подтверждение выхода
      localStorage.removeItem("token");
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    }
  };

  const handleNavigate = () => {
   navigation("/reset-password");
  };

  return (
    <div className='btn-vert-wrapper'>
      <Button onClick={handleNavigate}>Сменить пароль</Button>

      <Button
        onClick={handleLogoutClick}
        style={{
          backgroundColor: confirmExit ? '#ff4d4f' : undefined, // Красный фон при подтверждении
          color: confirmExit ? '#fff' : undefined
        }}
      >
        {confirmExit ? "Точно выйти?" : "Выйти"}
      </Button>

      <Button onClick={() => log("delete account")}>Запросить удаление аккаунта</Button>
    </div>
  );
}