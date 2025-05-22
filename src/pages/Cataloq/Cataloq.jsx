import React, { useEffect } from "react";
import { productStore, store } from "../../main";
import { observer } from "mobx-react-lite";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import { useNavigate } from "react-router-dom";
import Empty from "../../components/Empty/Empty";
import Button from "../../components/Buttons/Button";
import PromoBlock from "../../components/PromoBlock/PromoBlock";
import ContactFormModal from "../../components/ContactFormModal/ContactFormModal";
import Loader from "../../components/Loader/Loader";
import PromoSection from "../../components/PromoBlock/PromoSection";

const Cataloq = () => {
  const navigation = useNavigate();

  useEffect(() => {
    productStore.fetchCategories();
  }, []);

  const handleCategoryClick = (id) => {
    navigation(`/category/${id}`);
  };

  const { categories, isLoading } = productStore;

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
      {isLoading ? (
        <Loader />
      ) : categories.length === 0 ? (
        <Empty text="Категории отсутствуют" />
      ) : (
        <div className="product-grid">
          {categories.map((category) => (
            <CategoryItem
              key={category._id}
              {...category}
              onClick={() => handleCategoryClick(category._id)}
              productCount={category.productCount}
            />
          ))}
        </div>
      )}

      {categories.length >= 2 && (
        <div
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
        >
          <Button onClick={() => navigation("/category/all")}>
            Все товары
          </Button>
        </div>
      )}
      <PromoSection page="cataloq" />
      <ContactFormModal isLoggedIn={store.isAuth} />
    </div>
  );
};

export default observer(Cataloq);
