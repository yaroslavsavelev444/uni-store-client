import React from 'react';
import { Link } from 'react-router-dom';
import './VisitTimeline.css';

export default function VisitTimeline() {
  const visits = JSON.parse(localStorage.getItem('visitTimeline') || '[]');

  if (!visits.length) return null;

  return (
    <div className="visit-timeline">
      <ul>
        {visits.map((visit, i) => {
          const categoryLink = `/category/${visit.categoryId}`;
          const itemLink = visit.itemId ? `${categoryLink}/${visit.itemId}` : categoryLink;

          return (
            <li key={i}>
              <Link to={itemLink}>{visit.label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}