import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { productStore } from "../../../main";
import BackBtn from "../../../components/BackBtn/BackBtn";
import WidgetButton from "../../../components/WidgetButton/WidgetButton";

import CompanyModalContent from "./Modals/CompanyModal";
import FilesModalContent from "./Modals/FilesModal";
import SocialModalContent from "./Modals/SocialModal";
import Modal from "../../../components/Modal/Modal";
import './CompanyData.css';

const CompanyData = () => {
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    productStore.fetchCompany();
  }, []);

  const closeModal = () => setModalType(null);

  const renderModalContent = () => {
    switch (modalType) {
      case "company":
        return <CompanyModalContent closeModal={closeModal} />;
      case "files":
        return <FilesModalContent closeModal={closeModal} />;
      case "social":
        return <SocialModalContent closeModal={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <BackBtn />
      <div className="widgets-wrapper">
        <WidgetButton
          label="Данные компании"
          filled={true}
          onClick={() => setModalType("company")}
        />
        <WidgetButton
          label="Файлы компании"
          filled={true}
          onClick={() => setModalType("files")}
        />
        <WidgetButton
          label="Социальные ссылки"
          filled={true}
          onClick={() => setModalType("social")}
        />
      </div>

      <Modal isOpen={!!modalType} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default observer(CompanyData);
