import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context, productStore } from "../../../main";
import Button from "../../../components/Buttons/Button";
import Modal from "../../../components/Modal/Modal";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Empty from "../../../components/Empty/Empty";
import BackBtn from "../../../components/BackBtn/BackBtn";
import ProductForm from "./ProductForm";
import "./UploadPage.css";
import Loader from "../../../components/Loader/Loader";

const UploadPage = () => {
  const { adminStore } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [deletedImages, setDeletedImages] = useState([]);
  const getEmptyProduct = () => ({
    title: "",
    description: "",
    priceIndividual: "",
    priceLegalEntity: "",
    hasUridPrice: false,
    isAvailable: true,
    hasDiscount: false,
    showOnMainPage: false,
    totalQuantity: "",
    discountPersentage: "",
    discountFromQuantity: "",
    images: [],
    categoryId: null,
    customAttributes: [{ name: "", value: "" }],
    instructionFile: null,
  });
  const [product, setProduct] = useState(getEmptyProduct());

  useEffect(() => {
    productStore.fetchProducts();
    productStore.fetchCategories();
  }, []);

  const openModalAddProduct = () => {
    setProduct(getEmptyProduct());
    setDeletedImages([]);
    setModalContent({ type: "addProduct" });
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
    setDeletedImages([]);
    setModalContent({ type: "editProduct" });
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("productData", JSON.stringify(product));

    product.images.forEach((image) => {
      formData.append("images", image);
    });

    if (product.instructionFile) {
      formData.append("instruction", product.instructionFile);
    }

    await adminStore.addProduct(formData);
    setModalVisible(false);
  };

  const handleEditProductSubmit = () => {
    const formData = new FormData();

    const images = product.images.filter((img) => img instanceof File);
    const existingPaths = product.images.filter(
      (img) => typeof img === "string"
    );

    const productData = {
      ...product,
      images: existingPaths,
    };

    formData.append("productData", JSON.stringify(productData));

    images.forEach((image) => {
      formData.append("images", image);
    });

    if (deletedImages.length > 0) {
      formData.append("deletedImages", JSON.stringify(deletedImages));
    }

    if (product.instructionFile instanceof File) {
      formData.append("instruction", product.instructionFile);
    }

    formData.append("removeInstruction", product.instructionFile === null);

    adminStore.editProduct(product._id, formData);
    setModalVisible(false);
  };

  const ProductGrid = ({ products }) => (
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

  return (
    <>
      <BackBtn />
      <div className="upload-page-wrapper">
        <div className="upload-page">
          {productStore.isLoading ? (
            <Loader size={50} />
          ) : (
            <>
              {productStore.products.length === 0 ? (
                <Empty text="Товары отсутствуют" />
              ) : (
                <ProductGrid products={productStore.products} />
              )}
            </>
          )}
        </div>
        {productStore.categories.length > 0 ? (
          <Button onClick={openModalAddProduct}>Добавить товар</Button>
        ) : (
          <Empty text="Добавьте категорию" />
        )}
        <Modal onClose={() => setModalVisible(false)} isOpen={modalVisible}>
          <ProductForm
            product={product}
            setProduct={setProduct}
            onSubmit={
              modalContent?.type === "editProduct"
                ? handleEditProductSubmit
                : handleSubmit
            }
            isEdit={modalContent?.type === "editProduct"}
            onClose={() => setModalVisible(false)}
            deletedImages={deletedImages}
            setDeletedImages={setDeletedImages}
          />
        </Modal>
      </div>
    </>
  );
};

export default observer(UploadPage);
