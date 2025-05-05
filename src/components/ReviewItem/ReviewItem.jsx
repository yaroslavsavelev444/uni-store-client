import React from "react";
import "./ReviewItem.css";
import UserPreview from "../UserPreview/UserPreview";
import { formatDate } from "../../utils/formatMessageTime";
import Button from "../Buttons/Button";

export default function ReviewItem({ review, isEditable, onChange }) {
  const { userId, comment, theme, createdAt, status } = review;

  const handleAction = async (action) => {
    if(!action) return;
      await onChange(review._id, action);
  };

  return (
    <div className="block-background review-item">
      <UserPreview user={userId} />
      <div className="review-content">
        <div className="review-meta">
          <span className="review-date">{formatDate(createdAt)}</span>
          <span className={`review-status status-${status}`}>
            {status === "pending" && "⏳ Новый"}
            {status === "accept" && "✅ Принят"}
            {status === "reject" && "❌ Отклонён"}
          </span>
        </div>
        {theme && <div className="review-theme">Тема: {theme}</div>}
        <div className="review-text">{comment}</div>
      </div>
      {isEditable && status === "pending" && (
        <div className="review-actions">
          <Button onClick={() => handleAction("reject")}>
            Отклонить
          </Button>
          <Button onClick={() => handleAction("accept")}>
            Принять
          </Button>
        </div>
      )}
      {status === "accept" && isEditable || isEditable && status === "reject" && (
        <div className="review-actions">
          <Button onClick={() => handleAction("delete")}>
            Удалить
          </Button>
        </div>
      )}
    </div>
  );
}