"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const passport_1 = __importDefault(require("passport"));
const googleAuthRoutes = express_1.default.Router();
googleAuthRoutes.get('/google', passport_1.default.authenticate("google", {
    scope: ['profile', 'email']
}));
googleAuthRoutes.get('/google/callback', auth_1.googleAuthCallback);
googleAuthRoutes.get('/google/callback/failed', auth_1.googleAuthFailed);
exports.default = googleAuthRoutes;
