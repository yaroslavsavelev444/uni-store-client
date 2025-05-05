import React, { useEffect, useState } from "react";
import { productStore } from "../../main";
import Empty from "../../components/Empty/Empty";
import { observer } from "mobx-react-lite";
import Loader from "../../components/Loader/Loader";
import CartItem from "../../components/CartItem/CartItem";
import "./Cart.css";
import Button from "../../components/Buttons/Button";
const Cart = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await productStore.fetchCart();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader size={50} />; // Показываем индикатор загрузки
  }

  const cart = Array.isArray(productStore.cart.items)
    ? productStore.cart.items
    : [];

    const handleNavigaeToItemPage = (categoryId, productId) => {
      if(!categoryId || !productId){
        console.log(categoryId, productId);
        console.log("Не передана категория");
        return;
      }

      const id = `${categoryId}/${productId}`
      window.location.href = `/category/${id}`;
    };

  return (
    <div>
      {cart.length === 0 ? (
        <Empty text="Корзина пуста" />
      ) : (
        <>
          <div className="cart-list">
            {cart.map((product) => (
              <CartItem key={product._id} item={product} onClickAction={handleNavigaeToItemPage}/>
            ))}
            <div className="cart-summary">
              <div className="total-label">
                {productStore.cart.totalPrice} ₽
              </div>
              <Button>Далее</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default observer(Cart);
