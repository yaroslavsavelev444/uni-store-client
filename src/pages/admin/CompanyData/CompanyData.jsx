import React, { useContext, useEffect, useState } from "react";
import { Context, productStore } from "../../../main";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Buttons/Button";
import CompanyItem from "../../../components/CompanyItem/CompanyItem";
import Input from "../../../components/Input/Input";
import UploadImage from "../../../components/UploadImage/UploadImage";
import { observer } from "mobx-react-lite";

const CompanyData = () => {
  const { adminStore } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

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
    setCompanyData(data);  // Заполняем данные для редактирования
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

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Назад</Button>
      <h2>Категории</h2>
      <div className="inputs-wrapper">
        {productStore?.company?._id ? (
          <CompanyItem key={productStore.company._id} company={productStore.company} onClick={openModalEditCompanyData} />
        ) : (
          <Button onClick={openModalAddCompanyData}>Добавить компанию</Button>
        )}
      </div>


      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <h3>{modalContent?.type === "addCompany" ? "Добавить компанию" : "Редактировать компанию"}</h3>
        <div className="inputs-wrapper">
        <Input
          name="companyName"
          type="text"
          placeholder="Название компании"
          value={companyData.companyName}
          onChange={handleChange}
          style={{width: '100%'}}
        />
        <Input
          name="workTime"
          type="text"
          placeholder="Время работы"
          value={companyData.workTime}
          onChange={handleChange}
          style={{width: '100%'}}
        />
        <Input
          name="address"
          type="text"
          placeholder="Адрес"
          value={companyData.address}
          onChange={handleChange}
           style={{width: '100%'}}
        />
        <Input
          name="phone"
          type="text"
          placeholder="Телефон"
          value={companyData.phone}
          onChange={handleChange}
           style={{width: '100%'}}
           mask={'+7(999)9999999'}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={companyData.email}
          onChange={handleChange}
           style={{width: '100%'}}
        />
        <Input
          name="description"
          type="text"
          placeholder="Описание компании"
          value={companyData.description}
          onChange={handleChange}
           style={{width: '100%'}}
        />

        <UploadImage onImageUpload={handleImageUpload} quantity={1} name="image" />

        <Button onClick={handleSubmit}>
          {modalContent?.type === "addCompany" ? "Добавить" : "Сохранить изменения"}
        </Button>
         {modalContent?.type === "editCompany" && <Button onClick={handleDelete}>Удалить</Button>}
        </div>
      </Modal>
    </div>
  );
}

export default observer(CompanyData);