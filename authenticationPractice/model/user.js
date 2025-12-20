const mongoose = require('mongoose');
const shema = mongoose.Schema;
const userShema = new shema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userShema);
module.exports = User;