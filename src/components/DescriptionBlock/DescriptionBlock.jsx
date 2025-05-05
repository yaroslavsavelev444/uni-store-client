import React from "react";
import "./DescriptionBlock.css";
export default function DescriptionBlock({ title, description }) {
  return (
    <div className="description-wrapper">
        <div className="description-container">
        <div className="description">
        <h2>{title}</h2>
        <p>{description}</p>
        </div>
        </div>
    </div>
  );
}
