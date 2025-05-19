import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { store, productStore } from "../../main";
import Button from "../Buttons/Button";
import "./UploadedMaterial.css";
import Modal from "../Modal/Modal";
import MainMaterialForm from "./UploadedMaterial";
import MainMaterialDisplay from "./MainMaterialDisplay";
import { showToast } from "../../providers/toastService";
import Loader from "../Loader/Loader";

const MainMaterialList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
  const fetchMaterials = async () => {
    try {
      await productStore.getMainMaterials();
    } catch (e) {
      showToast({ text1: `Ошибка загрузки материалов ${e}`, type: "error" });
    }
  };
  fetchMaterials();
}, []);

  const handleAddClick = () => {
    setEditingMaterial(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (material) => {
    if (!store.isAuth || store.user?.role == "user") {
      return;
    }
    setEditingMaterial(material);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    productStore.getMainMaterials(); // обновить список после добавления/редактирования
  };

  const isAdmin = store.user?.role !== "user";

  if(productStore.isLoading) {
    return (
       <div className="main-material-wrapper">
        <Loader />
       </div>
    );
  }
  return (
    <div className="main-material-wrapper">
      {isAdmin && store.isAuth && !isFormOpen && productStore.mainMaterials.length === 0 && (
        <div className="plus-wrapper">
          <Button onClick={handleAddClick} className="add-material-btn">
            + Добавить материал
          </Button>
        </div>
      )}

      {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)} isOpen={isFormOpen}>
          <MainMaterialForm
            initialData={editingMaterial}
            onSuccess={handleFormSuccess}
          />
        </Modal>
      )}

      <MainMaterialDisplay handleEditClick={handleEditClick} />
    </div>
  );
};

export default observer(MainMaterialList);