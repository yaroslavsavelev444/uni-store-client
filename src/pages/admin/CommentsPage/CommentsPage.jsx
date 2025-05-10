import React, { useEffect } from "react";
import { adminStore, productStore, store } from "../../../main";
import Empty from "../../../components/Empty/Empty";
import ReviewItem from "../../../components/ReviewItem/ReviewItem";
import { observer } from "mobx-react-lite";
import { Loader } from "lucide-react";
import BackBtn from "../../../components/BackBtn/BackBtn";

const CommentsPage = function () {
  useEffect(() => {
    adminStore.fetchOrgReviews();
  }, []);

  const handleUpdateCommentStatus = async (commentId, status) => {
    await productStore.updateCommentStatus(commentId, status);
  };

  if (adminStore.isLoading) {
    return <Loader size={50} />;
  }

  return (
    <>
      <BackBtn />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        {adminStore?.comments.length === 0 ? (
          <Empty text="Новых комментариев нет" />
        ) : (
          <div className="product-grid">
            {adminStore?.comments.map((comment) => (
              <ReviewItem
                key={comment._id}
                review={comment}
                isEditable={
                  store?.user?.role === "admin" ||
                  store?.user?.role === "superadmin"
                }
                onChange={handleUpdateCommentStatus}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default observer(CommentsPage);
