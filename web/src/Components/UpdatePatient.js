import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

const UpdatePatient = () => {
    const [phoneNo, setPhoneNo] = useState('');
    const [patientData, setPatientData] = useState({
        name: '',
        age: '',
        gender: '',
        email: '',
        address: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isPatientFound, setIsPatientFound] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };


    const searchPatient = async () => {
      if(phoneNo.length!=10){
        setMessage('Enter a valid number ');
        setMessageType('error');
        return ;
      }
        try {
            const response = await axios.get(`http://localhost:3001/search-patient/${phoneNo}`);
            setPatientData(response.data.patient);
            setIsPatientFound(true);
            setMessage('');
            setMessageType('');
        } catch (err) {
            setMessage('Patient not found');
            setMessageType('error');
            setIsPatientFound(false);
            setPatientData({
                name: '',
                age: '',
                gender: '',
                email: '',
                address: '',
            });
        }
    };

    const updatePatient = async () => {
       
        if (!isPatientFound) {
            setMessage('Patient not found. Please search first.');
            setMessageType('error');
            return;
        }

        const { name, age, gender, email, address } = patientData;
        
        if (!name || !age || !gender || !email || !address) {
            setMessage('All fields are required.');
            setMessageType('error');
            return;
        }

        try {
            const response = await axios.put('http://localhost:3001/update-patient', {
                phoneNo,
                ...patientData,
            });
            setMessage(response.data.message);
            setMessageType('success');
        } catch (err) {
            setMessage('Error updating patient.');
            setMessageType('error');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ padding: 3, borderRadius: 1, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Update Patient
                </Typography>

                <TextField
                    label="Enter phone number"
                    variant="outlined"
                    fullWidth
                    value={phoneNo}
                    onChange={(e) => { 
                      const value = e.target.value;
                      if(/^\d*$/.test(value)){
                      setPhoneNo(value)}}}
                    sx={{ marginBottom: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={searchPatient}
                    sx={{ marginBottom: 2 }}
                >
                    Search
                </Button>

                {message && (
                    <Typography
                        variant="body1"
                        color={messageType === 'success' ? 'green' : 'red'}
                        sx={{ marginBottom: 2 }}
                    >
                        {message}
                    </Typography>
                )}

                {isPatientFound && (
                    <form>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={patientData.name}
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Age"
                            variant="outlined"
                            fullWidth
                            name="age"
                            value={patientData.age}
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Gender"
                            variant="outlined"
                            fullWidth
                            name="gender"
                            value={patientData.gender}
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={patientData.email}
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            name="address"
                            value={patientData.address}
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={updatePatient}
                        >
                            Update
                        </Button>
                    </form>
                )}
            </Box>
        </Container>
    );
};

export default UpdatePatient;
