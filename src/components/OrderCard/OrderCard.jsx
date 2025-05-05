import React from 'react';
import './OrderCard.css';
import { API_URL } from '../../http/axios';
import { formatDate } from '../../utils/formatMessageTime';
import { deliveryOptions } from '../../utils/options';

export default function OrderCard({ order }) {
  return (
    <div className="block-background order-card">
      {/* Заголовок */}
      <div className="order-card-header">
        <h2 className="order-card-title">Заказ #{order._id.slice(-6) || '?'} от {formatDate(order.createdAt) || '?'}</h2>
        <span className={`status-badge ${getStatusClass(order.status)}`}>
          {statusLabel(order.status)}
        </span>
      </div>

      {/* Получатель + доставка */}
      <div className="order-recipient">
        <p><strong>Получатель:</strong> {order.recipientData.name} {order.recipientData.phone}</p>
        <p><strong>Способ доставки:</strong> {order.deliveryMethod === 'delivery' ? 'Доставка' : 'Самовывоз'}</p>
        {order.deliveryData?.tk && <p><strong>ТК:</strong> {deliveryOptions.find(option => option.value === order.deliveryData.tk).label}</p>}
        {order.deliveryData?.address && <p><strong>Адрес:</strong> {order.deliveryData.address}</p>}
        {order.deliveryData?.comment && <p><strong>Комментарий:</strong> {order.deliveryData.comment}</p>}
      </div>

      {/* Компания (если есть) */}
      {order.isCompany && order.companyData?.company && (
        <div className="company-info">
          <p className="company-title">Компания: {order.companyData.company.companyName}</p>
          <p>ИНН: {order.companyData.company.inn}, КПП: {order.companyData.company.kpp}</p>
          <p>Банк: {order.companyData.company.bankName}, БИК: {order.companyData.company.bik}</p>
        </div>
      )}

      {/* Продукты */}
      <div className="order-products">
        {order.products.map((item, idx) => (
          <div key={idx} className="order-product">
            <img
              src={`${API_URL}/${item.product?.images[0]}`}
              alt={item.product?.title}
              className="product-image"
            />
            <div className="product-info">
              <h2 className="product-order-title">{item.product?.title}</h2>
              <p className="product-order-quantity">Кол-во: {item.quantity}</p>
                <p>Цена: {item.price}₽</p>
                {item.priceWithDiscount && <p>Скидка: {item.priceWithDiscount}₽</p>}
                <p>Итого: {item.totalPriceWithDiscount || item.totalPrice}₽</p>
            </div>
          </div>
        ))}
      </div>

      {/* Итого */}
      <div className="order-total">
        <h3>Сумма без скидки: <strong>{order.priceDetails.totalPrice}₽</strong></h3>
        <h3>Сумма со скидкой: <strong>{order.priceDetails.totalPriceWithDiscount}₽</strong></h3>
      </div>

      {/* Отмена */}
      {order.status === 'cancelled' && order.cancelData?.cancelReason && (
        <div className="cancel-info">
          <p>Причина отмены: {order.cancelData.cancelReason}</p>
          {order.cancelData.cancelDate && (
            <p className="cancel-date">
              Дата отмены: {new Date(order.cancelData.cancelDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Вспомогательные функции
function getStatusClass(status) {
  switch (status) {
    case 'pending': return 'status-pending';
    case 'confirmed': return 'status-confirmed';
    case 'packed': return 'status-packed';
    case 'sent': return 'status-sent';
    case 'cancelled': return 'status-cancelled';
    case 'rejected': return 'status-rejected';
    default: return 'status-pending';
  }
}

function statusLabel(status) {
  const map = {
    pending: 'В ожидании',
    confirmed: 'Подтвержден',
    rejected: 'Отклонён',
    packed: 'Упакован',
    sent: 'Отправлен',
    cancelled: 'Отменён',
  };
  return map[status] || status;
}