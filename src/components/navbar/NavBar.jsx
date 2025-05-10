import React, { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import ThemeToggle from "../ThemeToggler/ThemeToggle";

const NavBar = () => {
  const { store } = useContext(Context);
  const [lastScrollY, setLastScrollY] = useState(0); // Последнее положение прокрутки
  const [hidden, setHidden] = useState(false); // Состояние скрытого навбара
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState("");
  const cartQuantity = store.user?.cartQuantity || 0;

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 10) {
        // Скролл вниз
        setHidden(true);
      } else if (window.scrollY < lastScrollY) {
        // Скролл вверх
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={` block-background header ${hidden ? "hidden" : ""}`}>
      <div className="header-container" data-aos="fade-down">
        <div className="header-logo-wrapper">
    {store?.user?.logoUrl ? (
      <img src={store.user.logoUrl} alt="Логотип" className="header-logo" />
    ) : (
      <div className="header-logo-placeholder" />
    )}
  </div>
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
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-link"
              }
            >
              {store.user.name}
            </NavLink>
          ) : (
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-link"
              }
            >
              Аккаунт
            </NavLink>
          )}
          <div className="actions">
            {!searchVisible && (
              <i
                className="fa-solid fa-magnifying-glass"
                id="searchIcon"
                style={{ color: "#c0c0c0", cursor: "pointer" }}
                onClick={() => setSearchVisible(true)}
              />
            )}
            <ThemeToggle />
          </div>

          {searchVisible && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Введите слово..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => {
                  setSearch("");
                  setSearchVisible(false);
                }}
              >
                ✖
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default observer(NavBar);
