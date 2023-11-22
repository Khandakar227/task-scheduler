"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCookie = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const verifyCookie = (req, res, next) => {
    try {
        // Verify token
        const token = (0, jsonwebtoken_1.verify)(req.cookies[config_1.COOKIE_NAME], process.env.JWT_SECRET_KEY);
        res.locals.user = token;
        next();
    }
    catch (err) {
        const error = err;
        console.log(error.message);
        return res.status(403).json({ message: "You are not authorized" });
    }
};
exports.verifyCookie = verifyCookie;
