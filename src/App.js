import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import TrangChu from './TrangChu';
import Upload from './Upload';
import Uploadtext from './Uploadtext';
import ProductPage from './ProductPage';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = ({ username, role }) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Bạn có chắc muốn đăng xuất không?');
    if (confirmLogout) {
      setIsLoggedIn(false);
      setUserRole('');
    }
  };

  return (
    <BrowserRouter basename="/">
      <div className="container">
        <Header isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path='/' element={isLoggedIn ? <TrangChu isAdmin={userRole === 'admin'} /> : <Navigate to="/login" />} />
            <Route path='/login' element={<Login setIsLoggedIn={handleLogin} />} />
            <Route path="/upload" element={isLoggedIn && userRole === 'admin' ? <Upload /> : <Navigate to="/login" />} />
            <Route path="/products" element={isLoggedIn ? <ProductPage /> : <Navigate to="/login" />} />
            <Route path="/uploadtxt" element={isLoggedIn && userRole === 'admin' ? <Uploadtext /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        {isLoggedIn && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
