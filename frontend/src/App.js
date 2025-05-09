import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import PayslipForm from './components/PayslipForm';
import ManageEmployees from './components/ManageEmployees';
import EmployeeManagementPage from './components/EmployeeManagementPage';


function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '10px', background: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/payslip" element={<PayslipForm />} />
          <Route path="/manage-employees" element={<ManageEmployees />} />
          <Route path="/employees" element={<EmployeeManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
