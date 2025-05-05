import React, { useEffect } from "react";
import { productStore } from "../../../main";
import { observer } from "mobx-react-lite";
import Empty from "../../Empty/Empty";
import ProductReview from "../../ProductReview/ProductReview";
import Loader from "../../Loader/Loader";

const ReviewModal = () => {
  useEffect(() => {
    productStore.fetchReviews();
  }, []);

  if(productStore.isLoading){
    return <Loader size={50} />
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" , alignItems: "center"}}>
      <h2>Мои отзывы</h2>
      {productStore.reviews.length === 0 ? (
        <Empty text="Отзывы отсутствуют" />
      ) : (
        <>
          {productStore.reviews.map((review) => (
            <ProductReview key={review._id} review={review} />
          ))}
        </>
      )}
    </div>
  );
};

export default observer(ReviewModal);
