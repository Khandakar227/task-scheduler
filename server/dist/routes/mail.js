"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mail_1 = require("../controllers/mail");
const cookie_1 = require("../middlewares/cookie");
const mailRoutes = express_1.default.Router();
mailRoutes.post("/notify", cookie_1.verifyAdminCookie, mail_1.sendMail);
exports.default = mailRoutes;
