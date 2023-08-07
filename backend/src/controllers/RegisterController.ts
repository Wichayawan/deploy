import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

export const RegisterController = async (req: Request, res: Response) => {

    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).json({ error: "ต้องป้อนข้อมูลทั้งหมด" });
        }
        // check if user already exist
        // Validate if user exist in our dadtabase
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(400).json({ error: "มีผู้ใช้นี้อยู่แล้ว. กรุณาเข้าสู่ระบบ" });
        }

        // Encrypt user password
        const encrtptedPassword = await bcrypt.hash(password, 10)

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encrtptedPassword

        })

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        // save user token
        user.token = token

        // return new user
        res.status(201).json(user)

    } catch (error: unknown) {
        console.log(error)
    }
}