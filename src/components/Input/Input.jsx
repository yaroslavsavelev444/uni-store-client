import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Импорт иконок глаза
import "./Input.css"; // Стилевые классы для кастомизации

const Input = ({
  mask,
  errorMessage,
  isPassword,
  placeholder,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false); // Состояние для управления видимостью пароля
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");

  useEffect(() => {
      setAnimatedPlaceholder(placeholder);
  }, [placeholder,]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Функция для удаления букв
  const handleInputChange = (e) => {
    const { value } = e.target;

    const numericValue = value.replace(/[^\d]/g, '');
    if (onChange) {
      onChange(e, numericValue); 
    }
  };

  const renderInput = () => {
    if (mask) {
      return (
        <InputMask {...props} mask={mask} onChange={handleInputChange}>
          {(inputProps) => (
            <input
              {...inputProps}
              type={isPassword && !showPassword ? "password" : "text"} // Управление типом поля
              placeholder={animatedPlaceholder}
            />
          )}
        </InputMask>
      );
    } else {
      return (
        <input
          {...props}
          type={isPassword && !showPassword ? "password" : "text"} // Управление типом поля
          placeholder={animatedPlaceholder}
          onChange={handleInputChange} // Обработчик для удаления букв
        />
      );
    }
  };

  return (
    <div className="input-wrapper">
      {renderInput()}
      
      {isPassword && (
        <span className="eye-icon" onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}

      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default Input;