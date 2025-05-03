import React from 'react'
import MenuItem from '../../components/MenuItem/MenuItem';
import './Admin.css';
export default function Admin() {
  const menuItems = [
    { label: 'Пользователи', section: 'users', apiEndpoint: 'users' },
    { label: 'Заказы', section: 'orders', apiEndpoint: 'orders' },
    { label: 'Комментарии', section: 'comments', apiEndpoint: 'reviews' },
    { label: 'Отзывы', section: 'goods_comments', apiEndpoint: 'goods_comments' },
    { label: 'Консультация', section: 'consult', apiEndpoint: 'contacts' },
    { label: 'Консультации по товару', section: 'consult_goods', apiEndpoint: 'consult_good_page' },
    { label: 'Выгрузка', section: 'upload', apiEndpoint: 'upload' },
    { label: 'Категории', section: 'categories', apiEndpoint: 'categories' },
    { label: 'Товары', section: 'goods', apiEndpoint: 'item_base_info' },
    { label: 'Персонал', section: 'state', apiEndpoint: 'state' },
    { label: 'Контактные данные', section: 'data_org', apiEndpoint: 'data_org' },
  ];

  return (
    <div className="admin-menu">
      <h2>Админ-панель</h2>
      <div className='admin-menu-items'>
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
