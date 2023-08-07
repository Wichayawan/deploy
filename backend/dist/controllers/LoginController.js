"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user input 
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            return res.status(404).json({ error: "ต้องป้อนข้อมูลทั้งหมด" });
        }
        // Validate if user exists in our database
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "ไม่พบชื่อผู้ใช้" });
        }
        // Validate password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "รหัสผ่านไม่ถูกต้อง" });
        }
        // Create token
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
            expiresIn: "2h"
        });
        // Attach token to the user object (optional)
        user.token = token;
        // send back the user object with token (optional)
        return res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.LoginController = LoginController;
