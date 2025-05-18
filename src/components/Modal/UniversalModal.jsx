import React from "react";
import Modal from "./Modal"; // Можно использовать любую модалку

const UniversalModal = ({ children, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default UniversalModal;