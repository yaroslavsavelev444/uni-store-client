import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/Input/Input";
import Checkbox from "../../../components/CheckBox/CheckBox";
import UploadImage from "../../../components/UploadImage/UploadImage";
import Button from "../../../components/Buttons/Button";
import "./UploadPage.css";
import { productStore } from "../../../main";
import { set } from "mobx";

const ProductForm = ({
  product,
  setProduct,
  onSubmit,
  onClose,
  isEdit,
  deletedImages,
  setDeletedImages,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "totalQuantity") {
      const numericValue = value.replace(/\D/g, "");
      const intValue = parseInt(numericValue || "0", 10);

      setProduct((prev) => ({
        ...prev,
        totalQuantity: numericValue,
        isAvailable: intValue > 0,
      }));
      return;
    }

    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAttributes = [...product.customAttributes];
    updatedAttributes[index][name] = value;
    setProduct((prev) => ({
      ...prev,
      customAttributes: updatedAttributes,
    }));
  };

  const addAttribute = () => {
    setProduct((prev) => ({
      ...prev,
      customAttributes: [...prev.customAttributes, { name: "", value: "" }],
    }));
  };

  const removeAttribute = (index) => {
    const updated = product.customAttributes.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, customAttributes: updated }));
  };

  const handleImageUpload = (images) => {
    setProduct((prev) => ({ ...prev, images }));
  };

  const removeImage = (indexToRemove) => {
    const img = product.images[indexToRemove];
    if (typeof img === "string") {
      setDeletedImages((prev) => [...prev, img]);
    }
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, instructionFile: file }));
  };

  const removeInstruction = () => {
    setProduct((prev) => ({ ...prev, instructionFile: null }));
  };

  return (
    <div className="upload-form">
      <h2>{isEdit ? "Редактировать продукт" : "Добавить продукт"}</h2>

      <Input
        name="title"
        value={product.title}
        onChange={handleChange}
        label="Название"
        style={{ width: "100%" }}
      />
      <Input
        name="description"
        value={product.description}
        onChange={handleChange}
        label="Описание"
        style={{ width: "100%" }}
      />
      <Input
        name="priceIndividual"
        value={product.priceIndividual}
        onChange={handleChange}
        label="Цена для физ. лиц"
        style={{ width: "100%" }}
      />

      <Checkbox
        label="Цена для юр. лиц"
        name="hasUridPrice"
        checked={product.hasUridPrice}
        onChange={(e) =>{
            setProduct((prev) => ({ ...prev, hasUridPrice: e.target.checked }));
            setProduct((prev) => ({ ...prev, priceLegalEntity: "" }));
        }
          
        }
      />
      {product.hasUridPrice && (
        <Input
          name="priceLegalEntity"
          value={product.priceLegalEntity}
          onChange={handleChange}
          label="Цена для юр. лиц"
          style={{ width: "100%" }}
        />
      )}

      <Checkbox
        label="Продукт доступен"
        name="isAvailable"
        checked={product.isAvailable}
        onChange={(e) => {
            setProduct((prev) => ({ ...prev, isAvailable: e.target.checked }));
            setProduct((prev) => ({ ...prev, totalQuantity: "" }));
        }
          
        }
      />
      {product.isAvailable && (
        <Input
          name="totalQuantity"
          value={product.totalQuantity}
          onChange={handleChange}
          label="Общее количество"
          style={{ width: "100%" }}
        />
      )}

      <select
        name="categoryId"
        value={product.categoryId || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          {isEdit
            ? productStore.categories.find((c) => c._id === product.categoryId)
                ?.title || "Выберите категорию"
            : "Выберите категорию"}
        </option>

        {productStore.categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.title}
          </option>
        ))}
      </select>
      <Checkbox
        label="Скидки"
        name="hasDiscount"
        checked={product.hasDiscount}
        onChange={(e) =>
          {setProduct((prev) => ({ ...prev, hasDiscount: e.target.checked }));
          setProduct((prev) => ({ ...prev, discountPersentage: "", discountFromQuantity: "" }));
        }
        }
      />
      {product.hasDiscount && (
        <>
          <Input
            name="discountPersentage"
            value={product.discountPersentage}
            onChange={handleChange}
            label="Процент скидки"
            style={{ width: "100%" }}
          />
          <Input
            name="discountFromQuantity"
            value={product.discountFromQuantity}
            onChange={handleChange}
            label="Скидка от количества"
            style={{ width: "100%" }}
          />
        </>
      )}

      <UploadImage
        quantity={10}
        images={product.images}
        onImageUpload={handleImageUpload}
        name="images"
        initialImages={product.images.filter((img) => typeof img === "string")}
        allowImageDelete={(indexToRemove) => {
          setProduct((prevProduct) => ({
            ...prevProduct,
            images: prevProduct.images.filter((_, i) => i !== indexToRemove),
          }));
        }}
      />
      <div className="uploaded-images">
        {product.images.map((img, i) => (
          <div key={i} className="image-wrapper">
            <img
              src={typeof img === "string" ? img : URL.createObjectURL(img)}
              alt=""
            />
            <FontAwesomeIcon icon={faTrash} onClick={() => removeImage(i)} />
          </div>
        ))}
      </div>

      <div className="custom-attributes">
        <h4>Характеристики</h4>
        {product.customAttributes.map((attr, i) => (
          <div key={i} className="attribute-row">
            <Input
              name="name"
              value={attr.name}
              onChange={(e) => handleAttributeChange(i, e)}
              placeholder="Имя"
              style={{ width: "100%" }}
            />
            <Input
              name="value"
              value={attr.value}
              onChange={(e) => handleAttributeChange(i, e)}
              placeholder="Значение"
              style={{ width: "100%" }}
            />
            <Button onClick={() => removeAttribute(i)}>Удалить</Button>
          </div>
        ))}
        <Button onClick={addAttribute}>Добавить характеристику</Button>
      </div>

      <div className="instruction-upload">
        <input type="file" onChange={handleFileChange} />
        {product.instructionFile && (
          <div>
            <span>
              {product.instructionFile.name || "Инструкция загружена"}
            </span>
            <Button onClick={removeInstruction}>Удалить инструкцию</Button>
          </div>
        )}
      </div>

      <div className="btn-vert-wrapper">
        <Button onClick={onSubmit}>
          {isEdit ? "Сохранить изменения" : "Создать"}
        </Button>
        <Button onClick={onClose} variant="secondary">
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
