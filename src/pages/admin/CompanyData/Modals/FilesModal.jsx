import React, { useState } from "react";
import { adminStore, productStore } from "../../../../main";
import { error } from "../../../../utils/logger";
import Button from "../../../../components/Buttons/Button";
import FileItem from "../../../../components/FileItem/FileItem";
import { X } from "lucide-react";
import Loader from "../../../../components/Loader/Loader";
import { showToast } from "../../../../providers/toastService";

export default function FilesModal({ onClose }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    if (uploadedFiles.length >= 5) {
      showToast({ text1: "Максимум 5 файлов", type: "error" });
      return;
    }
    const file = e.target.files[0];
    if (file && uploadedFiles.length < 5) {
      e.target.value = null;
      setUploadedFiles((prev) => [...prev, { file, displayName: "" }]);
    }
    
  };
  const handleUploadFiles = () => {
    if (uploadedFiles.length === 0) return;

    const formData = new FormData();

    uploadedFiles.forEach(({ file, displayName }) => {
      formData.append("files", file);
      formData.append("displayNames", displayName || file.name); // на случай если пользователь не ввёл
    });

    adminStore.uploadFiles(formData, productStore.company._id);
    setUploadedFiles([]);
    onClose();
  };
  const handleDeleteFile = (filePath) => {
    error("handleDeleteFile", filePath);

    adminStore.deleteFile(filePath, productStore.company._id);
  };

  if (productStore.isLoading) {
    return <Loader size={50} />;
  }

  return (
    <div className="inputs-wrapper">
      <h4>Файлы организации (до 5):</h4>
      {uploadedFiles.map((fileObj, index) => (
        <div
          key={index}
          style={{
            marginBottom: 10,
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
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
            <X size={20} color="red" />
          </Button>
        </div>
      ))}
      {uploadedFiles.length < 5 && (
        <>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            style={{ marginTop: "10px" }}
          />
        </>
      )}
      {uploadedFiles.length > 0 && (
        <Button
          onClick={handleUploadFiles}
          disabled={uploadedFiles.length === 0}
        >
          Загрузить
        </Button>
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
  );
}
