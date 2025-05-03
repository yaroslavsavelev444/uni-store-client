import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';  // Подключаем хук useNavigate
import UserItem from './UserItem'
import { Context, store } from '../../../main';
import Button from '../../Buttons/Button';

const UsersList = () => {
  const {adminStore} = useContext(Context);
  const navigate = useNavigate();  // Инициализация хука navigate
  useEffect(() => {
    adminStore.fetchUsers();
  }, [])

  return (
    <div>
      {/* Кнопка назад */}
      <Button onClick={() => navigate(-1)}>Назад</Button>

      {adminStore?.users.map(user => (
        <UserItem key={user._id} user={user} currentUser={store.user} />
      ))}
    </div>
  )
}

export default observer(UsersList);