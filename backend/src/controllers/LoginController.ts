import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const LoginController = async (req: Request, res: Response) => {

    try {
        // Get user input 
        const { email, password } = req.body

        // Validate user input
        if (!(email && password)) {
            return res.status(404).json({ error: "ต้องป้อนข้อมูลทั้งหมด" });
        }

        // Validate if user exists in our database
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: "ไม่พบชื่อผู้ใช้" })
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: "รหัสผ่านไม่ถูกต้อง" })
        }

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        // Attach token to the user object (optional)
        user.token = token

        // send back the user object with token (optional)
        return res.status(200).json({ message: "Login successful", user });

    } catch (error: unknown) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
