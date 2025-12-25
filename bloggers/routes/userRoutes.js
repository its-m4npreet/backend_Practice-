const express = require('express');
const userRouter=express.Router();
const {register,loginUser}=require('../controllers/auth');

userRouter.post('/register', register);
userRouter.post('/login', loginUser);

module.exports=userRouter;