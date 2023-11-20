import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ProductList from '../pages/Product/List';

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.userdata.user);

  return user ? <ProductList /> : children;
};

export default PublicRoute;
