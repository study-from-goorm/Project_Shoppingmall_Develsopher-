import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  countUp,
  countDown,
  deleteCart,
  resetCart,
} from '../store/cartSlice.js';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Cart() {
  let navigatge = useNavigate();
  let items = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.count, 0);
    setSumPrice(total);
  }, [items]);
  return (
    <>
      <Header />
      <main className="p-8 space-y-6">
        <h2 className="text-3xl text-center font-semibold">Cart</h2>
        {items.length > 0 ? (
          <>
            <ul>
              {items.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="border-b border-b-gray-400  h-36"
                  >
                    <div className="flex items-center justify-between gap-x-8">
                      <div className="flex gap-x-6 flex-1 ">
                        <img
                          className="w-24 h-36 object-contain"
                          src={item.image}
                          alt={item.title}
                        />
                        <div className="py-4 flex flex-col justify-between">
                          <p className="text-gray-400">{item.category}</p>
                          <h2 className="font-bold text-lg">{item.title}</h2>
                          <h3>
                            {item.price} x {item.count} = ${' '}
                            {(item.price * item.count).toFixed(2)}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <button
                          className="border border-gray-400 w-10 h-10"
                          onClick={() => dispatch(countDown(item.id))}
                        >
                          -
                        </button>
                        <p>{item.count}</p>
                        <button
                          className="border border-gray-400 w-10 h-10"
                          onClick={() => dispatch(countUp(item.id))}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <button
                          className="bg-blue-400 py-2 px-4 rounded-md text-white hover:bg-blue-600"
                          onClick={() => dispatch(deleteCart(item.id))}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-16 space-x-4 text-right">
              <button className="text-2xl border bg-amber-200 px-2 py-4">
                합계: ${sumPrice.toFixed(2)}
              </button>
              <button
                className="text-2xl border border-gray-400 px-2 py-4"
                onClick={() => dispatch(resetCart())}
              >
                결제하기
              </button>
            </div>
          </>
        ) : (
          <div className=" flex flex-col justify-center items-center">
            <FaShoppingCart className="w-1/4 h-1/4 text-gray-800 " />
            <h3 className="text-2xl">장바구니가 비었습니다.</h3>
            <button className="hover:underline" onClick={() => navigatge('/')}>
              쇼핑하러 가기
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default Cart;
