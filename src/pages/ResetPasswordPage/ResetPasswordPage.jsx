import "../Auth/Auth.css";
import { useContext, useState } from "react";
import { Context } from "../../main";
import Button from "../../components/Buttons/Button";
import { showToast } from "../../providers/toastService";
import Input from "../../components/Input/Input";
import validatePassword from "../../utils/validatePassword"; // ← подключаем
import { observer } from "mobx-react-lite";
import BackBtn from "../../components/BackBtn/BackBtn";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const ResetPasswordPage = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const trimmedCurrent = currentPassword.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmNewPassword.trim();

    if (!trimmedCurrent || !trimmedNew || !trimmedConfirm) {
      return showToast({ text1: "Заполните все поля", type: "error" });
    }

    const validationError = validatePassword(trimmedNew);
    if (validationError) {
      return showToast({ text1: validationError, type: "error" });
    }

    if (trimmedNew !== trimmedConfirm) {
      return showToast({ text1: "Пароли не совпадают", type: "error" });
    }

    if (trimmedNew === trimmedCurrent) {
      return showToast({
        text1: "Новый пароль не должен совпадать с текущим",
        type: "error",
      });
    }

    try {
      const res = await store.changePassword(trimmedCurrent, trimmedNew);

      if (res.success) {
        showToast({ text1: "Пароль успешно изменён", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        navigate(-1);
      } else {
        showToast({
          text1: res.message || "Ошибка при смене пароля",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Ошибка:", err);
      showToast({
        text1: err.response?.data?.message || "Неизвестная ошибка",
        type: "error",
      });
    }
  };

  return (
    <>
      <BackBtn />
      {store.isLoading ? (
        <Loader size={50} />
      ) : (
        <>
          <div className="auth-container">
            <div className="auth-form">
              <h3>Смена пароля</h3>

              <form onSubmit={handleChangePassword} className="form-wrapper">
                <Input
                  type="password"
                  placeholder="Текущий пароль"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  style={{ width: "70%" }}
                />
                <Input
                  type="password"
                  placeholder="Новый пароль (8‑16 символов, A‑z, 0‑9, спец‑символ)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{ width: "70%" }}
                />
                <Input
                  type="password"
                  placeholder="Повторите новый пароль"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  style={{ width: "70%" }}
                />
                <Button
                  type="submit"
                  disabled={
                    !currentPassword.trim() ||
                    !newPassword.trim() ||
                    !confirmNewPassword.trim()
                  }
                >
                  Сменить пароль
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default observer(ResetPasswordPage);
