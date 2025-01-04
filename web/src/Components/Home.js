import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css'; 

const Home = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f9f9f9' 
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        marginBottom: '2rem', 
        color: '#333' 
      }}>
        Welcome to the Patient Management System
      </h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/AddPatient" className="linkStyle">
          Add New Patient
        </Link>
        <Link to="/update" className="linkStyle">
          Update Existing Patient
        </Link>
      </div>
    </div>
  );
};

export default Home;
