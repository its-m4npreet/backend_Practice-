const User = require("../model/user");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res)=>{
    try{
        const { name , password , email}=req.body;
        if(!name || !password || !email){
            res.status(404).send("please fill the require name , password , email");
        }
        const hashPassword= await bcrypt.hash(password.trim(),10);
        const newUser= new User({
            name:name.toLowerCase().trim(),
            password:hashPassword.trim(),
            email:email.toLowerCase().trim()
        })
        newUser.save();
        console.log("user account created successfully");
        console.log(newUser);
        res.status(200).json({
            name:newUser.name,
            email:newUser.email,
            password:newUser.password
        })

    }catch(err){
        console.log("error occures during creating user acount")
    }
};


const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(404).send("please fill the require email , password");
        }
        const user = await User.findOne({email:email.toLowerCase().trim()});
        
        if(!user){
            return res.status(404).send("user not found , please signup");
        }
        bcrypt.compare(password,user.password,(err,result)=>{
            const token = jwt.sign(
                {
                name :user.name, 
            },
                process.env.jwt_secret,
                {expiresIn:'1h'}
            );
            if(err){
                console.log("invalid password");
                res.status(401).send("invalid password123");
            }
            if(result){
                res.status(200).json({
            name:user.name,
            email:user.email
        })
            }
        } )
        
    }catch(err){
        res.status(500).send("internal server error");
    }
}


module.exports={signup, login}