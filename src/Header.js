import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header({ isLoggedIn, userRole, handleLogout }) {
    return (
        <header className="header">
            {isLoggedIn && (
                <nav className="navbar">
                    <div className="nav-left">
                        <NavLink to='/' exact="true" className="nav-item">Trang chủ</NavLink>
                        {userRole === 'admin' && <NavLink to='/upload' className="nav-item">Upload hình ảnh</NavLink>}
                        <NavLink to='/products' className="nav-item">Sản phẩm</NavLink>
                        {userRole === 'admin' && <NavLink to='/uploadtxt' className="nav-item">Upload File</NavLink>}
                    </div>
                    <div className="nav-right">
                        <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;
