"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_1 = require("../middlewares/cookie");
const user_1 = require("../controllers/user");
const userRoutes = express_1.default.Router();
userRoutes.get("/", cookie_1.verifyCookie, user_1.getUser);
userRoutes.get("/logout", user_1.logoutUser);
exports.default = userRoutes;
