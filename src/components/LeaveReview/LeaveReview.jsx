import React, { useState } from "react";
import "./LeaveReview.css";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import { useToast } from "../../providers/ToastProvider";
import { productStore } from "../../main";
import PageHeader from "../PageHeader/PageHeader";

export default function LeaveReview({ productId }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    productId,
    pros: "",
    cons: "",
    comment: "",
    rating: 0,
  })
  const {showToast} = useToast();

  const handleSubmit = () => {
    if(!reviewData.pros || !reviewData.cons || !reviewData.comment || !reviewData.rating) {
        console.log("Заполните все поля");
        showToast({ text1: "Заполните все поля", type: "error" });
        return;
    }
    productStore.sendOrderReviewData(reviewData, productId, showToast);
    setModalOpen(false);
  };

  return (
    <div style={{margin: '5% 0 '}}>
       <PageHeader title="Вы уже покупали этот товар" ><Button onClick={() => setModalOpen(true)}>Оставить отзыв</Button> </PageHeader>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%"}}>
            <h3>Оставьте отзыв о товаре</h3>

            <label>Плюсы:</label>
            <Input value={reviewData.pros} onChange={(e) => setReviewData({...reviewData, pros: e.target.value})} style={{ width: "100%" }} />

            <label>Минусы:</label>
            <Input value={reviewData.cons} onChange={(e) => setReviewData({...reviewData, cons: e.target.value})} style={{ width: "100%" }} />

            <label>Комментарий:</label>
            <Input
              value={reviewData.comment}
              onChange={(e) => setReviewData({...reviewData, comment: e.target.value})} style={{ width: "100%" }}
            />

            <label>Оценка:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={star <= reviewData.rating ? solidStar : regularStar}
                  className={`star-icon ${star <= reviewData.rating ? "active" : ""}`}
                  onClick={() => setReviewData({...reviewData, rating: star})}
                />
              ))}
            </div>

            <Button onClick={handleSubmit}>Отправить</Button>
          </div>
      </Modal>
    </div>
  );
}
