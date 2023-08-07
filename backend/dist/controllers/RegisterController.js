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
exports.RegisterController = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).json({ error: "ต้องป้อนข้อมูลทั้งหมด" });
        }
        // check if user already exist
        // Validate if user exist in our dadtabase
        const oldUser = yield User_1.default.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ error: "มีผู้ใช้นี้อยู่แล้ว. กรุณาเข้าสู่ระบบ" });
        }
        // Encrypt user password
        const encrtptedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create user in our database
        const user = yield User_1.default.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encrtptedPassword
        });
        // Create token
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
            expiresIn: "2h"
        });
        // save user token
        user.token = token;
        // return new user
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.RegisterController = RegisterController;
