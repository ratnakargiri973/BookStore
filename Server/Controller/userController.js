import Users from "../Model/UserSchema.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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

        return res.status(201).send({message: "User registered successfully"});
    } catch (error) {
        res.status(500).send({message: "Error registering user", error: error.message});
    }
}