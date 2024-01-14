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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookies_1 = require("../libs/cookies");
const user_1 = require("../libs/user");
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
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                res
                    .status(401)
                    .json({ error: true, message: "Failed to authenticate" });
                return;
            }
            //Add user to mongodb
            yield (0, user_1.addUser)(user);
            // res.cookie(COOKIE_NAME, createCookie('appointment', user), {
            //   httpOnly: true,
            //   maxAge: COOKIE_MAX_AGE,
            //   // Use only in production
            //   domain: 'iut-appointment-and-room-booking.onrender.com',
            //   sameSite: 'none',
            //   secure: true,
            // });
            res.redirect(302, `${process.env.CLIENT_URL}/appointment?token=${(0, cookies_1.createCookie)('appointment', user)}`);
        });
    })(req, res);
});
googleAuthRoutes.get("/conference/google/callback", (req, res) => {
    passport_1.default.authenticate("conference-google-sign-in", function (err, user, info, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                res
                    .status(401)
                    .json({ error: true, message: "Failed to authenticate" });
                return;
            }
            //Add user to mongodb
            yield (0, user_1.addUser)(user);
            res.redirect(`${process.env.CLIENT_URL}/conference?token=${(0, cookies_1.createCookie)('appointment', user)}`);
        });
    })(req, res);
});
googleAuthRoutes.get("/google/callback/failed", auth_1.googleAuthFailed);
exports.default = googleAuthRoutes;
