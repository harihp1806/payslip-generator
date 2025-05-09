import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import BulkUpload from './BulkUpload';

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/api/employees');
      console.log("Response from /api/employees:", res.data, Array.isArray(res.data));

      if (Array.isArray(res.data)) {
        setEmployees(res.data);
        setLoadError(null);
      } else {
        console.error("Unexpected data format:", res.data);
        setLoadError("Invalid response format: Expected an array.");
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoadError("Failed to load employees.");
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = () => {
    fetchEmployees();
    setSelectedEmployee(null);
  };

  return (
    <div>
      <h2>Manage Employees</h2>
      <BulkUpload onUploadSuccess={fetchEmployees} />
      <EmployeeForm selectedEmployee={selectedEmployee} onSave={handleSave} />
      <h3>Existing Employees</h3>
      
      {loadError && <p style={{ color: 'red' }}>{loadError}</p>}

      <ul>
        {employees.map(emp => (
          <li
            key={emp._id}
            onClick={() => setSelectedEmployee(emp)}
            style={{ cursor: 'pointer' }}
          >
            {emp.name} ({emp.employeeId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeManagementPage;

