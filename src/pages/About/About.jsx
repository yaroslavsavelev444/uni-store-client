import React, { useState } from "react";
import { productStore, store } from "../../main";
import DescriptionBlock from "../../components/DescriptionBlock/DescriptionBlock";
import CommentsShell from "../../components/CommentsShell/CommentsShell";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Buttons/Button";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import { themeOptions } from "../../utils/options";
import { useToast } from "../../providers/ToastProvider";
import { error } from "../../utils/logger";

export default function About() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {showToast} = useToast();
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
    productStore.addOrgReview(reviewData, showToast);
    setIsModalVisible(false);
  };
  return (
    <div className="page-container">
      <DescriptionBlock
        title={"О нас"}
        description={
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit ipsam provident ea fuga ipsum sunt quisquam est vel
            possimus aut. ipsum dolor sit, amet consectetur adipisicing elit.
            Pariatur quibusdam obcaecati accusamus voluptatem doloremque, dicta
            ab eaque aliquid suscipit animi numquam ipsum cupiditate repellendus
            nam possimus rerum quo. Exercitationem, sequi? Laboriosam adipisci
            saepe ullam enim, molestiae consequatur voluptates temporibus unde
            labore tempora quae aliquid distinctio accusantium amet ipsam
            reprehenderit nemo?
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
        {store.isAuth ? (
          <Button onClick={() => setIsModalVisible(true)}>
            Оставить отзыв
          </Button>
        ) : (
          <Button onClick={handleNavigateToLogin}>Войти</Button>
        )}
      </PageHeader>
      <CommentsShell showStatuses={false}/>
      <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <div className="modal-wrapper">
          <h3>Оставить отзыв</h3>
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
