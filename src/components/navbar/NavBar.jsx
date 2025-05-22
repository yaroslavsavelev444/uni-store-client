// components/NavBar.jsx

import React, { useContext, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context, productStore } from "../../main";
import ThemeToggle from "../ThemeToggler/ThemeToggle";
import { API_URL } from "../../http/axios";

const NavBar = () => {
  const { store } = useContext(Context);
  const lastScrollYRef = useRef(0); // Последняя прокрутка
  const [hidden, setHidden] = React.useState(false);
  const cartQuantity = store.user?.cartQuantity || 0;

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 10) {
        setHidden(true);
      } else if (currentScrollY < lastScrollYRef.current) {
        setHidden(false);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logo = productStore?.company?.logo;
  const showLogo = typeof logo === "string" && logo.trim().length > 0;

  return (
    <header className={`block-background header ${hidden ? "hidden" : ""}`}>
      <div className="header-container" data-aos="fade-down">
        {showLogo && (
          <div className="header-logo-wrapper" title="На главную">
            <NavLink to="/">
              <img
                src={`${API_URL}/${logo}`}
                alt="Company Logo"
                style={{ height: "40px", cursor: "pointer" }}
              />
            </NavLink>
          </div>
        )}
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            Главная
          </NavLink>

          <NavLink
            to="/category"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            Каталог
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            <span className="cart-link-wrapper" style={{ position: "relative" }}>
              Корзина
              {cartQuantity > 0 && (
                <span className="cart-indicator">{cartQuantity}</span>
              )}
            </span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            О нас
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
          >
            Контакты
          </NavLink>

          {store.isAuth ? (
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
            >
              {store.user?.name || "Профиль"}
            </NavLink>
          ) : (
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "nav-active" : "nav-link")}
            >
              Аккаунт
            </NavLink>
          )}

          <div className="actions">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default observer(NavBar);