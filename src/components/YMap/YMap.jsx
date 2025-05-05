import React, { useEffect, useRef, useState } from 'react';
import './YMap.css';

const YandexMap = () => {
  const [isActive, setIsActive] = useState(false);
  const mapRef = useRef(null);

  // Обработка клика вне карты
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`map-container ${isActive ? 'active' : ''}`}
      ref={mapRef}
      onClick={() => setIsActive(true)}
    >
      <iframe
        title="yandex-map"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Aba76c403644e6dfb2686e6fad6b139a32079d8b1b267c5079fb94b3ff1fa621e&source=constructor"
        width="100%"
        height="400"
        frameBorder="0"
      />
      {!isActive && <div className="map-overlay"><h2 style={{color:"black"}}>Нажмите для активации</h2></div>}
    </div>
  );
};

export default YandexMap;