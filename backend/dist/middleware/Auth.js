"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
exports.verifyToken = verifyToken;
