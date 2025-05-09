import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import BulkUpload from './BulkUpload';

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]); // Always start with an empty array
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/api/employees');
      console.log("Response from /api/employees:", res.data);

      // Extract the employee list properly
      const employeeList = Array.isArray(res.data)
        ? res.data
        : res.data && Array.isArray(res.data.employees)
        ? res.data.employees
        : [];
      
      console.log('Employee List:', employeeList); // Log the employee list
      setEmployees(employeeList);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]); // Fallback to an empty list in case of error
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

      {/* Debugging output */}
      <pre>{JSON.stringify(employees, null, 2)}</pre>

      <ul>
        {/* Safeguard if employees is not an array */}
        {(employees && Array.isArray(employees) ? employees : []).map(emp => (
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
