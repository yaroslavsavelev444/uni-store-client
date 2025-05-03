import React from 'react'
import './MenuItem.css'
import { Link } from 'react-router-dom';
export default function MenuItem({label, section}) {
  return (
    <div className="menu-item">
      <Link to={`/admin/${section}`} className="menu-link">
        {label}
      </Link>
    </div>
  );

}
