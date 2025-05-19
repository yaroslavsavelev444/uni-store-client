import React, { useEffect, useState } from "react";
import Input from "../../../components/Input/Input";
import UploadImage from "../../../components/UploadImage/UploadImage";
import { adminStore, productStore } from "../../../main";
import CategoryItem from "../../../components/CategoryItem/CategoryItem";
import Empty from "../../../components/Empty/Empty";
import Button from "../../../components/Buttons/Button";
import Modal from "../../../components/Modal/Modal";
import { observer } from "mobx-react-lite";
import "./CategoriesPage.css";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { showToast } from "../../../providers/toastService";
import Loader from "../../../components/Loader/Loader";
import { X } from "lucide-react";

// Начальное состояние категории
const defaultCategory = {
  title: "",
  subTitle: "",
  description: "",
  image: null,
  _id: null,
};

const CategoriesPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [category, setCategory] = useState(defaultCategory);

  useEffect(() => {
    productStore.fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (newImage) => {
    const image = Array.isArray(newImage) ? newImage[0] : newImage;
    setCategory((prev) => ({
      ...prev,
      image,
    }));
  };

  const resetForm = () => {
    setCategory(defaultCategory);
    setModalType(null);
  };

  const closeModal = () => {
    setModalVisible(false);
    resetForm();
  };

  const validateCategory = () => {
    if (!category.title.trim()) {
      showToast({ text1: "Название категории обязательно", type: "error" });
      return false;
    }

    if (category.title.length > 50) {
      showToast({ text1: "Название категории не может превышать 50 символов", type: "error" });
      return false;
    }

    if (category.subTitle && category.subTitle.length > 50) {
      showToast({ text1: "Подзаголовок не может превышать 50 символов", type: "error" });
      return false;
    }

    if (category.description && category.description.length > 200) {
      showToast({ text1: "Описание не может превышать 200 символов", type: "error" });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateCategory()) return;

    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("subTitle", category.subTitle || "");
    formData.append("description", category.description || "");

    if (category.image instanceof File) {
      formData.append("image", category.image);
    }

    if (category._id) {
      adminStore.editCategory(category._id, formData);
    } else {
      adminStore.addCategory(formData);
    }

    closeModal();
  };

  const handleDeleteCategory = () => {
    if (category._id) {
      adminStore.deleteCategory(category._id);
    }
    closeModal();
  };

  const openModalToEdit = (data) => {
    setCategory({
      title: data.title,
      subTitle: data.subTitle,
      description: data.description,
      image: data.image,
      _id: data._id,
    });
    setModalType("edit");
    setModalVisible(true);
  };

  const openModalToAdd = () => {
    resetForm();
    setModalType("add");
    setModalVisible(true);
  };

  if (productStore.isLoading || adminStore.isLoading) {
    return <Loader size={50} />;
  }

  return (
    <>
     <BackBtn />
      <div className="categories-page-wrapper">
      <div className="categories-page">
        {productStore.categories.length === 0 ? (
          <Empty text="Категории отсутствуют" />
        ) : (
          productStore.categories.map((cat) => (
            <CategoryItem
              key={cat._id}
              title={cat.title}
              subTitle={cat.subTitle}
              description={cat.description}
              image={cat.image}
              onClick={() => openModalToEdit(cat)}
            />
          ))
        )}
      </div>

      <Button onClick={openModalToAdd}>Добавить категорию</Button>

      <Modal isOpen={modalVisible} onClose={closeModal}>
        <div className="upload-page-wrapper">
          <h2>{modalType === "edit" ? "Редактировать категорию" : "Добавить категорию"}</h2>
          <div className="form-group">
            <Input
              name="title"
              type="text"
              placeholder="Название категории"
              value={category.title}
              onChange={handleChange}
            />
            <Input
              name="description"
              type="text"
              placeholder="Описание категории (до 200 символов)"
              value={category.description}
              onChange={handleChange}
            />
            <Input
              name="subTitle"
              type="text"
              placeholder="Подзаголовок категории (до 50 символов)"
              value={category.subTitle}
              onChange={handleChange}
            />
            <UploadImage
              quantity={1}
              onImageUpload={handleImageUpload}
              name="image"
              preview={category.image}
            />
            <Button onClick={handleSubmit}>
              {modalType === "edit" ? "Изменить" : "Добавить"}
            </Button>
            {modalType === "edit" && (
              <Button onClick={handleDeleteCategory} className="btn-danger">
                <X size={20} color="red"/>
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
     </>
   
  );
};

export default observer(CategoriesPage);