import React, { useEffect, useState } from "react";
import { productStore, store } from "../../main";
import DescriptionBlock from "../../components/DescriptionBlock/DescriptionBlock";
import CommentsShell from "../../components/CommentsShell/CommentsShell";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Buttons/Button";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import { themeOptions } from "../../utils/options";
import { error, log } from "../../utils/logger";
import { observer } from "mobx-react-lite";

const About = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reviewData, setReviewData] = useState({
    theme: "",
    comment: "",
  });
  const handleNavigateToLogin = () => {
    window.location.href = "/register";
  };

  const handleSendReview = () => {
    if (!reviewData.theme || !reviewData.comment) {
      error("Не все поля заполнены");
      return;
    }
    productStore.addOrgReview(reviewData);
    setIsModalVisible(false);
  };

  useEffect(() => {
      productStore.fetchOrgReviews();
    }, []);

    log("orgReviews", productStore.orgReviews);

    const hasUserReview = productStore.orgReviews?.some(
  review => review.userId === store.user.id
);
log("hasUserReview", hasUserReview);

  return (
    <div className="page-container">
      <DescriptionBlock
        title={"О нас"}
        description={
          <p>
            Наша компания специализируется на разработке систем противодействия
            беспилотным летательным аппаратам (БпЛА). Мы создаем устройства
            нейтрализации дронов с использованием физических методов, таких как
            захват сетью или таран. В сферу наших компетенций входят разработка
            сложных алгоритмов наведения и навигации в условиях радиоэлектронной
            борьбы (РЭБ), а также автономных дронов, способных выполнять задачи
            по перехвату целей.
          </p>
        }
      />
      <PageHeader
        title={
          store.isAuth
            ? "Делали покупки у нас?"
            : "Войдите, чтобы оставить отзыв"
        }
      >
       {!store.isAuth ? (
  <Button onClick={handleNavigateToLogin}>Войти</Button>
) : !hasUserReview ? (
  <Button onClick={() => setIsModalVisible(true)}>
    Оставить отзыв
  </Button>
) : null}
      </PageHeader>
      <CommentsShell showStatuses={false} />
      <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <div className="modal-wrapper">
          <h2>Оставить отзыв</h2>
          <SelectMenu
            value={reviewData.theme}
            options={themeOptions}
            onChange={(e) => setReviewData({ ...reviewData, theme: e })}
            placeholder="Выбрать тему"
          />
          <div className="input-wrapper">
            <textarea
              id="msg"
              name="msg"
              placeholder="Ваше сообщение:"
              required
              className="form-input resize-none"
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData({ ...reviewData, comment: e.target.value })
              }
            />
          </div>
          <Button
            disabled={!reviewData.theme || !reviewData.comment}
            onClick={handleSendReview}
          >
            {productStore.isLoading ? <Loader /> : "Отправить"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default observer(About);