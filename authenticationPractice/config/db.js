const mongoose=require('mongoose');
require('dotenv').config();

const connection=async()=>{
    try {
        await mongoose.connect(process.env.mongoURI);
    } catch (error) { 
        console.error("failed to connect to DB", error);
    }
}

module.exports=connection;