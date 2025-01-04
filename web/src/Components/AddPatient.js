import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
  const [patient, setPatient] = useState({
    name: '',
    phoneNo: '',
    gender: '',
    age: '',
    email: '',
    address: '',
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (patient.phoneNo.length !== 10) {
      setMessage('Error: Enter a valid Phone Number');
      setSnackbarOpen(true);
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/add-new-patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      });

      const data = await response.json();

      if (response.status === 400) {
        setMessage(`Error: ${data.message}`); // Error message
        setSnackbarOpen(true); // Show snackbar
      } else if (response.status === 201) {
        // Success handling
        setMessage(`Patient ${patient.name} added successfully!`);
        setIsSuccess(true); // Show success message
        setTimeout(() => {
          setPatient({ name: '',
            phoneNo: '',
            gender: '',
            age: '',
            email: '',
            address: ''})
          navigate('/'); // Navigate back to the home page
        }, 1500);
      } else {
        setMessage('Something went wrong. Please try again.');
        setSnackbarOpen(true); // Show snackbar
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to server'); // Network error
      setSnackbarOpen(true); // Show snackbar
    }
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Add Patient</Typography>

      {isSuccess ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" color="#65ad51">
            {message} {/* Display success message */}
          </Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={patient.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNo"
                value={patient.phoneNo}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    handleChange(e);
                  }
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={patient.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={patient.age}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={patient.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={patient.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
            {/* Home Button */}
            
          </Grid>
        </form>
      )}

      {/* Snackbar for error or status messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddPatient;
