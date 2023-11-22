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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getUser = void 0;
const config_1 = require("../libs/config");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!res.locals.user)
            return res.status(403).json({ error: true, message: "Not authenticated." });
        res.status(200).json({ error: false, user: {
                email: res.locals.user.email,
                name: res.locals.user.name,
                profileUrl: res.locals.user.profileUrl
            }
        });
    }
    catch (error) {
        const err = error;
        console.log(err);
        res.status(500).json({ error: true, message: `Error at Server side. ${err.message}` });
    }
});
exports.getUser = getUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.logoutUser = logoutUser;
