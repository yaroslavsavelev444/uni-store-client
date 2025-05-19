import React from "react";
import useModalState from "../../hooks/useModalState";
import UniversalModal from "../Modal/UniversalModal";
import ReviewModal from "../Modals/Profile/ReviewModal";
import OrderModal from "../Modals/Profile/OrderModal";
import SettingsModal from "../Modals/Profile/SettingsModal";
import './AccountMenu.css';
import Button from "../Buttons/Button";
import UserDataModal from "../Modals/Profile/UserDataModal";

const menuItems = [
  { key: "reviews", label: "Мои отзывы", component: ReviewModal },
  { key: "orders", label: "Мои заказы", component: OrderModal },
  { key: "settings", label: "Настройки", component: SettingsModal },
  { key: "addresses", label: "Мои данные", component: UserDataModal },
];

const AccountMenu = () => {
  const { openModal, closeModal, isOpen } = useModalState();

  return (
    <div className="block-background account-menu">
      {menuItems.map(({ key, label }) => (
        <Button key={key} onClick={() => openModal(key)} className="menu-button">
          {label}
        </Button>
      ))}

      {menuItems.map(({ key , component: Component }) =>
        isOpen(key) ? (
          <UniversalModal key={key} onClose={closeModal}>
            <Component onClose={closeModal} />
          </UniversalModal>
        ) : null
      )}
    </div>
  );
};

export default AccountMenu;