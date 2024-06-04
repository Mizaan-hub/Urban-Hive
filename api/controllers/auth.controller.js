import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

    // Create a new user and save to db
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    console.log(newUser);
    res.status(201).json({ message: "User Created Successfully!" });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
};

export const login = (req, res) => {

};

export const logout = (req, res) => {
    
};
