import React from "react";
import "./ContactSection.css"; // Подключаем стили
import Button from "../Buttons/Button";

export default function ContactSection({ setModalVisible, phone, email }) {
  return (
    <div className="contact-section-wrapper">
      <div className="block-background contact-section">
        <Button onClick={() => setModalVisible(true)}>Связаться с нами</Button>

        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icons">
              <span className="contact-icon">
                <i className="fa-brands fa-telegram"></i>
              </span>
              <span className="contact-icon">
                <i className="fa-brands fa-whatsapp"></i>
              </span>
              <span className="contact-icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="contact-item">
            <a href={`tel:${phone}`} className="contact-link">
              {phone || "Нет номера"}
            </a>
            <p className="contact-desc">Обратный звонок</p>
          </div>
          <div className="contact-item">
            <a href={`mailto:${email}`} className="contact-link">
              {email || "Нет почты"}
            </a>
            <p className="contact-desc">Предложения и консультации</p>
          </div>
        </div>
      </div>
    </div>
  );
}
