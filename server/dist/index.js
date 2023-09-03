"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const auth_1 = __importDefault(require("./routes/auth"));
const passport_1 = __importDefault(require("passport"));
require("./libs/passport");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
(0, mongoose_1.connect)(process.env.MONGODB_URL, {
    dbName: process.env.DBNAME,
})
    .then((_) => console.log("Connected to database"))
    .catch((error) => {
    console.log("connection failed! ", error);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/v1/auth", auth_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
