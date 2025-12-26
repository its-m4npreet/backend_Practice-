const connection=require('./config/db');
const express=require('express');
const app=express();
const userRouter=require('./routes/userRoutes');
const { productRouter } = require('./routes/blogRoutes');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req , res)=>{
    res.status(200).send("Welcome to bloggers api");
})

app.use('/user',userRouter);
app.use('/blog',productRouter);

app.listen(3000,async()=>{
    console.log("database is connecting....");
    await connection();
    console.log("database connected");
    console.log('Server is running on port http://localhost:3000');
});