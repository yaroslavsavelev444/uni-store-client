import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context, store } from "../../../main";
import Empty from "../../../components/Empty/Empty";
import { Loader } from "lucide-react";
import BackBtn from "../../../components/BackBtn/BackBtn";

const UsersPage = () => {
  const { adminStore } = useContext(Context);

  useEffect(() => {
    adminStore.fetchUsers();
  }, []);

  if(adminStore.isLoading){
    return <Loader size={50}/>
  }

  return (
    <div>
      <BackBtn />
      {adminStore.users.length === 0 ? (
        <Empty text="Пользователи отсутствуют" />
      ) : (
        <>
          {adminStore?.users.map((user) => (
            <UserItem key={user._id} user={user} currentUser={store.user} />
          ))}
        </>
      )}
    </div>
  );
};

export default observer(UsersPage);