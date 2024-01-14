"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminCookie = exports.verifyCookie = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyCookie = (req, res, next) => {
    try {
        // Verify payload
        const authorization = req.headers.authorization;
        if (!authorization)
            return res.status(403).json({ error: true, message: "You are not authorized" });
        const token = authorization.split(" ")[1];
        if (!token)
            return res.status(403).json({ error: true, message: "You are not authorized" });
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        res.locals.user = payload;
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
        // Verify payload
        const authorization = req.headers.authorization;
        if (!authorization)
            return res.status(403).json({ error: true, message: "You are not authorized" });
        const token = authorization.split(" ")[1];
        if (!token)
            return res.status(403).json({ error: true, message: "You are not authorized" });
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        res.locals.user = payload;
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
