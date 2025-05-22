import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { productStore } from "../../../main";
import Empty from "../../Empty/Empty";
import OrderCard from "../../OrderCard/OrderCard";
import Loader from "../../Loader/Loader";

const OrderModal = () => {
  useEffect(() => {
    productStore.fetchOrders();
  }, []);

  if (productStore.isLoading) {
    return <Loader size={50} />;
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <h2>Мои заказы</h2>
      {productStore.orders.length === 0 ? (
        <Empty text="Отзывы отсутствуют" />
      ) : (
        <>
          {productStore.orders.map((order) => (
            <OrderCard key={order._id} order={order} role={'user'} />
          ))}
        </>
      )}
    </div>
  );
};

export default observer(OrderModal);
