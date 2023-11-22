"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminCookie = exports.verifyCookie = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../libs/config");
const verifyCookie = (req, res, next) => {
    try {
        // Verify token
        const token = (0, jsonwebtoken_1.verify)(req.cookies[config_1.COOKIE_NAME], process.env.JWT_SECRET);
        res.locals.user = token;
        next();
    }
    catch (err) {
        const error = err;
        console.log(error.message);
        return res.status(403).json({ error: true, message: "You are not authorized" });
    }
};
exports.verifyCookie = verifyCookie;
const verifyAdminCookie = (req, res, next) => {
    try {
        const token = (0, jsonwebtoken_1.verify)(req.cookies[config_1.COOKIE_NAME], process.env.JWT_SECRET);
        res.locals.user = token;
        if (res.locals.user.role != 'admin')
            return res.status(403).json({ error: true, message: "You are not authorized" });
        next();
    }
    catch (err) {
        const error = err;
        console.log(error.message);
        return res.status(403).json({ error: true, message: "You are not authorized" });
    }
};
exports.verifyAdminCookie = verifyAdminCookie;
