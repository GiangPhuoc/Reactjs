import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TrangChu.css';  // Import the CSS file

function TrangChu({ isAdmin }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState({
        title: isAdmin ? "Đây là thông tin ở trang chủ dành cho admin" : "Đây là thông tin ở trang chủ dành cho user",
        paragraph1: "React là một thư viện JavaScript phổ biến được sử dụng để xây dựng giao diện người dùng.",
        paragraph2: "Nó cung cấp một cách linh hoạt và hiệu quả để phát triển các ứng dụng web tương tác.",
        paragraph3: "Để tìm hiểu thêm về React, bạn có thể truy cập trang web chính thức của ReactJS: ",
        link1: "https://reactjs.org",
        paragraph4: "Hoặc đọc các tài liệu và hướng dẫn trên trang GitHub của React: ",
        link2: "https://github.com/facebook/react"
    });

    useEffect(() => {
        setContent(prevContent => ({
            ...prevContent,
            title: isAdmin ? "Đây là thông tin ở trang chủ dành cho admin" : "Đây là sản phẩm hot nhất trong tuần"
        }));
    }, [isAdmin]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent(prevContent => ({
            ...prevContent,
            [name]: value
        }));
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Here you can add any logic to save the content to a server or local storage
    };

    return (
        <div className="slider-container">
            {isEditing ? (
                <div className="title-edit-container">
                    <input
                        type="text"
                        name="title"
                        value={content.title}
                        onChange={handleChange}
                        className="title-edit-input"
                    />
                </div>
            ) : (
                <h2 className="title">{content.title}</h2>
            )}
            <div className="slider">
                <Slider {...settings}>
                    <div>
                        <img src="banh1.jpg" alt="Slide 1" className="image" />
                    </div>
                    <div>
                        <img src="banh2.jpg" alt="Slide 2" className="image" />
                    </div>
                    <div>
                        <img src="banh3.jpg" alt="Slide 3" className="image" />
                    </div>
                </Slider>
            </div>
            {isEditing ? (
                <div className="content-edit-container">
                    <textarea
                        name="paragraph1"
                        value={content.paragraph1}
                        onChange={handleChange}
                        className="content-edit-input"
                    />
                    <textarea
                        name="paragraph2"
                        value={content.paragraph2}
                        onChange={handleChange}
                        className="content-edit-input"
                    />
                    <textarea
                        name="paragraph3"
                        value={content.paragraph3}
                        onChange={handleChange}
                        className="content-edit-input"
                    />
                    <input
                        type="text"
                        name="link1"
                        value={content.link1}
                        onChange={handleChange}
                        className="link-edit-input"
                    />
                    <textarea
                        name="paragraph4"
                        value={content.paragraph4}
                        onChange={handleChange}
                        className="content-edit-input"
                    />
                    <input
                        type="text"
                        name="link2"
                        value={content.link2}
                        onChange={handleChange}
                        className="link-edit-input"
                    />
                    <button onClick={handleSaveClick} className="save-button">Lưu</button>
                </div>
            ) : (
                <div className="content">
                    <p>{content.paragraph1}</p>
                    <p>{content.paragraph2}</p>
                    <p>{content.paragraph3}
                        <a href={content.link1} target="_blank" rel="noopener noreferrer" className="link">reactjs.org</a>
                    </p>
                    <p>{content.paragraph4}
                        <a href={content.link2} target="_blank" rel="noopener noreferrer" className="link">github.com/facebook/react</a>
                    </p>
                </div>
            )}
            {isAdmin && (
                <button onClick={handleEditClick} className="edit-button">
                    {isEditing ? "Hủy" : "Sửa thông tin trang"}
                </button>
            )}
        </div>
    );
}

export default TrangChu;
