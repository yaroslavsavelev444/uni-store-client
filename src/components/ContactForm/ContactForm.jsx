import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./ContactForm.css";
import { productStore } from "../../main";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import Loader from "../Loader/Loader";
import { contactFormSchema } from "../../utils/validator";
import SocialItems from "../SocialItem/SocialItems";
import { showToast } from "../../providers/toastService";
import { observer } from "mobx-react-lite";

const ContactForm = ({ isLoggedIn = false, phone }) => {
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    user: "",
    email: "",
    phone: "",
    msg: "",
    captchaToken: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (token) => {
    setFormData((prev) => ({
      ...prev,
      captchaToken: token,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData };

    if (isLoggedIn) {
      delete dataToSend.user;
      delete dataToSend.email;
    }

    try {
      await contactFormSchema.validate(dataToSend, { abortEarly: false });

      if (process.env.NODE_ENV !== "development" && !dataToSend.captchaToken) {
        showToast({ text1: "Пожалуйста, подтвердите, что вы не робот", type: "error" });
        return;
      }

      await productStore.sendContactForm(dataToSend);

      setFormData({
        user: "",
        email: "",
        phone: "",
        msg: "",
        captchaToken: "",
      });

      if (recaptchaRef.current) recaptchaRef.current.reset();
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => {
          showToast({ text1: err.message, type: "error" });
        });
      } else {
        showToast({ text1: "Ошибка отправки формы", type: "error" });
      }
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="block-background contact-card">
        <form onSubmit={handleSubmit} id="contact_form" name="contact">
          {!isLoggedIn && (
            <>
              <div className="form-group">
                <Input
                  id="user"
                  name="user"
                  type="text"
                  placeholder="Ваше имя:"
                  required
                  className="form-input"
                  value={formData.user}
                  onChange={handleChange}
                  label={formData.user ? "Ваше имя:" : ""}
                />
              </div>
              <div className="form-group">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ваш email:"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  label={formData.email ? "Ваш email:" : ""}
                />
              </div>
            </>
          )}
          <div className="form-group">
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Ваш телефон:"
              required
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              mask={"+7 (999) 999-99-99"}
              label={formData.phone ? "Ваш телефон:" : ""}
            />
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <textarea
                id="msg"
                name="msg"
                placeholder="Ваше сообщение:"
                required
                className="form-input resize-none"
                value={formData.msg}
                onChange={handleChange}
              />
            </div>
          </div>

          {import.meta.env.VITE_PROJECT !== "dev" && (
            <div className="form-group">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </div>
          )}

          <div className="form-group">
            <Button type="submit" disabled={productStore.isLoading}>
              {productStore.isLoading ? <Loader size={20} /> : "Отправить"}
            </Button>
          </div>
        </form>

        <div className="form-footer">
          <div className="footer-column">
            <h3>ИЛИ СВЯЖИТЕСЬ САМОСТОЯТЕЛЬНО</h3>
            <div className="footer-contact">
              <i className="fa-solid fa-phone-volume" />
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
          </div>
          <div className="footer-column">
            <h3>ПИШИТЕ НАМ В СОЦСЕТЯХ</h3>
            <div className="footer-social">
              <SocialItems links={productStore?.company?.socialLinks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ContactForm);