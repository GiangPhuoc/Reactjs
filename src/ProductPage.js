import React, { useState } from 'react';
import Product from './Product';
import './ProductPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [invoice, setInvoice] = useState(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        const filtered = products.filter(product =>
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const addToCart = (product) => {
        const existingItemIndex = cart.findIndex(item => item.product.description === product.description);
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            updatedCart[existingItemIndex].total += product.price;
            setCart(updatedCart);
        } else {
            setCart([...cart, { product: product, quantity: 1, total: product.price }]);
        }
    };

    const removeFromCart = (product) => {
        const existingItemIndex = cart.findIndex(item => item.product.description === product.description);
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            if (updatedCart[existingItemIndex].quantity > 1) {
                updatedCart[existingItemIndex].quantity -= 1;
                updatedCart[existingItemIndex].total -= product.price;
                setCart(updatedCart);
            } else {
                updatedCart.splice(existingItemIndex, 1);
                setCart(updatedCart);
            }
        }
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        if (!isCartOpen) {
            setOrderDetails({
                items: cart,
                totalPrice: calculateTotalPrice(cart),
            });
        } else {
            setOrderDetails(null);
        }
    };

    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, item) => total + item.total, 0);
    };

    const handleCheckout = () => {
        setInvoice({
            items: cart,
            totalPrice: calculateTotalPrice(cart),
        });
        setCart([]);
        setIsCartOpen(false);
        setOrderDetails(null);
    };

    const handleDeleteInvoice = () => {
        setInvoice(null);
    };

    const handleCancelPurchase = () => {
        setInvoice(null);
        setCart([]);
        setIsCartOpen(false);
        setOrderDetails(null);
    };

    const products = [
        { id: 1, image: 'banh1.jpg', description: 'Bánh 1', price: 18000 },
        { id: 2, image: 'banh2.jpg', description: 'Bánh 2', price: 19000 },
        { id: 3, image: 'banh3.jpg', description: 'Bánh 3', price: 20000 },
        { id: 4, image: 'banh4.jpg', description: 'Bánh 4', price: 25500 },
        { id: 5, image: 'banh5.jpg', description: 'Bánh 5', price: 19500 },
        { id: 6, image: 'banh6.jpg', description: 'Bánh 6', price: 18600 },
        { id: 7, image: 'banh7.jpg', description: 'Bánh 7', price: 17500 },
        { id: 8, image: 'banh8.jpg', description: 'Bánh 8', price: 14200 },
        { id: 9, image: 'keo1.jpg', description: 'Kẹo 9', price: 17500 },
        { id: 10, image: 'banh9.jpg', description: 'Bánh 10', price: 12400 },
        { id: 11, image: 'banh10.jpg', description: 'Bánh 11', price: 25600 },
        { id: 12, image: 'banh11.jpg', description: 'Bánh 12', price: 38500 },
    ];


    return (
        <div className="product-page container">
            <header className="product-header d-flex justify-content-between align-items-center my-3">
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control mr-2"
                />
                <button onClick={handleSearchSubmit} className="btn btn-primary mr-2">Tìm kiếm</button>
                <button onClick={toggleCart} className="btn btn-secondary">Giỏ Hàng ({cart.length})</button>
            </header>

            {isCartOpen && (
                <div className="cart">
                    <h2>Giỏ Hàng</h2>
                    <ul className="list-group mb-3">
                        {cart.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <img src={item.product.image} alt={item.product.description} width="50" />
                                <div>
                                    <div>{item.product.description}</div>
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => removeFromCart(item.product)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => addToCart(item.product)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div>Số tiền: {item.total.toLocaleString('vi-VN')} VNĐ</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {orderDetails && (
                        <div>
                            <h3>Thông tin đơn hàng</h3>
                            <ul className="list-group mb-3">
                                {orderDetails.items.map((item, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>{item.product.description}</div>
                                        <div>Số lượng: {item.quantity}</div>
                                        <div>Số tiền: {item.total.toLocaleString('vi-VN')} VNĐ</div>
                                    </li>
                                ))}
                            </ul>
                            <p>Tổng tiền: {orderDetails.totalPrice.toLocaleString('vi-VN')} VNĐ</p>
                            <button onClick={handleCheckout} className="btn btn-success">Thanh toán</button>
                        </div>
                    )}
                </div>
            )}


            {invoice && (
                <div className="invoice">
                    <h2>Hóa Đơn</h2>
                    <ul className="list-group mb-3">
                        {invoice.items.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>{item.product.description}</div>
                                <div>Số lượng: {item.quantity}</div>
                                <div>Số tiền: {item.total.toLocaleString('vi-VN')} VNĐ</div>
                            </li>
                        ))}
                    </ul>

                    <p>Tổng tiền: {invoice.totalPrice.toLocaleString('vi-VN')} VNĐ</p>
                    <button onClick={handleDeleteInvoice} className="btn btn-primary">In</button>
                    <button onClick={handleCancelPurchase} className="btn btn-danger ml-2">Hủy</button>
                </div>
            )}


            <div className="product-list row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <div key={index} className="product-item">
                            <Product
                                image={product.image}
                                description={product.description}
                                price={product.price}
                            />
                            <button onClick={() => addToCart(product)} className="add-to-cart-button">Thêm vào giỏ hàng</button>
                            <button onClick={() => console.log('Mua sản phẩm:', product.description)} className="buy-now-button">Mua ngay</button>
                        </div>
                    ))
                ) : (
                    products.map((product, index) => (
                        <div key={index} className="product-item col-md-3 col-sm-6 mb-4">
                            <Product
                                image={product.image}
                                description={product.description}
                                price={product.price}
                            />
                            <div className="d-flex justify-content-between">
                                <button onClick={() => addToCart(product)} className="btn btn-warning btn-block mt-2 mr-1">Thêm vào giỏ hàng</button>
                                <button onClick={() => console.log('Mua sản phẩm:', product.description)} className="btn btn-success btn-block mt-2 ml-1">Mua ngay</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default ProductPage;
