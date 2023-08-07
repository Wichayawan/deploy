"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const Database_1 = require("./config/Database");
const router_1 = __importDefault(require("./routers/router"));
const middleware_1 = __importDefault(require("./middleware/middleware"));
const app = (0, express_1.default)();
// Connect to Mongo
mongoose_1.default
    .connect(Database_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    console.log(`Connected to MongoDB`);
    const server = http_1.default.createServer(app);
    app.use(middleware_1.default);
    // Middleware function to handle the /api route
    app.use("/api", router_1.default);
    const PORT = Database_1.config.server.port || 2300;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
});
