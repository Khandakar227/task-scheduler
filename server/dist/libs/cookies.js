"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminCookie = exports.createCookie = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("./config");
const createCookie = (path, user) => {
    var _a;
    //JSON web token
    if (!user)
        throw Error("Failed to create cookie");
    return (0, jsonwebtoken_1.sign)({
        email: ((_a = user.emails) === null || _a === void 0 ? void 0 : _a.length) ? user.emails[0].value : user._json.email,
        name: user.displayName,
        profileUrl: user._json.picture,
        path,
    }, process.env.JWT_SECRET, { expiresIn: config_1.JWT_EXPIRES_IN });
};
exports.createCookie = createCookie;
const createAdminCookie = (name) => {
    if (!name)
        throw Error("Failed to create cookie");
    return (0, jsonwebtoken_1.sign)({
        name, role: 'admin'
    }, process.env.JWT_SECRET, { expiresIn: config_1.JWT_EXPIRES_IN });
};
exports.createAdminCookie = createAdminCookie;
