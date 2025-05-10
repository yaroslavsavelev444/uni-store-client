import React, { useEffect } from "react";
import { productStore } from "../../../main";
import UserCompanyItem from "../../UserCompanyItem/UserCompanyItem";
import Empty from "../../Empty/Empty";
import { observer } from "mobx-react-lite";
import Button from "../../Buttons/Button";
import { log } from "../../../utils/logger";

const UserDataModal = function () {
  useEffect(() => {
    productStore.fetchUserCompanies();
  }, []);

  const handleDeleteCompany = (id) => {
    if(!id) return log("Не передан id");
    productStore.deleteUserCompany(id);
  };

  return (
    <div className="modal-wrapper">
      <h2>Мои данные</h2>
      {productStore.userCompanies.length == 0 ? (
        <Empty text="Компании отсутствуют" />
      ) : (
        <>
          {productStore.userCompanies.map((company) => (
            <UserCompanyItem key={company._id} company={company}  onDelete={handleDeleteCompany}/>
          ))}
        </>
      )}
    </div>
  );
}


export default observer(UserDataModal);