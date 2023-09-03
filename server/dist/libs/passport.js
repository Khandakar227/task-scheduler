"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GoogleStrategy = new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/v1/auth/google/callback',
    scope: ['profile', 'email'],
}, function (accessToken, refreshToken, profile, done) {
    console.log("callback", accessToken, profile);
    done(null, profile);
});
passport_1.default.use(GoogleStrategy);
passport_1.default.serializeUser(function (user, done) {
    console.log("serialize", user);
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    console.log("deserialize", user);
    done(null, user);
});
