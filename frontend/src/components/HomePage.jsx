import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(to right, #1e3c72, #2a5298)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Welcome to</h1>
      <h2 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '20px', color: '#ffd700' }}>Elitecreww</h2>
      <p style={{ fontSize: '1.2rem', maxWidth: '800px', marginBottom: '40px' }}>
        Elitecreww Payslip Generator helps HR teams generate professional salary slips easily and efficiently. Track employee attendance, calculate salary based on working days, and download payslips with one click.
        Start by logging in or registering as an admin to generate your first payslip.
      </p>
      <div>
        <Link to="/login">
          <button style={btnStyle}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ ...btnStyle, marginLeft: '20px' }}>Register</button>
        </Link>
        <Link to="/manage-employees">Manage Employees</Link>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '12px 28px',
  fontSize: '1.1rem',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  color: '#2a5298',
  fontWeight: 'bold',
  boxShadow: '2px 2px 12px rgba(0,0,0,0.3)',
  transition: '0.3s'
};

export default HomePage;
