import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header({ isLoggedIn, onLogout }) {
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="flex flex-col items-start mr-2">
            <div className="text-2xl font-bold leading-none">
              <span className="text-blue-600">DS</span>
              <span className="text-yellow-500">&</span>
              <span className="text-blue-600">H</span>
            </div>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
            <li><Link to="/services" className="hover:text-orange-400">Services</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
            <li>
              <Link to="/cart" className="relative hover:text-orange-400 flex items-center">
                <span className="text-xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            {isLoggedIn ? (
              <li><button onClick={onLogout} className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded">Logout</button></li>
            ) : (
              <li><Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;