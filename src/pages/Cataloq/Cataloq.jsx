import React, { useEffect } from "react";
import { productStore, store } from "../../main";
import { observer } from "mobx-react-lite";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import { useNavigate } from "react-router-dom";
import Empty from "../../components/Empty/Empty";
import Button from "../../components/Buttons/Button";
import PromoBlock from "../../components/PromoBlock/PromoBlock";
import ContactFormModal from "../../components/ContactFormModal/ContactFormModal";

const Cataloq = () => {
  const navigation = useNavigate();
  useEffect(() => {
    productStore.fetchCategories();
  }, []);

  //Навигация на страницу категории
  const handleCategoryClick = (id) => {
    navigation(`/category/${id}`);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <>
        {productStore.categories.length === 0 ? (
          <Empty text="Категории отсутствуют" />
        ) : (
          <div className="product-grid">
            {productStore.categories.map((category) => (
              <CategoryItem
                key={category._id}
                {...category}
                onClick={() => handleCategoryClick(category._id)}
                productCount={category.productCount}
              />
            ))}
          </div>
        )}
      </>
      {productStore.categories.length > 2 && (
        <div
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
        >
          <Button onClick={() => navigation("/category/all")}>
            Все товары
          </Button>
        </div>
      )}
      <PromoBlock
        title="При заказе от 3 товаров"
        subtitle="Скидка 10%"
        image="/promo/complect.png"
        productId="1"
        reversed
      />
      <ContactFormModal isLoggedIn={store.isAuth} />
    </div>
  );
};

export default observer(Cataloq);
