import React from "react";
import Modal from "./Modal"; // Можно использовать любую модалку

const UniversalModal = ({ children, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div>{children}</div>
    </Modal>
  );
};

export default UniversalModal;