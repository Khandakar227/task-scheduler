import express from "express";
import { googleAuthFailed } from "../controllers/auth";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const googleAuthRoutes = express.Router();

googleAuthRoutes.get('/google', passport.authenticate("google", {
    scope: ['profile', 'email']
}));
googleAuthRoutes.get('/google/callback',
    passport.authenticate("google",{
        successRedirect: `${process.env.CLIENT_URL}/appointment`,
        failureRedirect: "/auth/failed",
    })
);
googleAuthRoutes.get('/google/callback/failed', googleAuthFailed);

export default googleAuthRoutes;