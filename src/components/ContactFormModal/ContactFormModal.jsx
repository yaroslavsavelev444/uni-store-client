import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import Loader from "../Loader/Loader";
import { productStore, store } from "../../main";
import { contactFormSchema } from "../../utils/validator";
import ContactSection from "../ContactSection/ContactSection";
import { showToast } from "../../providers/toastService";

const ContactFormModal = ({ isLoggedIn = false }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const recaptchaRef = useRef(null);

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

    if (!formData.phone || !formData.msg) {
      showToast({ text1: "Заполните все поля", type: "error" });
      return;
    }

    let dataToSend = { ...formData };

    if (isLoggedIn) {
      dataToSend.user = store?.user?.name;
      dataToSend.email = store?.user?.email;
    }

    const isProd = import.meta.env.VITE_PROJECT === "prod";
    let captchaToken = "";

    if (recaptchaRef.current) {
      try {
        captchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
      } catch (error) {
        showToast({ text1: `Подтвердите, что вы не робот`, type: "error" });
        console.error(error);
        return;
      }
    }

    if (!captchaToken && isProd) {
      showToast({ text1: "Подтвердите капчу", type: "error" });
      return;
    }

    dataToSend.captcha = captchaToken; // добавляем токен

    try {
      await contactFormSchema.validate(dataToSend, { abortEarly: false });
      await productStore.sendContactForm(dataToSend);

      setFormData({});
      setModalVisible(false);
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
    <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
      <ContactSection
        setModalVisible={setModalVisible}
        phone={productStore?.company?.phone}
        email={productStore?.company?.email}
      />

      {modalVisible && (
        <Modal onClose={() => setModalVisible(false)} isOpen={modalVisible}>
          <form
            onSubmit={handleSubmit}
            id="contact_form"
            name="contact"
            className="contact-form"
          >
            <h2>Форма обратной связи</h2>
            {!isLoggedIn && (
              <>
                <Input
                  id="user"
                  name="user"
                  type="text"
                  placeholder="Ваше имя:"
                  required
                  value={formData.user}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ваш email:"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </>
            )}
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Ваш телефон:"
              required
              value={formData.phone}
              onChange={handleChange}
              mask={"+7 (999) 999-99-99"}
              style={{ width: "100%" }}
            />
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
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            {import.meta.env.VITE_PROJECT !== "dev" && (
              <div>
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  ref={recaptchaRef}
                />
              </div>
            )}

            <div className="form-group">
              <Button type="submit" disabled={productStore.isLoading}>
                {productStore.isLoading ? <Loader size={15} /> : "Отправить"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ContactFormModal;
