import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { adminStore, store } from "../../../main";
import Empty from "../../../components/Empty/Empty";
import OrderCard from "../../../components/OrderCard/OrderCard";
import BackBtn from "../../../components/BackBtn/BackBtn";
import Loader from "../../../components/Loader/Loader";

const OrdersPage = () => {

  useEffect(() => {
    adminStore.fetchOrders();
  }, []);


  if (adminStore.isLoading) {
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
      <BackBtn />
      <h2>Заказы</h2>
      {adminStore.orders.length === 0 ? (
        <Empty text="Отзывы отсутствуют" />
      ) : (
        <>
          {adminStore.orders.map((order) => (
            <OrderCard key={order._id} order={order} role={store.user.role}/>
          ))}
        </>
      )}
    </div>
  );
};

export default observer(OrdersPage);
