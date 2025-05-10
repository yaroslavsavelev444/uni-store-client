// components/ZeroMenu.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ZeroMenu.css'; // стили подключим отдельно
import { productStore } from '../../main';

const ZeroMenu = ({ time , address, phone}) => {
  return (
    <div className="zero-menu">
      <div className="zero-container">
        <div className="contact-info">
          <a href="/contacts">{ time}</a>
        </div>
        <div className="social">
          <a href="/contacts">{address}</a>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      </div>
    </div>
  );
};

export default ZeroMenu;