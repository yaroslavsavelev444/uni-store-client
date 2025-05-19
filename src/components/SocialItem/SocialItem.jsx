import React from "react";
import { API_URL } from "../../http/axios";
import "./SocialItem.css";
import Button from "../Buttons/Button";
import { adminStore } from "../../main";

export default function SocialItem({ link, edit }) {
  const handleDelete = () => {
    if (window.confirm("Удалить эту ссылку?")) {
      adminStore.removeSocialLink(link._id);
    }
  };

  return (
    <div className="block-background social-item">
      <a href={link.url || "#"} target="_blank" rel="noopener noreferrer">
        <img src={`${API_URL}${link.icon}`} alt="icon" />
      </a>
      {edit && (
        <Button onClick={handleDelete} style={{ marginTop: 5 }}>
          –
        </Button>
      )}
    </div>
  );
}