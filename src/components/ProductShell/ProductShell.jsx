import React, { useEffect } from "react";
import { productStore } from "../../main";
import { useNavigate } from "react-router-dom";
import Empty from "../Empty/Empty";
import ProductCard from "../ProductCard/ProductCard";
import { observer } from "mobx-react-lite";
import Loader from "../Loader/Loader";

const ProductShell = function ({
  categoryId = null,
  showOnMainPage = false,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    productStore.fetchProducts( categoryId, showOnMainPage);
  }, [categoryId, showOnMainPage]);

  const handleNavigateToItemPage = (id) => {
    if (!id) return console.log("Не передан товар");
    navigate(`/category/${categoryId}/${id}`);
  };
  
  if(productStore.isLoading){
    return <Loader size={50} />
  }

  return (
    <div>
      {productStore.products.length === 0 ? (
        <Empty text="Товары отсутствуют" />
      ) : (
        <div className="product-grid">
          {productStore.products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClickAction={() => handleNavigateToItemPage(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(ProductShell);
