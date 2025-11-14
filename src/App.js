import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import DesignCatalog from './components/DesignCatalog';
import Header from './components/Header';
import Login from './components/LoginPage';
import Services from './components/Services';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import AdminPortal from './components/AdminPortal';
import DemountableBuilder from './views/demountableBuilder';
import { CartProvider } from './context/CartContext';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header isLoggedIn={!!user} onLogout={handleLogout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/customize/:designId" element={<DemountableBuilder />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/" element={<DesignCatalog />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;