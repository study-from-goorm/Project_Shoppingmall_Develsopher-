import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from './store/userSlice.js';
import { firebaseAuth } from './firebase.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import ProductList from './pages/Product/List.jsx';
import PrivateRoute from './routes/Private.jsx';
import PublicRoute from './routes/Public.jsx';

function App() {
  const user = useSelector((state) => state.userdata.user);
  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          setUser({
            uid: authUser.uid,
            email: authUser.email,
          }),
        );
        dispatch(setLoading(false));
      } else {
        console.log('user is not logged in');
      }
    });
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default App;
