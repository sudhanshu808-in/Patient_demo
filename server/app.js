const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Patient = require('./models/patient'); // Ensure the path is correct
const db_connect = require('./database/db'); // Ensure the path is correct

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db_connect();

app.set('view engine', 'ejs');

// Route to add a new patient
app.post('/add-new-patient', async (req, res) => {
    const { phoneNo, age, gender, name, email, address } = req.body;

    try {
        const existingPatient = await Patient.findOne({ phoneNo });

        if (existingPatient) {
            return res.status(400).json({ message: "Patient already exists in the database" });
        }

        const newPatient = new Patient({ phoneNo, name, email, address, age, gender });
        await newPatient.save();

        return res.status(201).json({ message: 'Patient registered successfully!' });
    } catch (err) {
        return res.status(500).json({ message: 'Error adding patient', error: err.message });
    }
});

// Route to search for a patient by phone number
app.get('/search-patient/:phoneNo', async (req, res) => {
    const { phoneNo } = req.params;

    try {
        const patient = await Patient.findOne({ phoneNo });

        if (patient) {
            return res.status(200).json({ patient });
        }
        if(!patient){
        return res.status(404).json({ message: 'Patient not found' });}
    } catch (err) {
        return res.status(500).json({ message: 'Error finding patient', error: err.message });
    }
});

// Route to update patient details
app.put('/update-patient', async (req, res) => {
    const { phoneNo, name, age, gender, email, address } = req.body;

    try {
        const patient = await Patient.findOne({ phoneNo });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        patient.name = name;
        patient.age = age;
        patient.gender = gender;
        patient.email = email;
        patient.address = address;

        await patient.save();

        return res.status(200).json({ message: 'Patient updated successfully!' });
    } catch (err) {
        return res.status(500).json({ message: 'Error updating patient', error: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001...");
});
