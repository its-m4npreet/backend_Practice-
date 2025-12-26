const express = require('express');
const productRouter = express.Router();
const { createBlog ,deleteBlog , updateBlog } = require('../controllers/blog');
const authMiddleware = require('../middleware/authMiddleware');

productRouter.post('/create', authMiddleware, createBlog);
productRouter.delete('/delete/:id', authMiddleware, deleteBlog);
productRouter.put('/update/:id', authMiddleware, updateBlog);
module.exports={productRouter}