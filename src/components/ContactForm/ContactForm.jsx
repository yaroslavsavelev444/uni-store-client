import React, { useState } from "react";
import "./ContactForm.css";
import { productStore } from "../../main";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import Loader from "../Loader/Loader";
import { useToast } from "../../providers/ToastProvider";
import { contactFormSchema } from "../../utils/validator";
import SocialItems from "../SocialItem/SocialItems";

const ContactForm = ({ isLoggedIn = false, phone, email }) => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    user: "",
    email: "",
    phone: "",
    msg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Копируем и обрабатываем данные
    const dataToSend = { ...formData };

    // Удаляем поля, если залогинен
    if (isLoggedIn) {
      delete dataToSend.user;
      delete dataToSend.email;
    }

    try {
      await contactFormSchema.validate(dataToSend, { abortEarly: false });

      // Отправка
      productStore.sendContactForm(dataToSend, showToast); // Предположим, теперь sendContactForm принимает объект
      
      // Очистка формы
      setFormData({
        user: "",
        email: "",
        phone: "",
        msg: "",
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => {
          showToast({
            text1: err.message,
            type: "error",
          });
        });
      } else {
        showToast({
          text1: "Ошибка отправки формы",
          type: "error",
        });
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
          <div className="form-group">
            <Button type="submit" disabled={productStore.isLoading}>
              {productStore.isLoading ? <Loader size={10} /> : "Отправить"}
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

export default ContactForm;