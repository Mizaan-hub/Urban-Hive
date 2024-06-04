import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const login = async (req, res) => {
    const {username, password} = req.body

    try {
        //Check is the user Exists
        const user = await prisma.user.findUnique({
            where : {username,}
        })

        if (!user) return res.status(401).json({ message: "Invalid Credentials 😤" })

        // check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials 🤬" })

        // generate cookie token and send it to user

        // res.setHeader("Set-Cookie", "test=" + "anyValue").json({ message : "Cookie Created 🍪"})
        const age  = 1000 * 60 * 60 * 24 * 7

        const token = jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRET_KEY,{expiresIn: age})

        res.cookie("token", token, {
            httpOnly: true,
            // secure :true
            maxAge : age
        }) 
        .status(200)
        .json({
            message: "Logged in successfully 🎉",
        })

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error logging in" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token")
    .status(200)
    .json({
        message: "Logged out successfully 👋"
    })
};
