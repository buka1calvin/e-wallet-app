"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const errorHandler_1 = require("./middlewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH"],
        credentials: true
    }
});
app.use((req, res, next) => {
    req.io = exports.io;
    next();
});
exports.io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
const connect = () => {
    const MONGOURL = process.env.MONGO_DATABASE;
    if (!MONGOURL) {
        throw new Error('MongoDB URI is not provided.');
    }
    mongoose_1.default
        .connect(MONGOURL)
        .then(() => console.log("connected to db"))
        .then(() => {
        app.use(express_1.default.json());
    })
        .catch((err) => {
        throw err;
    });
};
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
try {
    app.use("/api/v1", index_1.default);
}
catch (error) {
    console.log(error);
}
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
    connect();
    console.log(`app is listening on ${port}`);
});
process.on('SIGINT', () => {
    //@ts-ignore
    mongoose_1.default.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});
