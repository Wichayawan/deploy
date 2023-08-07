// middleware.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import expressSession from "express-session";

const app = express();
let loggedIn: string | null = null;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use(
  expressSession({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

export default app;
