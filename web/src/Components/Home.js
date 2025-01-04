import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, Grid, Card, CardContent } from '@mui/material';
import AddPatient from './AddPatient'; // Assuming you have AddPatient component
import UpdatePatient from './UpdatePatient'; // Assuming you have UpdatePatient component

const Home = () => {
  const [value, setValue] = useState(0); // State to handle active tab

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Custom TabPanel to conditionally render content
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <div>
      {/* Navigation Bar (AppBar) */}
      {/* <AppBar position="static" style={{ height: "55px", paddingTop: "10px" }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>Patient Management System</Typography>
      </AppBar> */}
      <AppBar position='static' style = {{height : "75px",paddingTop : "10px"}}>
       <Typography textAlign='center' fontSize='20px' paddingTop='10px' >Patient Management System</Typography>
       </AppBar>
 
      {/* Tabs */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="patient management tabs"
            centered
          >
            <Tab label="Add Patient" />
            <Tab label="Update Patient" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <CustomTabPanel value={value} index={0}>
          {/* AddPatient Component */}
          <AddPatient />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {/* UpdatePatient Component */}
          <UpdatePatient />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Home;
