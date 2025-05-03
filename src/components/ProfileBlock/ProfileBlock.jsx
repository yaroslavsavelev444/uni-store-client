import React from "react";
import "./ProfileBlock.css";
import { store } from "../../main";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function ProfileBlock({ handleOpenSettingsModal }) {
  return (
    <div className="profile-block-wrapper">
      <div className="profile-block">
        <div className="left-side-profile">
          <div className="profile-image">
            <img src="/img/comentor.png" alt="profile" />
          </div>
          <div className="profile-name">
            {store.user.role === "admin" || store.user.role === "superadmin" ? (
              <Link to="/admin">{store.user.name}</Link>
            ) : (
              <p>{store.user.name}</p>
            )}
          </div>
        </div>
        <div className="settings-wrapper">
          {/* Иконка настроек */}
          <FontAwesomeIcon
            icon={faGear}
            onClick={() => handleOpenSettingsModal()}
          />
        </div>
      </div>
    </div>
  );
}
