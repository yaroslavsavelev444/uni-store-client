import React from "react";
import "./ReviewItem.css";
import UserPreview from "../UserPreview/UserPreview";
import { formatDate } from "../../utils/formatMessageTime";
import Button from "../Buttons/Button";
import { commentThemeTranslate } from "../../utils/options";

export default function ReviewItem({
  review,
  isEditable,
  onChange,
  showStatuses,
}) {
  const { userId, comment, theme, createdAt, status } = review;

  const handleAction = async (action) => {
    if (!action) return;
    await onChange(review._id, action);
  };

  return (
    <div className="block-background review-item">
      <UserPreview user={userId} />
      <div className="review-content">
        <div className="review-meta">
          <span className="review-date">{formatDate(createdAt)}</span>
          <span className={`review-status status-${status}`}>
            {showStatuses && (
              <>
                {status === "pending" && "⏳ Новый"}
                {status === "accept" && "✅ Принят"}
                {status === "reject" && "❌ Отклонён"}
              </>
            )}
          </span>
        </div>
        {theme && <div className="review-theme"><p style={{color: 'aliceblue', margin: 0}}>Тема: {commentThemeTranslate[theme]}</p></div>}
        <div className="review-text">{comment}</div>
      </div>
      {isEditable && status === "pending" && (
        <div className="review-actions">
          <Button onClick={() => handleAction("reject")}>Отклонить</Button>
          <Button onClick={() => handleAction("accept")}>Принять</Button>
        </div>
      )}
      {isEditable && status === "accept" && (
        <div className="review-actions">
          <Button onClick={() => handleAction("delete")}>Удалить</Button>
        </div>
      )}
    </div>
  );
}
