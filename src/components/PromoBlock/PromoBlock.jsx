import { useNavigate } from "react-router-dom";
import "./PromoBlock.css"; // подключи стили по своему пути
import Button from "../Buttons/Button";
import { log } from "../../utils/logger";
import { API_URL } from "../../http/axios";

const PromoBlock = ({
  title,
  subtitle,
  image,
  productId,
  reversed = false,
  link,
  onClick,
}) => {
  const navigate = useNavigate();

  
  const handleNavigate = (event) => {
      event.stopPropagation();
    if (link) {
      window.location.href = link;
    } else if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  log(`${API_URL}${image}`);

  return (
    <div className="promo-wrapper" onClick={onClick}>
      <div
        className={`block-background promo-block ${reversed ? "reversed" : ""}`}
      >
        <div className="promo-image">
          <img src={`${API_URL}${image}`} alt={title} />
        </div>
        <div className="promo-content">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <Button onClick={handleNavigate}>Подробнее</Button>
        </div>
      </div>
    </div>
  );
};

export default PromoBlock;
