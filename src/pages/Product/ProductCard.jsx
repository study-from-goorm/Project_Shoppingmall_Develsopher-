import { useNavigate } from 'react-router-dom';
import { addCart } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';
function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCartClick = (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    dispatch(addCart(product));
  };
  return (
    <div
      key={product.id}
      className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform	 hover:-translate-y-6"
      onClick={handleCardClick}
    >
      <img
        className="w-full h-48 object-contain object-center"
        src={product.image}
        alt={product.title}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        <p className="text-gray-500 my-1">${product.price}</p>
        <button
          className="mt-2 py-2 w-full bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={handleAddToCartClick}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
