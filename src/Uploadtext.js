import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faEye, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DocViewer } from 'react-doc-viewer';
import './Uploadtext.css';

const Uploadtext = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [showDetailsIndex, setShowDetailsIndex] = useState(-1);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [fileContent, setFileContent] = useState('');
    const [editedContent, setEditedContent] = useState('');

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const handleUpload = () => {
        if (selectedFiles.length === 0) {
            alert("Chưa có file được chọn!");
            return;
        }

        selectedFiles.forEach(file => {
            console.log('Uploading file:', file.name);
        });

        setUploadSuccess(true);

        setTimeout(() => {
            setUploadSuccess(false);
        }, 3000);
    };

    const handleViewDetails = (index) => {
        setShowDetailsIndex(index);
        const file = selectedFiles[index];

        if (file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = function (e) {
                setFileContent(reader.result);
                setEditedContent(reader.result);
            };
            reader.onerror = function (e) {
                console.error('Error reading file:', e);
            };
            reader.readAsText(file);
        } else if (file.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = function () {
                setFileContent(this.result);
                setEditedContent(this.result);
            };
            fileReader.readAsDataURL(file);
        } else if (file.type === 'application/msword') {
            setFileContent(URL.createObjectURL(file));
            setEditedContent(URL.createObjectURL(file));
        } else if (file.type.startsWith('image/')) {
            setFileContent(file);
            setEditedContent(file);
        } else {
            console.log('Unsupported file type');
        }
    };

    const handleCloseDetails = () => {
        setShowDetailsIndex(-1);
        setFileContent('');
        setEditedContent('');
    };

    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };

    const handleDownloadEditedFile = () => {
        const element = document.createElement("a");
        const file = new Blob([editedContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "edited_file.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <div>
            <h2>Upload File</h2>
            <input type="file" multiple accept=".docx, .txt, .pdf" onChange={handleFileChange} />
            <button onClick={handleUpload} className="upload-button">
                <FontAwesomeIcon icon={faCloudUploadAlt} />
            </button>

            {uploadSuccess && <div className="upload-success">Tải file thành công!</div>}

            <div>
                {previewUrls.map((url, index) => (
                    <div key={index} className="file-item">
                        <div className="action-buttons">
                            <button onClick={() => handleViewDetails(index)} className="view-details-button">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                            <a href={url} download={`File_${index}`} className="download-button">
                                <FontAwesomeIcon icon={faDownload} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {showDetailsIndex !== -1 && (
                <div className="file-details">
                    <div className="details-header">
                        <h3>Chi tiết tệp văn bản</h3>
                        <div className="action-buttons">
                            <button onClick={handleCloseDetails} className="close-details-button">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <button onClick={handleDownloadEditedFile} className="download-edited-button">
                                <FontAwesomeIcon icon={faDownload} /> Tải về nội dung đã chỉnh sửa
                            </button>
                        </div>
                    </div>
                    <div className="details-body">
                        {selectedFiles[showDetailsIndex].type === 'application/msword' ? (
                            <DocViewer documents={[{ uri: fileContent }]} />
                        ) : (
                            <textarea
                                value={editedContent}
                                onChange={handleContentChange}
                                className="edit-textarea"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Uploadtext;
