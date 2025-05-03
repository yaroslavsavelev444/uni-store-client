import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../main';

const ProtectedRoute = observer(({ element }) => {
  const { store } = useContext(Context);

  if (!store?.isAuth || !(store?.user?.role === 'admin' || store?.user?.role === 'superadmin')) {
    // Если пользователь не авторизован или не является админом, перенаправляем его на страницу входа
    return <Navigate to="/auth" />;
  }

  return element; // Просто возвращаем переданный элемент
});

export default ProtectedRoute;