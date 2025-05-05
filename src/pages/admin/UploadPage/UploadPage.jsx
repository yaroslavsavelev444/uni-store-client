import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context, productStore } from "../../../main";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Buttons/Button";
import "./UploadPage.css"; // Стиль для страницы
import UploadImage from "../../../components/UploadImage/UploadImage"; // Компонент для загрузки изображений
import Modal from "../../../components/Modal/Modal";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Empty from "../../../components/Empty/Empty";
import { API_URL } from "../../../http/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import BackBtn from "../../../components/BackBtn/BackBtn";

const UploadPage = () => {
  const { adminStore } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [deletedImages, setDeletedImages] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    priceIndividual: "",
    showOnMainPage: false,
    priceLegalEntity: "",
    isAvailable: true,
    totalQuantity: "",
    discountPersentage: "",
    discountFromQuantity: "",
    images: [],
    categoryId: "",
    customAttributes: [{ name: "", value: "" }],
    instructionFile: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      instructionFile: file, // Сохраняем файл в состоянии
    }));
  };

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Обработчик изменения динамических характеристик
  const handleAttributeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAttributes = [...product.customAttributes];
    updatedAttributes[index][name] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      customAttributes: updatedAttributes,
    }));
  };

  // Функция для добавления новой характеристики
  const addAttribute = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      customAttributes: [
        ...prevProduct.customAttributes,
        { name: "", value: "" },
      ],
    }));
  };

  // Функция для удаления характеристики
  const removeAttribute = (index) => {
    const updatedAttributes = product.customAttributes.filter(
      (_, idx) => idx !== index
    );
    setProduct((prevProduct) => ({
      ...prevProduct,
      customAttributes: updatedAttributes,
    }));
  };

  // Обработчик загрузки изображений
  const handleImageUpload = (images) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: images,
    }));
  };

  // Отправка данных продукта
  const handleSubmit = async () => {
    const formData = new FormData();

    // Добавляем данные продукта как JSON
    formData.append("productData", JSON.stringify(product));

    // Добавляем изображения
    product.images.forEach((image) => {
      formData.append("images", image);
    });

    // Добавляем файл инструкции, если он есть
    if (product.instructionFile) {
      formData.append("instruction", product.instructionFile);
    }

    adminStore.addProduct(formData); // Передаём formData в store
  };

  const openModalAddProduct = (data) => {
    setModalContent({ type: "addProduct", data });
    setModalVisible(true);
  };

  const openModalEditProduct = (data) => {
    setProduct({
      ...data,
      images: data.images || [],
      customAttributes: data.customAttributes?.length
        ? data.customAttributes
        : [{ name: "", value: "" }],
      instructionFile: data.instruction || null,
    });

    setModalContent({ type: "editProduct" });
    setModalVisible(true);
  };

  //Получаем все твоары
  useEffect(() => {
    productStore.fetchProducts();
    productStore.fetchCategories();
  }, []);

  const ProductGrid = ({ products }) => {
    return (
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdmin={true}
            onClickAction={() => openModalEditProduct(product)}
          />
        ))}
      </div>
    );
  };

  const removeImage = (indexToRemove) => {
    const imageToRemove = product.images[indexToRemove];

    if (typeof imageToRemove === "string") {
      setDeletedImages((prev) => [...prev, imageToRemove]);
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeInstruction = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      instructionFile: null,
    }));
  };

  const validateProduct = () => {
    if (!product.title || !product.description || !product.priceIndividual) {
      alert("Заполните обязательные поля");
      return false;
    }
    return true;
  };

  const handleEditProductSubmit = () => {
    if (!validateProduct()) return;

    const formData = new FormData();

    // Отдельно сохраняем пути и файлы
    const images = product.images.filter((img) => img instanceof File);
    const existingImagePaths = product.images.filter(
      (img) => typeof img === "string"
    );

    // Обновлённые данные продукта
    const productData = {
      ...product,
      images: existingImagePaths, // Только пути оставшихся изображений
    };

    formData.append("productData", JSON.stringify(productData));

    // Добавляем новые изображения
    images.forEach((image) => {
      formData.append("images", image);
    });

    if (deletedImages.length > 0) {
      formData.append("deletedImages", JSON.stringify(deletedImages));
    }

    // Инструкция
    if (product.instructionFile instanceof File) {
      formData.append("instruction", product.instructionFile);
    }

    formData.append("removeInstruction", product.instructionFile === null);

    // Отправка
    adminStore.editProduct(product._id, formData);
    setModalVisible(false);
  };

  return (
    <div className="upload-page-wrapper">
       <BackBtn />
      <div className="upload-page">
        {productStore.products.length === 0 && (
          <Empty text={"Товары отсуствуют"} />
        )}
      </div>
      <ProductGrid products={productStore?.products} />
      {productStore.categories.length > 0 ? (
        <Button onClick={() => openModalAddProduct()}>Добавить товар</Button>
      ) : (
        <Empty text={"Добавьте категорию "} /> 
      )}
      <Modal onClose={() => setModalVisible(false)} isOpen={modalVisible}>
        {modalContent?.type === "addProduct" && (
          <>
            <h2>Добавить продукт</h2>
            <div className="form-group">
              <Input
                name="title"
                placeholder="Название продукта"
                value={product.title}
                onChange={handleChange}
              />
              <Input
                name="description"
                placeholder="Описание"
                value={product.description}
                onChange={handleChange}
              />
              <Input
                name="priceIndividual"
                placeholder="Цена для физических лиц"
                value={product.priceIndividual}
                onChange={handleChange}
              />
              <Input
                name="priceLegalEntity"
                placeholder="Цена для юридических лиц"
                value={product.priceLegalEntity}
                onChange={handleChange}
              />
              <Input
                name="totalQuantity"
                placeholder="Общее количество"
                value={product.totalQuantity}
                onChange={handleChange}
              />
              <Input
                name="discountPersentage"
                placeholder="Процент скидки"
                value={product.discountPersentage}
                onChange={handleChange}
              />
              <Input
                name="discountFromQuantity"
                placeholder="Минимальное количество для скидки"
                value={product.discountFromQuantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Категория</label>
              <select
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
              >
                <option value=""disabled selected>Выберите категорию</option>
                {productStore.categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <UploadImage onImageUpload={handleImageUpload} quantity={10} />
            <div className="form-group">
              <label>Загрузите инструкцию (.pdf, .txt, .doc и др.)</label>
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>
            <div className="attributes-section">
              <h3>Характеристики продукта</h3>
              {product.customAttributes.map((attribute, index) => (
                <div className="attribute-item" key={index}>
                  <Input
                    name="name"
                    placeholder="Название характеристики"
                    value={attribute.name}
                    onChange={(e) => handleAttributeChange(index, e)}
                  />
                  <Input
                    name="value"
                    placeholder="Значение характеристики"
                    value={attribute.value}
                    onChange={(e) => handleAttributeChange(index, e)}
                  />
                  <Button onClick={() => removeAttribute(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              ))}
              <Button onClick={addAttribute}>Добавить характеристику</Button>
            </div>

            {/* Кнопка отправки */}
            <Button onClick={handleSubmit}>Добавить продукт</Button>
          </>
        )}
        {modalContent?.type === "editProduct" && (
          <div className="upload-form">
            <h2>Редактировать продукт</h2>

            <Input
              name="title"
              type="text"
              placeholder="Название"
              value={product.title}
              onChange={handleChange}
              style={{width: "100%"}}
            />
            <Input
              name="description"
              type="text"
              placeholder="Описание"
              value={product.description}
              onChange={handleChange}
              style={{width: "100%"}}
            />
            <Input
              name="priceIndividual"
              type="number"
              placeholder="Цена для физ. лиц"
              value={product.priceIndividual}
              onChange={handleChange}
              style={{width: "100%"}}
            />
            <Input
              name="priceLegalEntity"
              type="number"
              placeholder="Цена для юр. лиц"
              value={product.priceLegalEntity}
              onChange={handleChange}
              style={{width: "100%"}}
            />
            <Input
              name="totalQuantity"
              type="number"
              placeholder="Общее количество"
              value={product.totalQuantity}
              onChange={handleChange}
              style={{width: "100%"}}
            />
            <Input
              name="discountPersentage"
              type="number"
              placeholder="% скидки"
              value={product.discountPersentage}
              onChange={handleChange}
              style={{width: "100%"}}
            />
            <Input
              name="discountFromQuantity"
              type="number"
              placeholder="Скидка от кол-ва"
              value={product.discountFromQuantity}
              onChange={handleChange}
              style={{width: "100%"}}
            />

            <label>
              <input
                type="checkbox"
                name="isAvailable"
                checked={product.isAvailable}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    isAvailable: e.target.checked,
                  }))
                }
              />
              Продукт доступен
            </label>

            <label>
              <input
                type="checkbox"
                name="showOnMainPage"
                checked={product.showOnMainPage}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    showOnMainPage: e.target.checked,
                  }))
                }
              />
              Показывать на главной
            </label>

            {/* Категория */}
            <select
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
            >
              <option value="" disabled selected>Выберите категорию</option>
              {productStore.categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>

            {/* Кастомные поля */}
            <h4>Характеристики</h4>
            {product.customAttributes.map((attr, index) => (
              <div
                key={index}
                style={{ display: "flex", gap: "10px", marginBottom: "5px" }}
              >
                <Input
                  name="name"
                  placeholder="Название"
                  value={attr.name}
                  onChange={(e) => handleAttributeChange(index, e)}
                  style={{width: "100%"}}
                />
                <Input
                  name="value"
                  placeholder="Значение"
                  value={attr.value}
                  onChange={(e) => handleAttributeChange(index, e)}
                  style={{width: "100%"}}
                />
                <Button onClick={() => removeAttribute(index)} color="red">
                  <FontAwesomeIcon icon={faTrash} style={{margin: "0"}} color="red" />
                </Button>
              </div>
            ))}
            <Button onClick={addAttribute}>Добавить характеристику</Button>

            {/* Загрузка изображений */}
            <h4>Фотографии</h4>
            <UploadImage
              quantity={10}
              onImageUpload={handleImageUpload}
              name="images"
              initialImages={product.images.filter(
                (img) => typeof img === "string"
              )} // отрисовка старых изображений
              allowImageDelete={(indexToRemove) => {
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  images: prevProduct.images.filter(
                    (_, i) => i !== indexToRemove
                  ),
                }));
              }}
            />

            <div className="image-preview-list">
              {product.images.map((img, index) => (
                <div key={index} className="image-preview-item">
                  <img
                    src={
                      img instanceof File
                        ? URL.createObjectURL(img)
                        : `${API_URL}/${img}` // добавляем API_URL
                    }
                    alt={`Изображение ${index}`}
                    className="image-thumbnail"
                  />
                  <button onClick={() => removeImage(index)}>Удалить</button>
                </div>
              ))}
            </div>

            {/* Загрузка инструкции */}
            <div className="form-group">
              <label>Инструкция:</label>
              {product.instructionFile ? (
                typeof product.instructionFile === "string" ? (
                  <div>
                    <a
                      href={`${API_URL}/${product.instructionFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Скачать инструкцию
                    </a>
                    <Button onClick={removeInstruction}>
                      Удалить инструкцию
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p>{product.instructionFile.name}</p>
                    <Button onClick={removeInstruction}>
                      Удалить инструкцию
                    </Button>
                  </div>
                )
              ) : (
                <>
                  <input
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>

            <Button onClick={handleEditProductSubmit}>
              Сохранить изменения
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default observer(UploadPage);
