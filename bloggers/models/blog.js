const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
    images: [{
        type: String,
        required: true
    }],
    tags: [{
        type: String,
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps:true});

const blog = mongoose.model('Blog', blogSchema);
module.exports = blog;