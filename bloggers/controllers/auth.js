const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" ,
             name:newUser.name,
            email:newUser.email,
            password:newUser.password
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            // Avoid user enumeration by returning a generic message
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token: token,
            name: existingUser.name,
            email: existingUser.email
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


module.exports={register, loginUser}