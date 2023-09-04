"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const googleAuthRoutes = express_1.default.Router();
googleAuthRoutes.get("/appointment/google", passport_1.default.authenticate("appointment-google-sign-in", {
    scope: ["profile", "email"],
}));
googleAuthRoutes.get("/conference/google", passport_1.default.authenticate("conference-google-sign-in", {
    scope: ["profile", "email"],
}));
googleAuthRoutes.get("/appointment/google/callback", (req, res) => {
    passport_1.default.authenticate("appointment-google-sign-in", function (err, user, info, status) {
        if (err) {
            console.log(err);
            res
                .status(401)
                .json({ error: true, message: "Failed to authenticate" });
            return;
        }
        res.redirect(`${process.env.CLIENT_URL}/appointment`);
    })(req, res);
});
googleAuthRoutes.get("/conference/google/callback", (req, res) => {
    passport_1.default.authenticate("conference-google-sign-in", function (err, user, info, status) {
        if (err) {
            console.log(err);
            res
                .status(401)
                .json({ error: true, message: "Failed to authenticate" });
            return;
        }
        res.redirect(`${process.env.CLIENT_URL}/conference`);
    })(req, res);
});
googleAuthRoutes.get("/google/callback/failed", auth_1.googleAuthFailed);
exports.default = googleAuthRoutes;
