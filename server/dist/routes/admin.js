"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const cookie_1 = require("../middlewares/cookie");
const adminRoutes = express_1.default.Router();
adminRoutes.get("/", cookie_1.verifyAdminCookie, admin_1.getAdmin);
adminRoutes.post("/sign-up", admin_1.signUpAsAdmin);
adminRoutes.post("/login", admin_1.signInAsAdmin);
adminRoutes.get("/logout", admin_1.logoutAdmin);
exports.default = adminRoutes;
