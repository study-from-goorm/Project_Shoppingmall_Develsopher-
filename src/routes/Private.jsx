import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.userdata.user);

  return user ? children : <Login />;
};

export default PrivateRoute;
