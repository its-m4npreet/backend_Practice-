const express=require('express');
const fs=require('fs');
const employees=require('./employee.json');
const path=require('path');

const admin=require('firebase-admin');
const serviceAccount=require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const app=express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hello World , im mann');
});
const filePath = path.join(__dirname, 'employee.json');


app.get('/about',(req,res)=>{
    res.send('About page');
});
app.get('/contact',(req,res)=>{
    res.send('Contact page');
});
app.get('/products',(req,res)=>{
    res.send('Products page');
});
app.get('/employee',async(req,res)=>{
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
app.post('/employee',(req,res)=>{
    console.log(req.body);
    const {name,email,role,department,salary,joiningDate}=req.body;
    const newEmployee={
        id:employees.length+1,
        name,
        email,
        role,
        department,
        salary,
        joiningDate
    }
    employees.push(newEmployee);
    fs.writeFile(filePath,JSON.stringify(employees,null,2),(errr)=>{
        if(errr){
            return res.status(500).send('Internal server error');
        }
        res.send(newEmployee);
    })
    // res.send(newEmployee);
})

app.patch('/employee/:id',(req,res)=>{
    const employeeId=Number(req.params.id);
    const employee=employees.find(emp=>emp.id===employeeId);
    if(!employee){
        return res.status(404).send('Employee not found');
    }
    const {name,email,role,department,salary,joiningDate}=req.body;
    employee.name=name;
    employee.email=email;
    employee.role=role;
    employee.department=department;
    employee.salary=salary;
    employee.joiningDate=joiningDate;
    fs.writeFile(filePath,JSON.stringify(employees,null,2),(errr)=>{
        if(errr){
            return res.status(500).send('Internal server error');
        }
        res.send('Employee updated successfully');
    })
})


app.delete('/employee/:id',(req,res)=>{
    const employeeId=Number(req.params.id);
    const index=employees.findIndex(emp=>emp.id===employeeId);
    if(index==-1){
        return res.status(404).send('Employee not found');
    }
    employees.splice(index,1);
    
    fs.writeFile(filePath,JSON.stringify(employees,null,2),(errr)=>{
        if(errr){
            return res.status(500).send('Internal server error');
        }
        res.send('Employee deleted successfully');
    })
})

const PORT=3000;
app.listen(3000,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});