import React, { useState } from 'react';

const UploadImage = ({ onImageUpload, quantity }) => {
  const [imageFiles, setImageFiles] = useState([]);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...imageFiles, ...newFiles].slice(0, quantity); // максимум 10 файлов

    setImageFiles(combinedFiles);
    onImageUpload(combinedFiles);
  };

  const removeImage = (index) => {
    const updated = [...imageFiles];
    updated.splice(index, 1);
    setImageFiles(updated);
    onImageUpload(updated);
  };

  return (
    <div className="upload-image">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        disabled={imageFiles.length >= quantity}
      />
      <div className="image-preview">
        {imageFiles.map((file, index) => (
          <div key={index} className="preview-image-wrapper">
            <img src={URL.createObjectURL(file)} alt={`preview-${index}`} width="100" />
            <button type="button" onClick={() => removeImage(index)}>Удалить</button>
          </div>
        ))}
      </div>
      <p>{imageFiles.length}/{quantity} изображений выбрано</p>
    </div>
  );
};

export default UploadImage;