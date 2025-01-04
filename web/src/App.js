
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

// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Card, CardContent, CardMedia, Grid } from '@mui/material';

// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';

// const App = () => {
//   return (
//     <div>
//       {/* Navigation Bar (AppBar) */}
//       <AppBar position="static" style={{height: "55px", paddingTop: "10px"}}>
//         <Typography variant="h6" sx={{textAlign : "center"}}>Patient Management System</Typography>
//       </AppBar>
//       <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         Item One
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         Item Two
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         Item Three
//       </CustomTabPanel>
//     </Box>
//     </div>
//   );
// }

// export default App;
