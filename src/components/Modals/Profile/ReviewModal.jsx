import React, { useEffect } from "react";
import { productStore, store } from "../../../main";
import { observer } from "mobx-react-lite";
import Empty from "../../Empty/Empty";
import Loader from "../../Loader/Loader";
import ProductReviewItem from "../../ProductReviewItem/ProductReviewItem";

const ReviewModal = () => {

  useEffect(() => {
    productStore.fetchUserReviews();
  }, []);

  if(productStore.isLoading){
    return <Loader size={50} />
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" , alignItems: "center"}}>
      <h2>Мои отзывы</h2>
      {productStore.userReviews.length === 0 ? (
        <Empty text="Отзывы отсутствуют" />
      ) : (
        <>
          {productStore.userReviews.map((review) => (
            <ProductReviewItem key={review._id} review={review}  role={'user'}/>
          ))}
        </>
      )}
    </div>
  );
};

export default observer(ReviewModal);
