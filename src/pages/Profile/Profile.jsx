import React from "react";
import ProfileBlock from "../../components/ProfileBlock/ProfileBlock";
import AccountMenu from "../../components/AccountMenu/AccountMenu";
import "./Profile.css";

export default function Profile() {
  const handleOpenSettingsModal = () => {
    console.log("Open settings modal");
  };
  return (
    <div className="profile-wrapper-globa">
      <div className="profile-wrapper">
        <ProfileBlock handleOpenSettingsModal={handleOpenSettingsModal} />
        <AccountMenu />
      </div>
    </div>
  );
}
