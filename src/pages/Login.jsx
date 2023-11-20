import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice.js';
import Header from '../components/Header.jsx';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { firebaseAuth } from '../firebase.js';
function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const isFormValid = () => {
    return emailRef.current.value !== '' && passwordRef.current.value !== '';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert('유효성 통과 못함');
      return;
    }

    signInWithEmailAndPassword(
      firebaseAuth,
      emailRef.current.value,
      passwordRef.current.value,
    ).catch((err) => {
      alert(err);
    });
  };

  return (
    <>
      <main className="w-1/2 border p-6 shadow-md rounded-lg mx-auto mt-6 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-6">로그인</h2>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              이메일
            </label>
            <input
              type="email"
              ref={emailRef}
              id="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              비밀번호
            </label>
            <input
              type="password"
              ref={passwordRef}
              id="password"
              autoComplete="on"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 mb-4"
          >
            로그인
          </button>
          <div className="text-center">
            <small>가입한 계정이 없으신가요?</small>
            <button className="text-gray-600 ml-2 text-sm hover:underline">
              <Link to="/register">회원가입</Link>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Login;
