import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth, createUserWithEmailAndPassword } from '../firebase.js';
import Header from '../components/Header.jsx';
import config from '../config.js';

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const agreeTermsRef = useRef();

  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const isFormValid = () => {
    return (
      emailRef.current.value !== '' &&
      passwordRef.current.value !== '' &&
      passwordRef.current.value === rePasswordRef.current.value &&
      agreeTermsRef.current.checked
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert('유효성 통과 못함');
      return;
    }
    try {
      setErrorMsg('');
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        emailRef.current.value,
        passwordRef.current.value,
      );
      const user = userCredential.user;
      // 회원가입 후 리디렉션
      navigate('/login');
    } catch (err) {
      switch (err.code) {
        case 'auth/weak-password':
          setErrorMsg('비밀번호는 6자리 이상이어야 합니다');
          break;
        case 'auth/invalid-email':
          setErrorMsg('잘못된 이메일 주소입니다');
          break;
        case 'auth/email-already-in-use':
          setErrorMsg('이미 가입되어 있는 계정입니다');
          break;
      }
    }
  };
  return (
    <>
      <main className="w-1/2 border p-6 shadow-md rounded-lg mx-auto mt-6 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-6">회원가입</h2>
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
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium"
            >
              비밀번호 재확인
            </label>
            <input
              type="password"
              ref={rePasswordRef}
              id="confirmPassword"
              autoComplete="on"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">약관</label>
            <textarea
              value={config.signUpTerm}
              className="p-4 border w-full h-32 text-sm resize-none focus:outline-none focus:ring focus:ring-gray-300"
              readOnly
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="flex justify-end items-center">
              <input
                type="checkbox"
                ref={agreeTermsRef}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="ml-2 text-sm">약관에 동의합니다.</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            회원가입
          </button>
        </form>
      </main>
    </>
  );
}

export default SignUp;
