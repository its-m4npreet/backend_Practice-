const connection=require('./config/db');
const express=require('express');
const app=express();
const userRouter=require('./routes/userRoutes');


app.use(express.json());

app.get("/",(req , res)=>{
    res.status(200).send("Welcome to bloggers api");
})

app.use('/user',userRouter);

app.listen(3000,async()=>{
    console.log("database is connecting....");
    await connection();
    console.log("database connected");
    console.log('Server is running on port http://localhost:3000');
});