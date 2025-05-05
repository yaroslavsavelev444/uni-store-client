import React from 'react';
import './StockBadge.css';
import { CheckCircle, XCircle } from 'lucide-react';

export default function StockBadge({ isAvailable, quantity }) {
  return (
    <div className={`stock-badge ${isAvailable ? 'in-stock' : 'out-of-stock'}`}>
      {isAvailable ? (
        <>
          <CheckCircle size={18} />
          <span>В наличии: {quantity} шт.</span>
        </>
      ) : (
        <>
          <XCircle size={18} />
          <span>Нет в наличии</span>
        </>
      )}
    </div>
  );
}