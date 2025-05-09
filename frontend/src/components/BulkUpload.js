import React from 'react';
import axios from 'axios';

const BulkUpload = ({ onUploadSuccess }) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/employees/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Bulk upload successful!');
      onUploadSuccess(); // Refresh employee list
    } catch (err) {
      console.error(err);
      alert('Bulk upload failed.');
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Bulk Upload Employees (.csv)</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default BulkUpload;
