import express from "express";
import { googleAuthCallback, googleAuthFailed } from "../controllers/auth";
import passport from "passport";

const googleAuthRoutes = express.Router();

googleAuthRoutes.get('/google', passport.authenticate("google", {
    scope: ['profile', 'email']
}));
googleAuthRoutes.get('/google/callback', googleAuthCallback);
googleAuthRoutes.get('/google/callback/failed', googleAuthFailed);

export default googleAuthRoutes;