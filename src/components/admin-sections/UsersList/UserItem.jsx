import React from "react";
import { adminStore } from "../../../main";
import { observer } from "mobx-react-lite";
import Button from "../../Buttons/Button";
import "./UsersList.css";
const UserItem = ({ user, currentUser }) => {
  // Функция для изменения статуса админа
  const toggleAdminStatus = () => {
    if (user.isAdmin) {
      adminStore.removeAdmin(user.id); // Убираем админку
    } else {
      adminStore.addAdmin(user.id); // Даем админку
    }
  };
  console.log("user", user);
  console.log("currentUser", currentUser);
  
  

  return (
    <div className="user-item-wrapper">
      <div className="user-item">
        <h3>{user.name}</h3>
        <h3>{user.surname}</h3>
        <h3>{user.phone}</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        {user._id !== currentUser.id && (
          <>
            <Button onClick={toggleAdminStatus}>
              {user.role === "admin" ? "Remove Admin" : "Make Admin"}
            </Button>
            <Button onClick={() => adminStore.deleteUser(user.id)}>
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(UserItem);
