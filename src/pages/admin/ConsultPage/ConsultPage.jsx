import React, { useEffect } from "react";
import { adminStore } from "../../../main";
import { observer } from "mobx-react-lite";
import Empty from "../../../components/Empty/Empty";
import ContactItem from "../../../components/ContactItem/ContactItem";
import BackBtn from "../../../components/BackBtn/BackBtn";
import { error } from "../../../utils/logger";
import Loader from "../../../components/Loader/Loader";

const  ConsultPage = function () {
  useEffect(() => {
    adminStore.fetchContacts();
  }, []);

  const handleUpdateContactStatus = async (contactId, status) => {
    if(!contactId || !status){
      error("Не передан контакт");
      return;
    }
      await adminStore.updateContactStatus(contactId, status);
  };

  if(adminStore.isLoading){
    return <Loader size={50}/>
  }
  return (
    <>
    <BackBtn />
    <div style={{display:"flex", flexDirection:"column", width:"100%", alignItems:"center"}}>
      {adminStore.contacts.length === 0 ? (
        <Empty text="Сообщения отсутствуют" />
      ) : (
        <div className="product-grid">
          {adminStore.contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} onAction={handleUpdateContactStatus}/>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default observer(ConsultPage);
