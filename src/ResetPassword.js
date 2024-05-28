// ResetPassword.js
import React from 'react';

const ResetPassword = () => {
    return (
        <div className="reset-password-container">
            <h3>Cấp Lại Mật Khẩu</h3>
            <p>Vui lòng nhập mật khẩu mới của bạn để cập nhật.</p>
            <form>
                <div className="form-group">
                    <label htmlFor="new-password">Mật Khẩu Mới:</label>
                    <input type="password" id="new-password" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Xác Nhận Mật Khẩu Mới:</label>
                    <input type="password" id="confirm-password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Cập Nhật Mật Khẩu</button>
            </form>
        </div>
    );
};

export default ResetPassword;
