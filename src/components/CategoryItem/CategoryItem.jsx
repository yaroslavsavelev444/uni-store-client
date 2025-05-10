import React from "react";
import "./CategoryItem.css";
import { API_URL } from "../../http/axios";
import CategoryProductCountBadge from "../CategoryProductCountBadge/CategoryProductCountBadge";

const truncate = (text, maxLength = 50) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const CategoryItem = ({
  title = "",
  subTitle = "",
  description = "",
  image,
  onClick,
  productCount = 0,
}) => {
  return (
    <div className="category-card block-background" onClick={onClick}>
      <img
        src={image ? `${API_URL}/${image}` : "/fallback.jpg"}
        alt={title || "Изображение категории"}
        className="category-image"
      />
      <div className="category-content">
        <h2 className="category-title">{truncate(title, 40)}</h2>
        <h4 className="category-subtitle">{truncate(subTitle, 40)}</h4>
        <p className="category-description">{truncate(description, 60)}</p>
         <CategoryProductCountBadge count={productCount} />
      </div>
    </div>
  );
};

export default CategoryItem;