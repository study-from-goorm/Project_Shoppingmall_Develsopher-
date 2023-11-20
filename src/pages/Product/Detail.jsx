import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../store/cartSlice.js';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { id } = useParams();
  let items = useSelector((state) => state.cart);
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  useEffect(() => {
    const isItemInCart = items.find((item) => item.id === parseInt(id));
    if (isItemInCart) {
      setCart(true);
    }
  }, [items]);
  const handleAddCart = () => {
    dispatch(addCart(product));
  };

  return (
    <div className="h-screen">
      <Header />
      {product && (
        <main className="h-3/4 p-16 flex gap-4">
          <div className="w-1/2">
            <img
              className="w-5/6 h-full object-contain object-center"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between py-10">
            <div className="space-y-4">
              <h3 className="text-gray-600 text-2xl">{product.category}</h3>
              <h2 className="text-4xl">{product.title}</h2>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                $ <span>{product.price}</span>
              </h2>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>
            <div className="text-lg flex gap-x-10">
              {cart ? (
                <button className="py-2 px-8 border border-gray-500 bg-slate-500 text-white">
                  장바구니에 담긴 제품
                </button>
              ) : (
                <button
                  className="py-2 px-8 border border-gray-500"
                  onClick={handleAddCart}
                >
                  장바구니에 담기
                </button>
              )}
              <button
                className="py-2 px-8 border border-gray-500 bg-slate-500 text-white"
                onClick={() => navigate('/cart')}
              >
                장바구니로 이동
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default ProductDetail;
