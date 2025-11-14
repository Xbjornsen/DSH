import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import DesignCatalog from './components/DesignCatalog';
import Header from './components/Header';
import Login from './components/LoginPage';
import DemountableBuilder from './views/demountableBuilder';
import SpaceBuilder from './views/SpaceBuilder';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={!!user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/space-builder" element={<SpaceBuilder />} />
            <Route path="/customize/:designId" element={<DemountableBuilder />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<DesignCatalog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;