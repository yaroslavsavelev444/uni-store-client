import { makeAutoObservable, runInAction } from "mobx";
import AuthService from "../services/userService";
import axios from "axios";
import { API_URL } from "../http/axios";
import { error, log } from "../utils/logger";
export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  authModalVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    runInAction(() => {
      this.isAuth = bool;
      log("Auth set to:", this.isAuth);
    });
  }
  openAuthModal = () => {
     runInAction(() => {
      this.authModalVisible = true;
      log("AuthModalVisible set to:", this.authModalVisible);
    });
  };

  closeAuthModal = () => {
    runInAction(() => {
      this.authModalVisible = false;
      log("AuthModalVisible set to:", this.authModalVisible);
    });
  };
  

  setUser(user) {
    runInAction(() => {
      this.user = user;
      log("User set to:", this.user);
    });
  }

  setLoading(bool) {
    runInAction(() => {
      this.isLoading = bool;
      log("Loading set to:", this.isLoading);
    });
  }

  setWaitingForEmailConfirmation(bool) {
    runInAction(() => {
      this.waitingForEmailConfirmation = bool;
      log(
        "waitingForEmailConfirmation set to:",
        this.waitingForEmailConfirmation
      );
    });
  }

  setEmailNeedConfirmed(email) {
    runInAction(() => {
      this.emailNeedConfirmed = email;
      log("emailNeedConfirmed set to:", this.emailNeedConfirmed);
    });
  }

  async checkEmailExists(email) {
    log("checkEmailExists", email);
    try {
      const res = await AuthService.checkEmailExists(email);
      return res.data.exists;
    } catch (e) {
      console.error("Ошибка проверки email:", e);
      return false;
    }
  }

  async login(email, password, showToast) {
    try {
      const response = await AuthService.login(email, password);
      log("response", response.data);
      if (response.data.user) {
        localStorage.setItem("token", response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
        if (response.user.isActivated === false) {
          this.setEmailNeedConfirmed(response.user.email);
          this.setWaitingForEmailConfirmation(true);
        }
      } 
      return response.data.user;
    } catch (e) {
      error(e);
      showToast({ text1: e?.message, type: "error" });
      throw new Error(e);
    }
  }

  async registration(email, password, phone, name, surname) {
    try {
      const response = await AuthService.registration(
        email,
        password,
        phone,
        name,
        surname
      );
      log("response", response.data);
      return response.data.user;
    } catch (e) {
      error(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      error(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
        headers: { "X-Refresh-Flag": "true" },
      });
      
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      
      // //ЕСЛИ ПОЧТА НЕ ПОТДВЕРЖДЕНА
      // if (response.data.user.isActivated === false) {
      //   this.setEmailNeedConfirmed(response.data.user.email);
      //   this.setWaitingForEmailConfirmation(true);
      // }

    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async resendVerificationEmail(email) {
    try {
      await AuthService.resendActivation(email);
      log("Email sent successfully");
      this.checkAuth();
    } catch (e) {
      error(e.response?.data?.message);
      throw e;
    }
  }

  async changePassword(oldPassword, newPassword, userId, showToast) {
    try {
      log(
        "changePassword",
        oldPassword,
        "newPassword",
        newPassword,
        "userId",
        userId
      );
      const res = await AuthService.changePassword(
        oldPassword,
        newPassword,
        userId
      );

      if (res.status === 200) {
        this.logout();
        showToast({
          text1: "Пароль успешно изменен",
          type: "success",
        });
        log("Password changed successfully");
      }
    } catch (e) {
      // Обработка ошибок от сервера
      const errorMessage = e.response?.data?.message || "Неизвестная ошибка";
      showToast({
        text1: errorMessage,
        type: "error",
      });
      error("Error:", errorMessage);
      throw e;
    }
  }
  async forgotPassword(email, showToast) {
    try {
      log("forgotPassword", email);
      const res = await AuthService.forgotPassword(email);
      log(res);
      if (res.status === 200) {
        showToast({
          text1: "Письмо отправлено",
          type: "success",
        });
        log("Email sent successfully");
      }
    } catch (e) {
      showToast({
        text1: e.response?.data?.message || "Неизвестная ошибка",
        type: "error",
      });
      const errorMessage = e.response?.data?.message || "Неизвестная ошибка";
      error("Error:", errorMessage);
      throw e;
    }
  }

  async resetForgottenPassword(token, newPassword) {
    try {
      const res = await AuthService.resetForgottenPasswod(token, newPassword);
      log(res);
      if (res.status === 200) {
        log("Password changed successfully");
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Неизвестная ошибка";
      error("Error:", errorMessage);
      throw e;
    }
  }

  async checkEmailConfirmed() {
    if (!this.emailNeedConfirmed) {
      log("Email need confirmed not set");
      return false;
    }
    const response = await AuthService.checkEmailConfirmed(
      this.emailNeedConfirmed
    );
    log("response.", response.data);

    if (response.data.isVerified === true) {
      localStorage.setItem("token", response.data.accessToken);
      this.setUser(response.data.user);
      this.setAuth(true);
      this.setWaitingForEmailConfirmation(false);
      return true;
    }
    return false;
  }
}
