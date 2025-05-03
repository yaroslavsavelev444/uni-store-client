import React from "react";
import "./CategoryItem.css";
import { API_URL } from "../../http/axios";

const CategoryItem = ({ title, subTitle, description, image, onClick}) => {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={`${API_URL}/${image}`} alt={title} className="category-image" />
      <div className="category-content">
        <h2 className="category-title">{title}</h2>
        <h4 className="category-subtitle">{subTitle}</h4>
        <p className="category-description">{description}</p>
      </div>
    </div>
  );
};

export default CategoryItem;