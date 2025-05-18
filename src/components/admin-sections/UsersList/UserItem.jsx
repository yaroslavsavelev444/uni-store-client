// UserItem.js
import React from "react";
import Button from "../../Buttons/Button";
import "./UsersList.css";
import { log } from "../../../utils/logger";
import { rolesTranslate } from "../../../utils/options";

const UserItem = ({ user, currentUser, onDeleteClick, onToggleAdminClick }) => {
  log("user", user);
  log("currentUser", currentUser);

  return (
    <div className="user-item-wrapper">
      <div className="user-item block-background">
        <h3>{user.name}</h3>
        <h3>{user.surname}</h3>
        <h3>{user.phone}</h3>
        <p>{user.email}</p>
        <p>{rolesTranslate[user.role]}</p>
        {user._id !== currentUser.id && (
          <>
            <Button onClick={() => onToggleAdminClick(user)}>
              {user.role === "admin" ? "Отнять админку" : "Дать админа"}
            </Button>
            <Button onClick={() => onDeleteClick(user)}>
              Удалить
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserItem;