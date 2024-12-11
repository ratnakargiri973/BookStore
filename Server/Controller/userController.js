import Users from "../Model/UserSchema.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "../Middleware/verification.js";
import 'dotenv/config'

export const register = async (req, res) => {
    const {name, username, email, phone} = req.body;
    try {
        const existingUsername = await Users.findOne({username});
        if(existingUsername){
            return res.status(400).send({message: `Username ${username} exists`});
        }

        const existingEmail = await Users.findOne({email});
        if(existingEmail){
            return res.status(400).send({message: `Email ${email} exists`});
        }

        const password = await bcrypt.hash(req.body.password, 10);

        const newUser = new Users({
            name,
            username,
            email,
            phone,
            password
        });

        await newUser.save();

        await sendVerificationEmail(email);

        return res.status(201).send({message: "User registered successfully"});
    } catch (error) {
        res.status(500).send({message: "Error registering user", error: error.message});
    }
}

// sendgrid

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await Users.findOne({username});

        if(!user){
            return res.status(401).send({message: "Incorrect credentials"});
        }
        
        if(!user.isEmailVerified){
            return res.status(403).send({message: "please verify your email before logging in"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).send({message: "Incorrect credentials"});
        }

        return res.status(200).send({message: "User has logged in successfully"});


    } catch (error) {
        res.status(500).send({message: "Error logging in user", error: error.message});
    }
}