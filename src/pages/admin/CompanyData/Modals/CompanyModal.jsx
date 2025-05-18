import React, { useEffect, useState } from "react";
import { adminStore, productStore } from "../../../../main";
import { observer } from "mobx-react-lite";
import Input from "../../../../components/Input/Input";
import UploadImage from "../../../../components/UploadImage/UploadImage";
import Button from "../../../../components/Buttons/Button";

const defaultCompanyData = {
  _id: null,
  companyName: "",
  workTime: "",
  address: "",
  phone: "",
  email: "",
  description: "",
  image: null,
};

const CompanyModal = observer((onClose) => {
  const existingCompany = productStore?.company || null;
  const [companyData, setCompanyData] = useState(defaultCompanyData);

  useEffect(() => {
    if (existingCompany?._id) {
      setCompanyData({
        _id: existingCompany._id,
        companyName: existingCompany.companyName || "",
        workTime: existingCompany.workTime || "",
        address: existingCompany.address || "",
        phone: existingCompany.phone || "",
        email: existingCompany.email || "",
        description: existingCompany.description || "",
        image: null, // изображение отдельно
      });
    }
  }, [existingCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (newImage) => {
    const image = Array.isArray(newImage) ? newImage[0] : newImage;
    setCompanyData((prev) => ({
      ...prev,
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

    if (companyData._id) {
      await adminStore.editCompany(companyData._id, formData);
    } else {
      await adminStore.addCompany(formData);
    }

    await productStore.fetchCompany();
    setCompanyData(defaultCompanyData);
    onClose();
  };

  const handleDelete = async () => {
    if (companyData._id) {
      await adminStore.deleteCompany(companyData._id);
      await productStore.fetchCompany();
      setCompanyData(defaultCompanyData);
      onClose();
    }
  };

  return (
    <div>
      <h2>{companyData._id ? "Редактировать компанию" : "Добавить компанию"}</h2>

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

        <Button onClick={handleSubmit} disabled={!companyData.companyName}>
          {companyData._id ? "Сохранить изменения" : "Добавить"}
        </Button>

        {companyData._id && (
          <Button onClick={handleDelete} style={{ marginTop: 10 }}>
            Удалить компанию
          </Button>
        )}
      </div>
    </div>
  );
});

export default CompanyModal;