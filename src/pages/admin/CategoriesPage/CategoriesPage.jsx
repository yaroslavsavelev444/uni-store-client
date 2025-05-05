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
import { Loader } from "lucide-react";
import BackBtn from "../../../components/BackBtn/BackBtn";
const CategoriesPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [category, setCategory] = useState({
    title: "",
    subTitle: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Обработчик загрузки изображений
  const handleImageUpload = (newImage) => {
    const image = Array.isArray(newImage) ? newImage[0] : newImage;
    setCategory((prevProduct) => ({
      ...prevProduct,
      image,
    }));
  };

  useEffect(() => {
    productStore.fetchCategories();
  }, []);

  const handleDeleteCategory = () => {
    adminStore.deleteCategory(category._id);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("subTitle", category.subTitle);
    formData.append("description", category.description);

    // добавляем только если новое изображение — File
    if (category.image instanceof File) {
      formData.append("image", category.image);
    }

    if (category._id) {
      adminStore.editCategory(category._id, formData);
    } else {
      adminStore.addCategory(formData);
    }

    setModalVisible(false);
    setCategory({
      title: "",
      subTitle: "",
      description: "",
      image: null,
    });
  };

  const openModalCategoryItem = (data) => {
    console.log(data);

    setCategory({
      title: data.title,
      subTitle: data.subTitle,
      description: data.description,
      image: data.image, // строка (путь), не File
      _id: data._id, // для отправки на сервер
    });
    setModalContent({ type: "editCategory" });
    setModalVisible(true);
  };

  const openModalAddCategory = (data) => {
    setModalContent({ type: "addCategory", data });
    setModalVisible(true);
  };

  if(productStore.isLoading || adminStore.isLoading){
    return <Loader size={50}/>
  }

  return (
    <div className="categories-page-wrapper">
     <BackBtn />
      <h2>Категории</h2>
      <div className="categories-page">
        {productStore.categories.length === 0 && (
          <Empty text="Категории отсутствуют" />
        )}
        {productStore.categories.map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            subTitle={category.subTitle}
            description={category.description}
            image={category.image}
            onClick={() => openModalCategoryItem(category)}
          />
        ))}
      </div>
      <Button onClick={() => openModalAddCategory()}>Добавить категорию</Button>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        {modalContent?.type === "addCategory" && (
          <div className="upload-page-wrapper">
            <h2>Добавить категорию</h2>
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
                placeholder="Описание категории"
                value={category.description}
                onChange={handleChange}
              />
              <Input
                name="subTitle"
                type="text"
                placeholder="Подзаголовок категории"
                value={category.subTitle}
                onChange={handleChange}
              />
              <UploadImage
                quantity={1}
                onImageUpload={handleImageUpload}
                name="image"
              />

              <Button onClick={handleSubmit}>Добавить</Button>
            </div>
          </div>
        )}
        {modalContent?.type === "editCategory" && (
          <>
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
              placeholder="Описание категории"
              value={category.description}
              onChange={handleChange}
            />
            <Input
              name="subTitle"
              type="text"
              placeholder="Подзаголовок категории"
              value={category.subTitle}
              onChange={handleChange}
            />
            <UploadImage
              quantity={1}
              onImageUpload={handleImageUpload}
              name="image"
            />
            <Button onClick={handleSubmit}>Изменить</Button>
            <Button onClick={handleDeleteCategory}>Удалить</Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default observer(CategoriesPage);
