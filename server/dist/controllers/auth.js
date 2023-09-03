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
exports.googleAuthFailed = exports.googleAuthCallback = void 0;
const passport_1 = __importDefault(require("passport"));
const googleAuthCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("googleAuthCallback", process.env.CLIENT_URL);
        passport_1.default.authenticate("google", {
            successRedirect: `${process.env.CLIENT_URL}/appointment`,
            failureRedirect: "/auth/failed"
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.googleAuthCallback = googleAuthCallback;
const googleAuthFailed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("googleAuthFailed");
        res.status(401).json({
            error: true,
            message: "Failed"
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.googleAuthFailed = googleAuthFailed;
