import React from 'react'
import MenuItem from '../../components/MenuItem/MenuItem';
import './Admin.css';
export default function Admin() {
  const menuItems = [
    { label: 'Пользователи', section: 'users', apiEndpoint: 'users' },
    { label: 'Заказы', section: 'orders', apiEndpoint: 'orders' },
    { label: 'Комментарии', section: 'comments', apiEndpoint: 'comments' },
    { label: 'Отзывы', section: 'reviews', apiEndpoint: 'reviews' },
    { label: 'Консультация', section: 'consult', apiEndpoint: 'contacts' },
    { label: 'Категории', section: 'categories', apiEndpoint: 'categories' },
    { label: 'Товары', section: 'upload', apiEndpoint: 'upload' },
    { label: 'Контактные данные', section: 'data_org', apiEndpoint: 'data_org' },
  ];

  return (
    <div className="admin-menu">
      <h2>Админ-панель</h2>
      <div className='admin-menu-items block-background'>
      {menuItems.map(item => (
        <MenuItem
          key={item.section}
          label={item.label}
          section={item.section}
          apiEndpoint={item.apiEndpoint}
        />
      ))}
      </div>
    </div>
  );
}
