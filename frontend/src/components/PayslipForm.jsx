import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PayslipPDF from './PayslipPDF';

function PayslipForm() {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    month: '',
    year: '',
    basicSalary: '',
    workingDays: '',
    presentDays: '',
    allowance: '',
    deduction: ''
  });

  const [employees, setEmployees] = useState([]);
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch employee list from backend
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('https://payslip-generator-1-8pdp.onrender.com/api/employees');
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (e) => {
    const empId = e.target.value;
    setSelectedEmpId(empId);
    const emp = employees.find(emp => emp._id === empId);
    if (emp) {
      setFormData(prev => ({
        ...prev,
        name: emp.name,
        employeeId: emp.employeeId,
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://payslip-generator-1-8pdp.onrender.com/api/payslip/payslip', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error generating payslip:', error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eef2f3, #8e9eab)',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '30px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>Generate Payslip</h2>

        {/* Employee Dropdown */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#34495e' }}>
            Select Employee:
          </label>
          <select
            value={selectedEmpId}
            onChange={handleEmployeeSelect}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          >
            <option value="">-- Select --</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.employeeId})
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#34495e' }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  fontSize: '14px'
                }}
                readOnly={key === 'name' || key === 'employeeId'}
              />
            </div>
          ))}
          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Generate
          </button>
        </form>

        {result && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>Payslip for {result.name}</h3>
            <p><strong>Employee ID:</strong> {result.employeeId}</p>
            <p><strong>Month/Year:</strong> {result.month}/{result.year}</p>
            <p><strong>Present Days:</strong> {result.presentDays} / {result.workingDays}</p>
            <h4 style={{ marginTop: '20px', color: '#34495e' }}>Salary Breakdown:</h4>
            <ul>
              {Object.entries(result.salaryBreakdown).map(([key, value]) => (
                <li key={key}><strong>{key}</strong>: ₹{value.toFixed(2)}</li>
              ))}
            </ul>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
               <PayslipPDF payslipData={result} employee={employees.find(emp => emp._id === selectedEmpId)} />

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PayslipForm;