import React, { useState } from 'react';
import './Upload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faCloudUploadAlt, faEye, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

const Upload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [showDetailsIndex, setShowDetailsIndex] = useState(-1); // State to keep track of the index of the image being viewed
    const [uploadSuccess, setUploadSuccess] = useState(false); // State to track upload success

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        setSelectedFiles(files);

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const handleUpload = () => {
        // Kiểm tra nếu không có file được chọn
        if (selectedFiles.length === 0) {
            alert("Chưa có file được chọn!");
            return;
        }

        // Loop through each selected file and perform upload logic
        selectedFiles.forEach(file => {
            // Perform upload logic for each file here, such as sending the file to the server

            // For demonstration purposes, log the file name to the console
            console.log('Uploading file:', file.name);
        });

        // Set upload success to true
        setUploadSuccess(true);

        // After uploading, clear the selected files and preview URLs
        setSelectedFiles([]);
        setPreviewUrls([]);

        // Clear upload success after a certain delay
        setTimeout(() => {
            setUploadSuccess(false);
        }, 3000); // Clear upload success message after 3 seconds
    };

    // Function to handle when the user clicks the "View Details" button for an image
    const handleViewDetails = (index) => {
        setShowDetailsIndex(index);
    };

    // Function to handle when the user closes the details view
    const handleCloseDetails = () => {
        setShowDetailsIndex(-1);
    };

    // Function to handle when the user clicks the "X" button to remove the image
    const handleRemoveImage = (index) => {
        const updatedPreviewUrls = [...previewUrls];
        updatedPreviewUrls.splice(index, 1);
        setPreviewUrls(updatedPreviewUrls);

        const updatedSelectedFiles = [...selectedFiles];
        updatedSelectedFiles.splice(index, 1);
        setSelectedFiles(updatedSelectedFiles);

        // Close the details view if the removed image is currently being viewed
        if (showDetailsIndex === index) {
            setShowDetailsIndex(-1);
        }
    };

    return (
        <div>
            <h2>Upload hình ảnh</h2>
            <input type="file" multiple accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
            <button onClick={handleUpload} className="upload-button">
                <FontAwesomeIcon icon={faCloudUploadAlt} /> {/* FontAwesome icon for upload */}
            </button>

            {uploadSuccess && <div className="upload-success">Tải file thành công!</div>}

            <div>
                {previewUrls.map((url, index) => (
                    <div key={index}>
                        <img src={url} alt={`${index}`} style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />

                        {/* Add a button to view details for each image */}
                        <button onClick={() => handleViewDetails(index)} className="view-details-button">
                            <FontAwesomeIcon icon={faEye} /> {/* FontAwesome icon for view */}
                        </button>
                        {/* Add a button to remove the image */}
                        <button onClick={() => handleRemoveImage(index)} className="remove-image-button">
                            <FontAwesomeIcon icon={faTimes} /> {/* FontAwesome icon for remove */}
                        </button>
                        {/* Add a button to download each image */}
                        <a href={url} download={`Image_${index}`} className="download-button">
                            <FontAwesomeIcon icon={faDownload} /> {/* FontAwesome icon for download */}
                        </a>
                    </div>
                ))}
            </div>

            {/* Details modal */}
            {showDetailsIndex !== -1 && (
                <div className="details-modal">
                    <div className="modal-content">
                        {/* Add the image details here */}
                        <img src={previewUrls[showDetailsIndex]} alt="" />

                        {/* Add a button to close the details view */}
                        <button onClick={handleCloseDetails} className="close-details-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Upload;
