"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPasswordMatch = exports.hashPassword = void 0;
const crypto_1 = require("crypto");
function hashPassword(password) {
    const salt = (0, crypto_1.randomBytes)(16).toString("hex");
    const hashedPassword = (0, crypto_1.scryptSync)(password, salt, 64).toString("hex");
    return `${salt}:${hashedPassword}`;
}
exports.hashPassword = hashPassword;
const checkPasswordMatch = (password, hashedPassword) => {
    const [salt, key] = hashedPassword.split(":");
    const hashedBuffer = (0, crypto_1.scryptSync)(password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");
    const match = (0, crypto_1.timingSafeEqual)(hashedBuffer, keyBuffer);
    if (match)
        return true;
    return false;
};
exports.checkPasswordMatch = checkPasswordMatch;
