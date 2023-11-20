import { Link } from 'react-router-dom';
import { FaShoppingCart, FaRegUser } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../firebase';
import { clearUser } from '../store/userSlice';
import { signOut } from 'firebase/auth';
function Header() {
  const user = useSelector((state) => state.userdata.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    signOut(firebaseAuth);
  };
  return (
    <nav className="bg-white border-b-2 py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">Shop</h1>
      <div className="flex items-center space-x-4">
        {/* <span>{user.email}</span> */}
        <FaShoppingCart className="h-6 w-6 cursor-pointer" />
        <FaRegUser className="h-6 w-6 cursor-pointer" />
        <ImExit className="h-6 w-6 cursor-pointer" onClick={handleLogout} />
      </div>
    </nav>
  );
}

export default Header;
