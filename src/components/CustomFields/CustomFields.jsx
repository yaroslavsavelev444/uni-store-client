import React from "react";
import "./CustomFields.css";
import Empty from "../Empty/Empty";

export default function CustomFields({ customAttributes }) {
  if (!customAttributes?.length) return null;

  return (
    <ul className="product-attributes">
      {customAttributes.length === 0 ? (
        <Empty text="Нет дополнительных характеристик" />
      ) : (
        <>
        <h2>Характеристики</h2>
          {customAttributes.map((attr, index) => (
            <li key={index}>
              <strong>{attr.name}:</strong> {attr.value}
            </li>
          ))}
        </>
      )}
    </ul>
  );
}
