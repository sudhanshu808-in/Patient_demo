const mongoose = require('mongoose');

const db_connect = async()=>{
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/pt');
        console.log("connected to database");
        
    }
    catch(err){
        console.log("CONNECTION FAILED");
    }
}

module.exports = db_connect;
