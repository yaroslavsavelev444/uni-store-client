import React, { useEffect, useState } from "react";
import { productStore, store } from "../../main";
import { useNavigate } from "react-router-dom";
import Empty from "../Empty/Empty";
import ProductCard from "../ProductCard/ProductCard";
import { observer } from "mobx-react-lite";
import Loader from "../Loader/Loader";
import SelectMenu from "../SelectMenu/SelectMenu";
import { error } from "../../utils/logger";

const ProductShell = function ({ categoryId = null, showOnMainPage = false }) {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    productStore.fetchProducts(categoryId, selectedValue, showOnMainPage);
  }, [categoryId, showOnMainPage, selectedValue]);

  const handleNavigateToItemPage = (id) => {
    if (!id) return error("Не передан товар");
    navigate(`/category/${categoryId}/${id}`);
  };

  if (productStore.isLoading) {
    return <Loader size={50} />;
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {productStore.products.length === 0 ? (
        <Empty text="Товары отсутствуют" />
      ) : (
        <div style={{ width: "100%" , display: "flex", flexDirection: "column", alignItems: "center"}}>
          {!showOnMainPage && <>
            <SelectMenu
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Сортировать по..."
            showIcons
            options={[
              { value: "date:desc", label: "По дате", direction: "desc" },
              { value: "date:asc", label: "По дате", direction: "asc" },
              { value: "price:desc", label: "По цене", direction: "desc" },
              { value: "price:asc", label: "По цене", direction: "asc" },
            ]}
          />
          </>}

          <div className="product-grid">
            {productStore.products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClickAction={() => handleNavigateToItemPage(product._id)}
                isAuth={store.isAuth}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(ProductShell);
