import React, { useEffect, useState } from "react";
import { productStore, store } from "../../main";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import Empty from "../../components/Empty/Empty";
import ImageSlider from "../../components/ImageSlider/ImageSlider";

import "./ItemPage.css"; // Подключаем стили
import Button from "../../components/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faLock } from "@fortawesome/free-solid-svg-icons";
import QuantityRegulator from "../../components/QuantityRegulator/QuantityRegulator";
import CustomFields from "../../components/CustomFields/CustomFields";
import ItemDescription from "../../components/ItemDescription/ItemDescription";
import StockBadge from "../../components/StockBadge/StockBadge";
import ContactSection from "../../components/ContactSection/ContactSection";
import { useToast } from "../../providers/ToastProvider";
import BackBtn from "../../components/BackBtn/BackBtn";
import LeaveReview from "../../components/LeaveReview/LeaveReview";
import ProductReviews from "../../components/ProductReviews/ProductReviews";
import { useAuthAction } from "../../hooks/useAuthAction";
import ContactFormModal from "../../components/ContactFormModal/ContactFormModal";

const ItemPage = () => {
  const { categoryId, id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { showToast } = useToast();
  const authGuard = useAuthAction();
  const increaseQuantity = () => {
    if (quantity < product.totalQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    productStore.fetchItemDetails(id);
  }, [id, categoryId]);

  const product = productStore.currentProduct;

  const addToCart = (event) => {
    event.stopPropagation(); // Останавливаем распространение события на родительский элемент
    authGuard(() => {

    productStore.setCartItem(product._id, quantity, "increase", showToast);
  });
  };

  return (
    <div className="item-page-wrapper">
      <BackBtn />
      {product ? (
        <>
          <h2 style={{ marginTop: "0px" }}>{product.title}</h2>
          <div className="item-page-grid">
            <div className="item-block block-background">
              <ImageSlider images={product.images} />
            </div>

            <div className="item-block block-background">
              {product.customAttributes?.length > 0 && (
                <CustomFields customAttributes={product.customAttributes} />
              )}
            </div>
            <div className="item-block block-background">
              <div className="actions-wrapper">
                <StockBadge
                  isAvailable={product.isAvailable}
                  quantity={product.totalQuantity}
                />
                {product.isAvailable && (
                  <div className="btn-wrapper">
                    <div className="product-actions-column">
                      <QuantityRegulator
                        quantity={quantity}
                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                        max={product.totalQuantity}
                      />
                      <Button onClick={addToCart}>
                        {store.isAuth ? (
                          <FontAwesomeIcon icon={faCartShopping} />
                        ) : (
                          <FontAwesomeIcon icon={faLock} color="red" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="item-block block-background">
              <ItemDescription description={product.description} />
            </div>
          </div>
          {product.hasPurchased && (
            <>
              {!product.isUserLeftReview.hasLeftReview && (
                <LeaveReview productId={product._id} />
              )}
            </>
          )}
          <ProductReviews productId={product._id} reviews={product.reviews} />
        <ContactFormModal  isLoggedIn={store.isAuth}/>
        </>
      ) : (
        <Empty text="Товар не найден" />
      )}
    </div>
  );
};

export default observer(ItemPage);
