import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ selectedEmployee, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    designation: '',
    uan: '',
    pan: '',
    pfNumber: '',
    bankAccountNumber: '',
    ifscCode: '',
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`/api/employees/${formData._id}`, formData);
      } else {
        await axios.post('/api/employees', formData);
      }
      onSave(); // Notify parent to refresh employee list
      setFormData({
        name: '',
        employeeId: '',
        designation: '',
        uan: '',
        pan: '',
        pfNumber: '',
        bankAccountNumber: '',
        ifscCode: '',
      });
    } catch (err) {
      console.error('Failed to save employee:', err);
      alert('Error saving employee.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>{formData._id ? 'Update Employee' : 'Add New Employee'}</h2>
      {['name', 'employeeId', 'designation', 'uan', 'pan', 'pfNumber', 'bankAccountNumber','ifscCode','email','department','phone','joiningdate',].map(field => (
        <div key={field} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>{field}:</label>
          <input
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
      ))}
      <button type="submit" style={{ padding: '10px 20px' }}>
        {formData._id ? 'Update' : 'Add'} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
