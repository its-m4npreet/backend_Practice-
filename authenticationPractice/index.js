const express = require("express");
const app = express();
const connectDB = require('./config/db');
const userRouter =require("./router/userRouter");

app.use(express.json());
app.get("/",(req , res)=>{
    res.status(200).send("Welcome to authentication practice");
})
app.use('/user',userRouter);

app.listen(3000, async() => {
    console.log("database is connecing....");
    await connectDB();
    console.log("database connected");
    console.log('Server is running on port http://localhost:3000');
});
