// components/navbar/MobileNavBar.js
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../main";
import "./MobileNavBar.css";

const MobileNavBar = () => {
  const { store } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartQuantity = store.user?.cartQuantity || 0;

  return (
    <header className="block-background mobile-header">
      <div className="block-background mobile-top-bar">
        <div className="mobile-logo">
          {store?.user?.logoUrl ? (
            <img src={store.user.logoUrl} alt="Логотип" />
          ) : (
            "LOGO"
          )}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="menu-toggle">
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-menu">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Главная</NavLink>
          <NavLink to="/category" onClick={() => setMenuOpen(false)}>Каталог</NavLink>
          <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
            Корзина {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>О нас</NavLink>
          <NavLink to="/contacts" onClick={() => setMenuOpen(false)}>Контакты</NavLink>
          {store.isAuth ? (
            <NavLink to="/profile" onClick={() => setMenuOpen(false)}>{store.user.name}</NavLink>
          ) : (
            <NavLink to="/register" onClick={() => setMenuOpen(false)}>Аккаунт</NavLink>
          )}
        </nav>
      )}
    </header>
  );
};

export default MobileNavBar;