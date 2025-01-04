const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');



const patientSchema = new Schema({

    phoneNo:{
        type:String
    },
    name:{
        type:String
    },
    email : {
        type:String

    },
    gender : {
        type:String
    },
    age : {
        type:String
    },
    address : {
        type:String
    },
    uhid :{
        type:String,
        default:uuidv4
    }
});

module.exports= mongoose.model('Patient',patientSchema);