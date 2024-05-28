// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    // Xử lý đăng xuất và chuyển hướng người dùng về trang đăng nhập
    useEffect(() => {
        const handleLogout = () => {
            setIsLoggedIn(false); // Đặt trạng thái đăng nhập thành false sau khi đăng xuất
            navigate('/login'); // Chuyển hướng người dùng về trang đăng nhập
        };

        // Gọi hàm xử lý đăng xuất khi component được render
        handleLogout();
    }, [navigate, setIsLoggedIn]);

    // Hiển thị thông báo đăng xuất thành công
    return (
        <div>
            <h2>Bạn đã đăng xuất thành công!</h2>
            <p>Xin chào và hẹn gặp lại!</p>
        </div>
    );
};

export default Logout;
