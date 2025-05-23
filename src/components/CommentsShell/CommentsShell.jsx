import React, { useEffect } from "react";
import Empty from "../Empty/Empty";
import { observer } from "mobx-react-lite";
import { productStore } from "../../main";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./CommentsShell.css";
import Loader from "../Loader/Loader";

const CommentsShell = ({ showStatuses }) => {

  return (
    <div className="comments-shell">
      {productStore.isLoading ? (
        <Loader size={50} />
      ) : (
        <>
          {productStore.reviews.map((review) => (
            <ReviewItem
              key={review._id}
              review={review}
              isEditable={false}
              showStatuses={showStatuses}
            />
          ))}
          {productStore.reviews.length === 0 && <Empty text="Нет отзывов" />}
        </>
      )}
    </div>
  );
};

export default observer(CommentsShell);
