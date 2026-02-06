import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js';
import { sendWelcomeEmail } from '../emails/emailHandlers.js';
import 'dotenv/config';

export const signup = async(req,res) => {
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message: 'All fields required'});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({message: 'Enter valid email'});
        }
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: 'Email already exists'});

        if(password.length < 6){
            return res.status(400).json({message: 'Password needs to be atleast six characters'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
            await newUser.save();
            generateToken(newUser._id, res);
            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture
            });
        } 
        try {
            await sendWelcomeEmail(newUser.email,newUser.fullName,process.env.CLIENT_URL);
        } catch (error) {
            console.error(error, 'Failed to send welcome email');
        }

    } catch (error) {
        console.error('error in signup controller ', error);
        res.status(500).json({message: 'Internal Server error'});
    }
}

export const login = async(req,res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({message: 'Enter all fields'});
        }
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'invalid credentials'});
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({message: 'invalid credentials'});
        generateToken(user._id, res);
          res.status(201).json({
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePicture: user.profilePicture
            });

    } catch (error) {
        console.error('error in login ', error);
        res.status(500).json({message: 'server error'});
    }
}
export const logout = async(_,res) => {
    res.cookie('jwt', '', {maxAge:0});
    res.status(200).json({message: 'Logged out successfully'});
}

