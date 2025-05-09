import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import BulkUpload from './BulkUpload';

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]); // Default empty array
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      // Use the correct URL for your hosted backend
      const res = await axios.get('https://payslip-generator-1-8pdp.onrender.com/api/employees'); // Update with your backend URL
      console.log("Response from /api/employees:", res.data);

      const employeeList = Array.isArray(res.data)
        ? res.data
        : (res.data && Array.isArray(res.data.employees)
          ? res.data.employees
          : []); // Fallback to empty array

      console.log("Employee List:", employeeList);
      setEmployees(employeeList); // Update the state with the fetched list
    } catch (error) {
      console.error("Error fetching employees:", error.response || error.message);
      setEmployees([]); // Fallback to empty list in case of error
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = () => {
    fetchEmployees(); // Refresh employee list after save
    setSelectedEmployee(null); // Reset selected employee
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
        {/* Check if employees is an array before attempting to map */}
        {(Array.isArray(employees) ? employees : []).map(emp => (
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
