import React, { useEffect } from "react";
import Empty from "../Empty/Empty";
import { observer } from "mobx-react-lite";
import { productStore } from "../../main";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./CommentsShell.css";

const CommentsShell = function () {
  useEffect(() => {
    productStore.fetchOrgReviews();
  }, []);

  return (
    <div className="comments-shell">
      {productStore?.comments.length === 0 ? (
        <Empty text="Комментарии отсутствуют" />
      ) : (
        productStore?.comments.map((comment) => (
          <ReviewItem key={comment._id} review={comment} />
        ))
      )}
    </div>
  );
};

export default observer(CommentsShell);