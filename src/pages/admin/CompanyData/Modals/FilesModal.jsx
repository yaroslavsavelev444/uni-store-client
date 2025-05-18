import React, { useState } from 'react'
import { adminStore, productStore } from '../../../../main';
import { error } from '../../../../utils/logger';
import Button from '../../../../components/Buttons/Button';
import FileItem from '../../../../components/FileItem/FileItem';

export default function FilesModal() {
      const [uploadedFiles, setUploadedFiles] = useState([]);
    
    const handleRemoveFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && uploadedFiles.length < 5) {
      setUploadedFiles((prev) => [...prev, { file, displayName: "" }]);
    }
  };
const hanldeUploadFiles = () => {
    if (uploadedFiles.length === 0) return;

    const formData = new FormData();

    uploadedFiles.forEach(({ file, displayName }) => {
      formData.append("files", file);
      formData.append("displayNames", displayName || file.name); // на случай если пользователь не ввёл
    });

    adminStore.uploadFiles(formData, productStore.company._id);
  };
 const handleDeleteFile = (filePath) => {
    error("handleDeleteFile", filePath);

    adminStore.deleteFile(filePath, productStore.company._id);
  };

  return (
    <div className="inputs-wrapper">
          <h4>Файлы организации (до 5):</h4>
          {uploadedFiles.map((fileObj, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <input
                type="text"
                placeholder="Введите название файла"
                value={fileObj.displayName}
                onChange={(e) => {
                  const newFiles = [...uploadedFiles];
                  newFiles[index].displayName = e.target.value;
                  setUploadedFiles(newFiles);
                }}
                style={{ marginRight: 10 }}
              />
              <span>{fileObj.file.name}</span>
              <Button
                onClick={() => handleRemoveFile(index)}
                style={{ marginLeft: 10 }}
              >
                Удалить
              </Button>
            </div>
          ))}
          {uploadedFiles.length <= 5 && (
            <>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                style={{ marginTop: "10px" }}
              />
              {productStore.company?.files?.length >= 5 && (
                <Button
                  onClick={hanldeUploadFiles}
                  disabled={uploadedFiles.length === 0}
                >
                  Загрузить
                </Button>
              )}
            </>
          )}

          {productStore.company?.files?.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h4>Загруженные ранее файлы:</h4>
              {productStore.company.files.map((file, index) => (
                <FileItem
                  key={index}
                  file={file}
                  index={index}
                  handleDeleteFile={handleDeleteFile}
                  isAdmin={true}
                />
              ))}
            </div>
          )}
        </div>
  )
}
