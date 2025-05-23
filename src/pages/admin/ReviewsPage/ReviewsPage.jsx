import React, { useEffect } from "react";
import { adminStore, store } from "../../../main";
import Empty from "../../../components/Empty/Empty";
import ProductReviews from "../../../components/ProductReviews/ProductReviews";
import { observer } from "mobx-react-lite";
import BackBtn from "../../../components/BackBtn/BackBtn";
import Loader from "../../../components/Loader/Loader";

const ReviewsPage = () => {
  useEffect(() => {
    adminStore.fetchReviews();
  }, []);

  return (
    <div>
      <BackBtn />
      {adminStore.isLoading ? (
        <Loader size={50} />
      ) : (
        <>
          {adminStore.reviews.length === 0 ? (
            <Empty text="Отзывы отсутствуют" />
          ) : (
            <ProductReviews
              reviews={adminStore.reviews}
              role={store.user.role}
            />
          )}
        </>
      )}
    </div>
  );
};

export default observer(ReviewsPage);
