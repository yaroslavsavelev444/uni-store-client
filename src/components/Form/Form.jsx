import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import "../FloatingMessageButton/FloatingMessageButton.css";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import { showToast } from "../../providers/toastService";
import { productStore } from "../../main";
import ReCAPTCHA from "react-google-recaptcha";
import { contactFormSchema } from "../../utils/validator"; // можно переиспользовать
import Loader from "../Loader/Loader";
import { log } from "../../utils/logger";

export default function Form({ onClose }) {
  const recaptchaRef = useRef(null);
  const formRef = useRef();

  const [formData, setFormData] = useState({
    user: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isProd = import.meta.env.VITE_PROJECT === "prod";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = async (data) => {
    try {
      await contactFormSchema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message;
        showToast({ text1: e.message, type: "error" });
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let captchaToken = "";

    if (recaptchaRef.current && isProd) {
      try {
        captchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
      } catch (err) {
        showToast({ text1: "Подтвердите, что вы не робот", type: "error" });
        log(err);
        return;
      }
    }

    const dataToSend = {
      ...formData,
      captcha: captchaToken,
    };

    const isValid = await validate(dataToSend);
    if (!isValid) return;

    setIsLoading(true);
    try {
      await productStore.sendContactForm(dataToSend);
      setFormData({ user: "", email: "", phone: "" });
      onClose();
    } catch (error) {
      showToast({
        text1: `Ошибка при отправке ${error}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="floating-form">
      <X
        size={20}
        color="#fff"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
      />
      <div className="form-header">
        <h2>Отправить заявку</h2>
      </div>
      <form ref={formRef} className="form-layout">
        <Input
          name="user" // ✅ правильно
          placeholder="Имя"
          value={formData.user}
          onChange={handleChange}
          mask={false}
          errorMessage={errors.user}
          style={{ width: "100%" }}
        />
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          mask={false}
          errorMessage={errors.email}
          style={{ width: "100%" }}
        />
        <Input
          name="phone"
          placeholder="Телефон"
          value={formData.phone}
          onChange={handleChange}
          errorMessage={errors.phone}
          mask="+7 (999) 999-99-99"
          style={{ width: "100%" }}
        />
        {errors.msg && <p className="error">{errors.msg}</p>}

        {isProd && (
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            size="invisible"
            ref={recaptchaRef}
          />
        )}

        <Button disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? <Loader size={15} /> : "Отправить"}
        </Button>
      </form>
    </div>
  );
}
