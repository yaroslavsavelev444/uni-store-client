import { useNavigate } from "react-router-dom";
import "./PromoBlock.css";
import Button from "../Buttons/Button";
import { API_URL } from "../../http/axios";

const PromoBlock = ({
  title = "",
  subtitle = "",
  image = "",
  reversed = false,
  link = "",
  onClick = () => {},
}) => {
  
  // Безопасный обработчик навигации с проверкой
  const handleNavigate = (event) => {
    event.stopPropagation();

    try {
      if (link && typeof link === "string") {
        // Можно дополнительно валидировать ссылку, если нужно
        window.location.href = link;
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  // Проверяем, что image — строка, и безопасно определяем видео по расширению
  const isVideo =
    typeof image === "string" && /\.(mp4|webm|ogg)$/i.test(image.trim());

  // Защита от пустых ссылок и некорректных данных
  const mediaSrc =
    typeof image === "string" && image.trim() !== ""
      ? `${API_URL}${image.trim()}`
      : null;

  return (
    <div className="promo-wrapper" onClick={onClick}>
      <div
        className={`block-background promo-block ${reversed ? "reversed" : ""}`}
      >
        <div className="promo-image">
          {mediaSrc ? (
            isVideo ? (
              <video
                src={mediaSrc}
                controls
                width="100%"
                height="auto"
                preload="metadata"
                // Добавим обработчик ошибки загрузки
                onError={(e) => {
                  e.currentTarget.style.display = "none"; // Скрыть, если ошибка
                  console.error("Video failed to load:", mediaSrc);
                }}
              />
            ) : (
              <img
                src={mediaSrc}
                alt={title || "promo image"}
                onError={(e) => {
                  e.currentTarget.style.display = "none"; // Скрыть, если ошибка
                  console.error("Image failed to load:", mediaSrc);
                }}
              />
            )
          ) : (
            <div
              style={{
                width: "100%",
                height: "150px",
                backgroundColor: "#eee",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#888",
                fontSize: "14px",
              }}
            >
              Нет изображения
            </div>
          )}
        </div>

        <div className="promo-content">
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}

          {(link ) && (
            <Button onClick={handleNavigate}>Подробнее</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoBlock;