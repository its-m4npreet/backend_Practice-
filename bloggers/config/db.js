const mongoose = require('mongoose');

require('dotenv').config();

const connection = async () => {
    try{
        await mongoose.connect(process.env.mongoURI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
    }
}

module.exports = connection;
