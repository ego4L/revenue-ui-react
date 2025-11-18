import React, { useRef } from 'react';

const FileUploader: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File successfully sent!');
            } else {
                alert('Cannot send file');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network problems');
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Upload qit file</button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default FileUploader;
