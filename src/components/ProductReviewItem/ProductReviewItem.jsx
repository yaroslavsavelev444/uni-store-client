import React from "react";
import { formatDate } from "../../utils/formatMessageTime";
import StarRating from "../StarRating/StarRating";
import "./ProductReviewItem.css";
import UserPreview from "../UserPreview/UserPreview";
import Button from "../Buttons/Button";
import { reviewStatus } from "../../utils/options";
export default function ProductReviewItem({
  review,
  role,
  handleReviewAction,
}) {
  const { pros, cons, comment, rating, createdAt, user } = review;
  return (
    <div className="block-background review-card">
      <div className="review-header">
        <UserPreview user={user} />
        <div className="review-date">{formatDate(createdAt)}</div>
      </div>

      <StarRating rating={rating} />

      <div className="review-section">
        <div className="review-label">Плюсы:</div>
        <div className="review-text">{pros || "-"}</div>
      </div>

      <div className="review-section">
        <div className="review-label">Минусы:</div>
        <div className="review-text">{cons || "-"}</div>
      </div>

      <div className="review-section">
        <div className="review-label">Комментарий:</div>
        <div className="review-text">{comment || "-"} </div>
      </div>
      {review.status !== "active" && <h3>Статус: {reviewStatus.find((item) => item.value === review.status).label}</h3>}
      <div className="review-actions">
        {role === "admin" && (
          <>
            {review.status !== "active" && (
              <Button
                onClick={() => handleReviewAction(review._id, "active")}
                className="accept-button"
              >
                Принять
              </Button>
            )}
            {review.status !== "reject" && (
              <Button
              onClick={() => handleReviewAction(review._id, "reject")}
              className="decline-button"
            >
              Отклонить
            </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
