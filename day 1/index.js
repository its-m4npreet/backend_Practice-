const express=require('express');
const employees=require('./employee.json');

const app=express();
app.get('/',(req,res)=>{
    res.send('Hello World , im mann');
});

app.get('/about',(req,res)=>{
    res.send('About page');
});
app.get('/contact',(req,res)=>{
    res.send('Contact page');
});
app.get('/products',(req,res)=>{
    res.send('Products page');
});
app.get('/employee',(req,res)=>{
    res.send(employees);
})
app.get('/employee/:id',(req,res)=>{
    const employeeId=Number(req.params.id);
    const user=employees.find(emp=>emp.id===employeeId);
    if(!user){
        return res.status(404).send('Employee not found');
    }
    res.send(user);
})
const PORT=3000;
app.listen(3000,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});