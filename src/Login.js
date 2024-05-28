import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if ((username === 'admin' && password === 'admin') || (username === 'user' && password === 'user')) {
            setIsLoggedIn({ username, role: username === 'admin' ? 'admin' : 'user' });
            navigate('/');
        } else {
            alert('Đăng nhập không thành công. Vui lòng thử lại.');
        }
    };

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    };

    const handleResetPassword = () => {
        setShowResetPassword(!showResetPassword);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="logo-wrapper">
                <img src="logo192.png" alt="Logo" className="logo" />
            </div>
            <h2 className="login-title">Đăng nhập</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu:</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toggleShowPassword} className="eye-icon" />
                    </div>
                </div>
                <div className="btn-login-wrapper">
                    <button type="submit" className="btn-login">Đăng nhập</button>
                </div>
            </form>
            <div className="additional-links">
                <div onClick={handleForgotPassword} className="forgot-password-link">Quên mật khẩu?</div>
                <div onClick={handleResetPassword} className="reset-password-link">Cấp lại mật khẩu</div>
            </div>
            {showForgotPassword && <ForgotPassword />}
            {showResetPassword && <ResetPassword />}
        </div>
    );
};

export default Login;
