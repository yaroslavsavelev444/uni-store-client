import React, { useContext, useEffect, useState } from "react";
import { Context, productStore } from "../../../main";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Buttons/Button";
import CompanyItem from "../../../components/CompanyItem/CompanyItem";
import Input from "../../../components/Input/Input";
import UploadImage from "../../../components/UploadImage/UploadImage";
import { observer } from "mobx-react-lite";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { API_URL } from "../../../http/axios";
import FileItem from "../../../components/FileItem/FileItem";
import SocialInputBlock from "../../../components/SocialInputBlock/SocialInputBlock";
import { error } from "../../../utils/logger";

const CompanyData = () => {
  const { adminStore } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [socialLinks, setSocialLinks] = useState([{ icon: null, url: "" }]);
  const [companyData, setCompanyData] = useState({
    companyName: "",
    workTime: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (newImage) => {
    const image = Array.isArray(newImage) ? newImage[0] : newImage;
    setCompanyData((prevData) => ({
      ...prevData,
      image,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("companyName", companyData.companyName);
    formData.append("workTime", companyData.workTime);
    formData.append("address", companyData.address);
    formData.append("phone", companyData.phone);
    formData.append("email", companyData.email);
    formData.append("description", companyData.description);

    if (companyData.image instanceof File) {
      formData.append("image", companyData.image);
    }

    if (modalContent?.type === "editCompany") {
      adminStore.editCompany(companyData._id, formData);
      await productStore.fetchCompany();
    } else {
      adminStore.addCompany(formData);
      await productStore.fetchCompany();
    }

    // Очистить форму и закрыть модалку
    setCompanyData({
      companyName: "",
      workTime: "",
      address: "",
      phone: "",
      email: "",
      description: "",
      image: null,
    });
    setModalVisible(false);
  };

  const openModalAddCompanyData = () => {
    setModalContent({ type: "addCompany" });
    setModalVisible(true);
  };

  const openModalEditCompanyData = (data) => {
    setModalContent({ type: "editCompany", data });
    setCompanyData(data); // Заполняем данные для редактирования
    setModalVisible(true);
  };

  useEffect(() => {
    productStore.fetchCompany();
  }, []);

  const handleDelete = async () => {
    await adminStore.deleteCompany(companyData._id);
    await productStore.fetchCompany();
    setModalVisible(false);
  };

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

  const handleAddSocialLink = () => {
    setSocialLinks((prev) => [...prev, { icon: null, url: "" }]);
  };

  const handleRemoveSocialLink = (index) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSocialIconChange = (index, file) => {
    setSocialLinks((prev) => {
      const newLinks = [...prev];
      newLinks[index].icon = file;
      return newLinks;
    });
  };

  const handleSocialUrlChange = (index, url) => {
    setSocialLinks((prev) => {
      const newLinks = [...prev];
      newLinks[index].url = url;
      return newLinks;
    });
  };

  const handleSubmitSocialLinks = () => {
    const validLinks = socialLinks.filter((link) => link.icon && link.url);
    if (validLinks.length === 0) return;

    const formData = new FormData();
    validLinks.forEach(({ icon, url }) => {
      formData.append("icon", icon);
      formData.append("url", url);
    });

    adminStore.addSocialLinks(formData, productStore.company._id);
  };

  return (
    <div>
      <BackBtn />
      <h2>Компания</h2>
      <div className="inputs-wrapper">
        {productStore?.company?._id ? (
          <CompanyItem
            key={productStore.company._id}
            company={productStore.company}
            onClick={openModalEditCompanyData}
          />
        ) : (
          <Button onClick={openModalAddCompanyData}>Добавить компанию</Button>
        )}
      </div>
      <div>
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
      </div>

      <SocialInputBlock
        socialLinks={socialLinks}
        handleSocialIconChange={handleSocialIconChange}
        handleSocialUrlChange={handleSocialUrlChange}
        handleAddSocialLink={handleAddSocialLink}
        handleRemoveSocialLink={handleRemoveSocialLink}
        handleSubmitSocialLinks={handleSubmitSocialLinks}
        store={productStore}
      />

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <h3>
          {modalContent?.type === "addCompany"
            ? "Добавить компанию"
            : "Редактировать компанию"}
        </h3>
        <div className="inputs-wrapper">
          <Input
            name="companyName"
            type="text"
            placeholder="Название компании"
            value={companyData.companyName}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
          <Input
            name="workTime"
            type="text"
            placeholder="Время работы"
            value={companyData.workTime}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
          <Input
            name="address"
            type="text"
            placeholder="Адрес"
            value={companyData.address}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
          <Input
            name="phone"
            type="text"
            placeholder="Телефон"
            value={companyData.phone}
            onChange={handleChange}
            style={{ width: "100%" }}
            mask={"+7(999)9999999"}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={companyData.email}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
          <Input
            name="description"
            type="text"
            placeholder="Описание компании"
            value={companyData.description}
            onChange={handleChange}
            style={{ width: "100%" }}
          />

          <UploadImage
            onImageUpload={handleImageUpload}
            quantity={1}
            name="image"
          />

          <Button onClick={handleSubmit}>
            {modalContent?.type === "addCompany"
              ? "Добавить"
              : "Сохранить изменения"}
          </Button>
          {modalContent?.type === "editCompany" && (
            <Button onClick={handleDelete}>Удалить</Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default observer(CompanyData);
