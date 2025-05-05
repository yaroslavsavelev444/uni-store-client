import React from "react";
import Button from "../Buttons/Button";
import { formatDate } from "../../utils/formatMessageTime";
import "./ContactItem.css";
export default function ContactItem({ contact, onAction }) {
  const { name, email, phone, message, createdAt, _id } = contact;

  return (
    <div className="block-background contact-item">
      <div className="contact-meta">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <span>
            <strong>{name || "Аноним"}</strong>
          </span>
          <span className="contact-date">{formatDate(createdAt)}</span>
        </div>
        <div>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div>
          Телефон: <a href={`tel:${phone}`}>{phone}</a>
        </div>
      </div>

      <div className="contact-message" style={{ marginTop: 8 }}>
        {message}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 12,
        }}
      >
        <Button onClick={() => onAction(_id, "delete")}>
          Удалить
        </Button>
      </div>
    </div>
  );
}
