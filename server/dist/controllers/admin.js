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
exports.logoutAdmin = exports.signInAsAdmin = exports.signUpAsAdmin = exports.getAdmin = void 0;
const Admin_1 = __importDefault(require("../models/Admin"));
const password_1 = require("../libs/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../libs/config");
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ data: res.locals.user, error: false });
    }
    catch (error) {
        const err = error;
        console.log(err.message);
        res
            .status(500)
            .json({
            error: true,
            message: `Unexpected error occured on the server. ${err.message}`,
        });
    }
});
exports.getAdmin = getAdmin;
const signUpAsAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, email } = req.body;
        const checkEmail = yield Admin_1.default.findOne({ email });
        if (checkEmail)
            return res.status(400).json({ message: "Email is already in use" });
        const hash = (0, password_1.hashPassword)(password); //Hash the password
        yield Admin_1.default.create({
            name,
            email,
            password: hash
        });
        res.status(201).json({
            message: "Admin successfully created!",
        });
    }
    catch (error) {
        const err = error;
        console.log(err.message);
        res
            .status(500)
            .json({
            error: true,
            message: `Unexpected error occured on the server. ${err.message}`,
        });
    }
});
exports.signUpAsAdmin = signUpAsAdmin;
const signInAsAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        const admin = yield Admin_1.default.findOne({ name });
        if (!admin)
            return res.status(401).json({ error: true, message: "Invalid username or password" });
        const isPasswordMatched = (0, password_1.checkPasswordMatch)(password, admin.password);
        if (!isPasswordMatched)
            return res.status(401).json({ message: "Incorrect email or password" });
        const token = jsonwebtoken_1.default.sign({
            name: admin.name,
            email: admin.email,
            role: 'admin'
        }, process.env.JWT_SECRET, {
            expiresIn: 3600000 * 4,
        });
        res
            .cookie(config_1.COOKIE_NAME, token, { maxAge: config_1.COOKIE_MAX_AGE, httpOnly: true })
            .status(200)
            .json({ error: false, data: {
                name: admin.name,
                email: admin.email,
                role: 'admin'
            }
        });
    }
    catch (error) {
        const err = error;
        console.log(err.message);
        res
            .status(500)
            .json({
            error: true,
            message: `Unexpected error occured on the server. ${err.message}`,
        });
    }
});
exports.signInAsAdmin = signInAsAdmin;
const logoutAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).clearCookie(config_1.COOKIE_NAME).json({ message: "logged out" });
    }
    catch (error) {
        const err = error;
        console.log(err.message);
        res
            .status(500)
            .json({
            error: true,
            message: `Unexpected error occured on the server. ${err.message}`,
        });
    }
});
exports.logoutAdmin = logoutAdmin;
