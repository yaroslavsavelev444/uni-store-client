import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typewriter } from 'react-simple-typewriter';
import { observer } from 'mobx-react-lite';
import { store, adminStore } from '../../main'; // путь под себя
import axios from 'axios';
import './UploadedMaterial.css';
import Modal from '../Modal/Modal';
import Button from '../Buttons/Button';

const UploadedMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState('');

  const fetchMaterials = async () => {
    try {
      const res = await axios.get('/api/materials');
      setMaterials(res.data || []);
    } catch (error) {
      console.error('Ошибка при получении материалов:', error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('caption', caption);

    try {
      await adminStore.uploadMaterial(formData);
      setIsModalOpen(false);
      setFiles([]);
      setCaption('');
      await fetchMaterials(); // обновить список после отправки
    } catch (error) {
      console.error('Ошибка отправки материалов:', error);
    }
  };

  const renderMedia = () =>
    materials.map((item, index) => {
      const { url, caption } = item;
      const ext = url.split('.').pop().toLowerCase();

      if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
        return <img key={index} src={url} alt={`material-${index}`} className="uploaded-image" />;
      } else if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) {
        return (
          <video
            key={index}
            src={url}
            className="uploaded-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        );
      }

      return null;
    });

  const isAdmin = store.userRole === 'admin';

  return (
    <div className="uploaded-material-wrapper">
      {materials.length === 0 && isAdmin && (
        <button className="add-material-btn" onClick={() => setIsModalOpen(true)}>+</button>
      )}

      <div className="media-content">{renderMedia()}</div>

      {materials.length > 0 && materials[0]?.caption && (
        <div className="overlay-text">
          <Typewriter
            words={[materials[0].caption]}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            delaySpeed={1000}
          />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}

      >
        <form onSubmit={handleSubmit}>
          <label>Загрузите фото/видео:</label>
          <input type="file" accept="image/*,video/*" multiple onChange={handleFileChange} />

          <label>Подпись:</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            placeholder="Введите подпись..."
          />

          <Button  type="submit" className="submit-btn"> Отправить </Button>
        </form>
      </Modal>
    </div>
  );
};

UploadedMaterial.propTypes = {
  role: PropTypes.string,
};

export default observer(UploadedMaterial);