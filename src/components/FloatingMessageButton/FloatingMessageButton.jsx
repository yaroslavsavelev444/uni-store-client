import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import "./FloatingMessageButton.css";
import Form from "../Form/Form";

const FloatingMessageButton = ({ setIsScrollTopVisible }) => {
  const [isFormVisible, setIsFormVisible] = useState(false); // Стейт для отображения формы

  // Показать/скрыть форму
  const toggleForm = () => {
    setIsFormVisible((prevState) => !prevState);
    setIsScrollTopVisible((prevState) => !prevState);
  };

  // Закрыть форму, если кликнули вне её
  const handleOutsideClick = (e) => {
    if (
      !e.target.closest(".floating-form") &&
      !e.target.closest(".floating-message-button")
    ) {
      setIsFormVisible(false);
      setIsScrollTopVisible(true); // ← вернуть кнопку
    }
  };


  // Обработчик кликов вне формы
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);


  return (
    <>
      {/* Иконка сообщения */}
      <div className="floating-message-button" onClick={toggleForm}>
        <FaRegCommentDots size={30} color="#fff" />
      </div>

      {/* Мини-форма рядом с иконкой */}
      {isFormVisible && (
       <Form onClose={toggleForm} />
      )}
    </>
  );
};

export default FloatingMessageButton;