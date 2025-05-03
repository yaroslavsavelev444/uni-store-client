import $api from "../http/axios";

export default class userService {
  static async checkEmailExists(email) {
    return $api.post("auth/isEmailExists", { email });
  }
  static async login(email, password) {
    const isSite = true;
    return $api.post("auth/login", { email, password, isSite } ,  {
        withCredentials: true,
      });
  }

  static async registration(
    email,
    password,
    phone,
    name,
    surname,
  ) {
    return $api.post("auth/registration", {
      email,
      password,
      phone,
      name,
      surname,
    });
  }

  static async logout() {
    return $api.post("auth/logout");
  }

  static async resendActivation(email) {
    return $api.post("auth/resendActivationLink", { email });
  }

  static async changePassword(oldPassword, newPassword, userId) {
    return $api.post("auth/changePassword", {
      oldPassword,
      newPassword,
      userId,
    });
  }

  static async forgotPassword(email) {
    return $api.post("auth/forgotPassword", { email });
  }

  static async resetForgottenPasswod(token, newPassword) {
    return $api.post("auth/resetForgottenPassword", {
      resetToken: token,
      newPassword,
    });
  }

  static async checkEmailConfirmed(email) {
    return $api.post(
      "auth/checkEmailVerified",
      { email },
      {
        withCredentials: true,
      }
    );
  }
}
