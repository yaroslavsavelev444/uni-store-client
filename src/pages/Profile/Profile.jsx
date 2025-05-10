import React from "react";
import ProfileBlock from "../../components/ProfileBlock/ProfileBlock";
import AccountMenu from "../../components/AccountMenu/AccountMenu";
import "./Profile.css";

export default function Profile() {
  
  return (
    <div className="profile-wrapper-globa">
      <div className="profile-wrapper">
        <ProfileBlock  />
        <AccountMenu />
      </div>
    </div>
  );
}
