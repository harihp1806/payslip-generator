import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import BulkUpload from './BulkUpload';

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
  try {
    const res = await axios.get('/api/employees');
    console.log("Response from /api/employees:", res.data, Array.isArray(res.data));
    setEmployees(res.data);
  } catch (error) {
    console.error("Error fetching employees:", error);
    setEmployees([]); // fallback to empty list
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
