import React, { useEffect, useState } from "react";
import { productStore } from "../../../main";
import UserCompanyItem from "../../UserCompanyItem/UserCompanyItem";
import Empty from "../../Empty/Empty";
import { observer } from "mobx-react-lite";
import Button from "../../Buttons/Button";
import { log } from "../../../utils/logger";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import Loader from "../../Loader/Loader";

const UserDataModal = function () {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    productStore.fetchUserCompanies();
  }, []);

  const handleDeleteCompany = (id) => {
    if (!id) return log("Не передан id");
    productStore.deleteUserCompany(id);
  };

  log('productStore.userCompanies', productStore.userCompanies)
  

  return (
    <div className="modal-wrapper">
      <h2>Мои данные</h2>
      {productStore.isLoading ? (
        <Loader size={50} />
      ) : (
        <>
          {productStore.userCompanies.length == 0 ? (
            <Empty text="Компании отсутствуют" />
          ) : (
            <>
              {productStore.userCompanies.map((company) => (
                <UserCompanyItem
                  key={company._id}
                  company={company}
                  onDelete={() => setModalOpen(true)}
                />
              ))}
              <ConfirmModal
                isOpen={modalOpen}
                title="Удалить компанию?"
                text="Вы действительно хотите удалить компанию?"
                confirmLbl="Удалить"
                cancelLbl="Отмена"
                onConfirm={handleDeleteCompany}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default observer(UserDataModal);
