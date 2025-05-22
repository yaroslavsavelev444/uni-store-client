// components/ProductPrice/ProductPrice.jsx

import { formatPrice } from "../../utils/formatMessageTime";
import "../ProductCard/ProductCard.css";

const ProductPrice = ({ price, discountPercentage = 0, discountFromQuantity = 0 }) => {
  return (
    <div className="product-pricing">
      <span className="price-individual">
        {formatPrice(price)}
      </span>
      {discountPercentage > 0 && discountFromQuantity > 0 && (
        <span className="discount">
          −{discountPercentage}% от {discountFromQuantity} шт.
        </span>
      )}
    </div>
  );
};

export default ProductPrice;