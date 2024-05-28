import React from 'react';

const Product = ({ image, description, price }) => {
    // Định dạng giá trị với ba số cuối của hàng trăm đồng
    const formattedPrice = price ? (Math.floor(price / 100) * 100).toLocaleString('vi-VN') : 'Không có sẵn';

    return (
        <div className="product">
            <img src={image} alt={description} />
            <h3>{description}</h3>
            {price ? <p>{`Giá: ${formattedPrice} vnđ`}</p> : <p>Giá: Không có sẵn</p>}
        </div>
    );
};

export default Product;
