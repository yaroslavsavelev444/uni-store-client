import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import Loader from "../Loader/Loader";
import { productStore, store } from "../../main";
import { useToast } from "../../providers/ToastProvider";
import { contactFormSchema } from "../../utils/validator";
import ContactSection from "../ContactSection/ContactSection";

const ContactFormModal = ({ isLoggedIn = false }) => {
  const { showToast } = useToast();
  const [modalVisible, setModalVisible] = useState(false);

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
  
    let dataToSend = { ...formData };
  
    if (isLoggedIn) {
      dataToSend.user = store?.user?.name;
      dataToSend.email = store?.user?.email;
    }
  
    try {
      await contactFormSchema.validate(dataToSend, { abortEarly: false });
  
      await productStore.sendContactForm(dataToSend, showToast);
  
      setFormData({
        user: "",
        email: "",
        phone: "",
        msg: "",
      });
  
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
    <>
    <ContactSection  setModalVisible={setModalVisible} phone={productStore?.company?.phone} email={productStore?.company?.email} />

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
                  value={!isLoggedIn ? formData.user : store.user.name}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ваш email:"
                  required
                  value={!isLoggedIn ? formData.email : store.user.email}
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

            <div className="form-group">
              <Button type="submit" disabled={productStore.isLoading}>
                {productStore.isLoading ? <Loader size={10} /> : "Отправить"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ContactFormModal;
