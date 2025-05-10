import React, { useEffect, useState } from "react";
import { productStore, store } from "../../main";
import { observer } from "mobx-react-lite";
import Loader from "../../components/Loader/Loader";
import "./Cart.css";
import Step1 from "../../components/OrderSteps/Step1";
import Step2 from "../../components/OrderSteps/Step2";
import Step3 from "../../components/OrderSteps/Step3";
import { useToast } from "../../providers/ToastProvider";
import Step4 from "../../components/OrderSteps/Step4";
import Empty from "../../components/Empty/Empty";
import { NavLink } from "react-router-dom";
import { error } from "../../utils/logger";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({}); // <-- локальное хранилище количеств
  const [step, setStep] = useState(1); // Состояние текущего шага
  const { showToast } = useToast();
  const [order, setOrder] = useState({
    recipientData: {
      name: null,
      phone: null,
    },
    deliveryMethod: null,
    deliveryData: {
      tk: null,
      address: null,
      comment: null,
    },
    isCompany: false,
    companyData: {
      phone: null,
      companyName: null,
      legalAddress: null,
      inn: null,
      kpp: null,
      ogrn: null,
      bankName: null,
      bik: null,
      correspondentAccount: null,
      saveCompany: false,
    },
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      await productStore.fetchCart();
      setLoading(false);
    };
    fetchData();
  }, []);

  const cart = Array.isArray(productStore.cart.items)
    ? productStore.cart.items
    : [];

  // при изменении количества конкретного товара
  const updateQuantity = (id, quantity) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleOrder = () => {
    productStore.createOrder(order, showToast);
    setStep(1);
  };

  const calculateTotalPrice = () => {
  return cart.reduce((acc, item) => {
    const { productId, quantity } = item;
    const {
      priceIndividual,
      discountPersentage = 0,
      discountFromQuantity = 0,
      _id,
    } = productId;

    const actualQuantity = quantities[_id] ?? quantity;

    const hasDiscount = discountPersentage > 0 && discountFromQuantity > 0;
    const applyDiscount = hasDiscount && actualQuantity >= discountFromQuantity;
    const finalPrice = applyDiscount
      ? priceIndividual * (1 - discountPersentage / 100)
      : priceIndividual;

    return acc + finalPrice * actualQuantity;
  }, 0);
};

  const calculateOldTotalPrice = () => {
    return cart.reduce((acc, item) => {
      const { productId, quantity } = item;
      const { priceIndividual, _id } = productId;
      const actualQuantity = quantities[_id] ?? quantity;

      return acc + priceIndividual * actualQuantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();
  const oldTotal = calculateOldTotalPrice();

  const handleNavigaeToItemPage = (categoryId, productId) => {
    if (!categoryId || !productId) {
      error("Не передана категория", categoryId, productId);
      return;
    }

    window.location.href = `/category/${categoryId}/${productId}`;
  };

  const nextStep = () => {
    setStep(step + 1); // Переход к следующему шагу
  };

  const updateOrder = (path, value) => {
    setOrder((prev) => {
      const newOrder = { ...prev };
      const keys = path.split(".");
      let obj = newOrder;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] }; // иммутабельность
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newOrder;
    });
  };

  const handleClearCart = () => {
    productStore.clearCart();
  };
  if (loading) return <Loader size={50} />;

  return (
    <div>
      {store.isAuth ? (
        <>
          {step === 1 && (
            <Step1
              cart={cart}
              totalPrice={totalPrice}
              oldTotal={oldTotal}
              updateQuantity={updateQuantity} // Передаем функцию изменения количества
              onNextStep={nextStep} // Переход на следующий шаг
              handleNavigaeToItemPage={handleNavigaeToItemPage}
              handleClearCart={handleClearCart}
            />
          )}

          {step === 2 && (
            <Step2
              order={order}
              cart={cart}
              updateOrder={updateOrder}
              onNextStep={nextStep}
              onBack={() => setStep(step - 1)}
              showToast={showToast}
            />
          )}

          {step === 3 && (
            <Step3
              order={order}
              cart={cart}
              updateOrder={updateOrder}
              onNextStep={nextStep}
              onBack={() => setStep(step - 1)}
            />
          )}
          {step === 4 && (
            <Step4
              cart={cart}
              prices={[totalPrice, oldTotal]}
              order={order}
              updateOrder={updateOrder}
              onBack={() => setStep(step - 1)}
              handleOrder={handleOrder}
            />
          )}
        </>
      ) : (
        <div style={{flex: 1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <h3>Требуется авторизация</h3>
          <NavLink to="/register">Авторизоваться</NavLink>
        </div>
      )}
    </div>
  );
};

export default observer(Cart);
