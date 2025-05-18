// UsersPage.js
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context, store } from "../../../main";
import Empty from "../../../components/Empty/Empty";
import BackBtn from "../../../components/BackBtn/BackBtn";
import UserItem from "../../../components/admin-sections/UsersList/UserItem";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { error, log } from "../../../utils/logger";
import Loader from "../../../components/Loader/Loader";

const UsersPage = () => {
  const { adminStore } = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(""); // 'delete' | 'makeAdmin'

  useEffect(() => {
    adminStore.fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setActionType("delete");
    setModalOpen(true);
  };

  const handleToggleAdminClick = (user) => {
    setSelectedUser(user);
    log("handleToggleAdminClick", user);
    setActionType("toggleAdmin");
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if(!selectedUser) return error("Не выбран пользователь");
    if (actionType === "delete") {
      adminStore.deleteUser(selectedUser._id);
    } else if (actionType === "toggleAdmin") {
      adminStore.toggleAdminRules(selectedUser._id);
    }
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setActionType("");
  };

  const renderModal = () => {
    if (!selectedUser) return null;

    if (actionType === "delete") {
      return (
        <ConfirmModal
          isOpen={modalOpen}
          title="Удалить пользователя?"
          text={`Вы действительно хотите удалить пользователя ${selectedUser.name}? Это действие необратимо.`}
          confirmLbl="Удалить"
          cancelLbl="Отмена"
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
        />
      );
    }

    if (actionType === "toggleAdmin") {
      const isGivingAdmin = selectedUser.role !== "admin";
      return (
        <ConfirmModal
          isOpen={modalOpen}
          title={isGivingAdmin ? "Назначить админом?" : "Отнять права администратора?"}
          text={
            isGivingAdmin
              ? `Пользователь получит права администратора.`
              : `Пользователь потеряет права администратора.`
          }
          confirmLbl={isGivingAdmin ? "Назначить" : "Отнять"}
          cancelLbl="Отмена"
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
        />
      );
    }

    return null;
  };

  if (adminStore.isLoading) {
    return <Loader size={50} />;
  }

  return (
    <div>
      <BackBtn />
      {adminStore.users.length === 0 ? (
        <Empty text="Пользователи отсутствуют" />
      ) : (
        <>
          {adminStore.users.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              currentUser={store.user}
              onDeleteClick={handleDeleteClick}
              onToggleAdminClick={handleToggleAdminClick}
            />
          ))}

          {renderModal()}
        </>
      )}
    </div>
  );
};

export default observer(UsersPage);