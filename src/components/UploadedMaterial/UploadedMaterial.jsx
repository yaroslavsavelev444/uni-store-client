// components/UploadedMaterial.jsx
import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import PropTypes from 'prop-types';
import './UploadedMaterial.css'; // Стилями займёмся отдельно

const UploadedMaterial = ({ files = [], overlayText = '', buttonText = 'К покупкам', buttonLink = '/catalog' }) => {
  const [textFinished, setTextFinished] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - currentScrollY / 300);
      setScrollOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="uploaded-material-wrapper" style={{ opacity: scrollOpacity, transition: 'opacity 0.3s ease' }}>
      {overlayText && (
        <div className="overlay-text">
          <Typewriter
            words={[overlayText]}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            delaySpeed={1000}
            onLoopDone={() => setTextFinished(true)}
            onType={() => {}}
            onDone={() => setTextFinished(true)}
          />
        </div>
      )}

      <div className="media-content">
        {files.map((file, index) => {
          const extension = file.split('.').pop().toLowerCase();
          if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
            return <img key={index} src={file} alt={`uploaded-${index}`} className="uploaded-image" />;
          } else if (['mp4', 'avi', 'mov', 'wmv', 'mkv'].includes(extension)) {
            return (
              <video
                key={index}
                src={file}
                className="uploaded-video"
                autoPlay
                loop
                muted
                preload="auto"
              />
            );
          }
          return null;
        })}
      </div>

      {textFinished && (
        <a href={buttonLink}>
          <button className="shop-btn">{buttonText}</button>
        </a>
      )}
    </div>
  );
};

UploadedMaterial.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string),
  overlayText: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
};

export default UploadedMaterial;