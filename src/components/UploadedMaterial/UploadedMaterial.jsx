import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typewriter } from 'react-simple-typewriter';
import './UploadedMaterial.css';

const UploadedMaterial = () => {
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    fetch('/materials.json')
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        setCaption(data.caption || '');
      })
      .catch((err) => console.error('Ошибка загрузки materials.json:', err));
  }, []);

  const renderMedia = () =>
    files.map((fileUrl, index) => {
      const ext = fileUrl.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
        return <img key={index} src={fileUrl} alt={`uploaded-${index}`} className="uploaded-image" />;
      } else if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) {
        return (
          <video
            key={index}
            src={fileUrl}
            className="uploaded-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{width:'100%'}}
          />
        );
      }
      return null;
    });

  return (
    <div className="uploaded-material-wrapper">
      <div className="media-content">{renderMedia()}</div>

      {caption && (
        <div className="overlay-text">
          <Typewriter
            words={[caption]}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            delaySpeed={1000}
          />
        </div>
      )}
    </div>
  );
};

UploadedMaterial.propTypes = {
  role: PropTypes.string.isRequired,
};

export default UploadedMaterial;