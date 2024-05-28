// ForgotPassword.js
import React from 'react';

const ForgotPassword = () => {
    return (
        <div className="forgot-password-container">
            <h3>Quên Mật Khẩu</h3>
            <p>Vui lòng nhập email của bạn để khôi phục mật khẩu.</p>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Gửi Email</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
