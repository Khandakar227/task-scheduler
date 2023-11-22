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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const passport_1 = __importDefault(require("passport"));
require("./libs/passport");
const appointment_1 = __importDefault(require("./routes/appointment"));
const user_1 = __importDefault(require("./routes/user"));
const conference_1 = __importDefault(require("./routes/conference"));
const requests_1 = __importDefault(require("./routes/requests"));
const admin_1 = __importDefault(require("./routes/admin"));
const dlt_1 = __importDefault(require("./routes/dlt"));
const mail_1 = __importDefault(require("./routes/mail"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use((0, cors_1.default)({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, mongoose_1.connect)(process.env.MONGODB_URL, {
    dbName: process.env.DBNAME,
})
    .then((_) => console.log("Connected to database"))
    .catch((error) => {
    console.log("connection failed! ", error);
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("OK"));
app.use("/v1/admin", admin_1.default);
app.use("/v1/auth", auth_1.default);
app.use("/v1/appointment", appointment_1.default);
app.use("/v1/conference", conference_1.default);
app.use("/v1/dlt", dlt_1.default);
app.use("/v1/mail", mail_1.default);
app.use("/v1/requests", requests_1.default);
app.use("/v1/user", user_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
