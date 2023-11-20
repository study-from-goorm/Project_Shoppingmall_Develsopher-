import { FaShoppingCart, FaRegUser } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../firebase';
import { clearUser } from '../store/userSlice';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    signOut(firebaseAuth);
  };

  return (
    <nav className="bg-white border-b-2 py-4 px-6 flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate('/')}
      >
        Shop
      </h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <FaShoppingCart className="h-6 w-6 cursor-pointer" />
          {items.length > 0 && (
            <span className="absolute bottom-3 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {items.length}
            </span>
          )}
        </div>
        <FaRegUser className="h-6 w-6 cursor-pointer" />
        <ImExit className="h-6 w-6 cursor-pointer" onClick={handleLogout} />
      </div>
    </nav>
  );
}

export default Header;
