import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// login user
const loginUser = async (req, res) => {
    let {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.json({success: false, message: "Email is incorrect"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success: false, message: "Incorrect Password"});
        }

        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
    );
}

// register user
const registerUser = async (req, res) => {
    let {name, email, password} = req.body;
    try {
        const exists = await User.findOne({email});

        if(exists) {
            return res.json({success: false, message: "User already exists"});
        }

        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a valid email"});
        }

        if(password.length < 8) {
            return res.json({success: false, message: "Password must contain at least 8 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const getProfile = async (req, res) =>{
    try {
        const user = await User.findById(req.body.userId);
        console.log(req.body);
        res.json({success: true, user});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export {loginUser, registerUser, getProfile};