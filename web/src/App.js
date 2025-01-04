
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'; 
import AddPatient from './Components/AddPatient';
import UpdatePatient from './Components/UpdatePatient';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/AddPatient" element={<AddPatient />} />
          <Route path="/update" element={<UpdatePatient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
