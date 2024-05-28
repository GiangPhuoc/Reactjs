import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>&copy;Copyright Giang Phước {new Date().getFullYear()} Công ty của bạn. Mọi quyền được bảo lưu.</p>
        </footer>
    );
}

export default Footer;
