//config.ts
import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://wichayawan10:RZhnzzGkV84NCm05@cluster0.9293bne.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_POER
    ? Number(process.env.SERVER_POER)
    : 3003;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};