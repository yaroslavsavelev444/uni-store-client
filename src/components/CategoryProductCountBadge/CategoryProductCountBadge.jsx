import React from 'react';
import './CategoryProductCountBadge.css';
import { CheckCircle, XCircle } from 'lucide-react';

export default function CategoryProductCountBadge({ count }) {
  const hasProducts = count > 0;

  return (
    <div className={`category-badge ${hasProducts ? 'has-products' : 'no-products'}`}>
      {hasProducts ? (
        <>
          <CheckCircle size={18} />
          <span>Товаров в категории: {count}</span>
        </>
      ) : (
        <>
          <XCircle size={18} />
          <span>Нет товаров</span>
        </>
      )}
    </div>
  );
}