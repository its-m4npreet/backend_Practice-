const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    avatar:{
        type: String,
        default: "https://imgs.search.brave.com/XLM6WQZOOjg4USteTMmA56CbGwKhBGOcLHTpbDno-xU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE3/MTM4MjYzMy92ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tYW5v/bnltb3VzLXBlcnNv/bi1zeW1ib2wtYmxh/bmstYXZhdGFyLWdy/YXBoaWMtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9WndPRjZOZk9S/MHpoWUM0NHhPWDA2/cnlJUEFVaER2QWFq/clBzYVo2djEtdz0"
    },
    name: {
        type: String,
        required: true
    },
    email: {    
         type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;