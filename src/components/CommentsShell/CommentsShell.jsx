import React, { useEffect } from "react";
import Empty from "../Empty/Empty";
import { observer } from "mobx-react-lite";
import { productStore } from "../../main";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./CommentsShell.css";

const CommentsShell = ({showStatuses}) => {
  useEffect(() => {
    productStore.fetchOrgReviews();
  }, []);

  return (
    <div className="comments-shell">
        {productStore.reviews.map((review) =>(
            <ReviewItem key={review._id} review={review} isEditable={false}  showStatuses={showStatuses}/>
        ))}
        {productStore.reviews.length === 0 && (
            <Empty text="Нет отзывов" />
        )}
    </div>
  );
};

export default observer(CommentsShell);
