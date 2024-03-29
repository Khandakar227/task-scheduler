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
exports.sendMail = void 0;
const mail_1 = __importDefault(require("../libs/mail"));
const sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, startTime, endTime, date, type, request } = req.body;
        (0, mail_1.default)(email, username, date, startTime, endTime, type, request);
        res.status(200).json({ error: false, message: "Message sent" });
    }
    catch (error) {
        const err = error;
        console.log(err);
        res
            .status(500)
            .json({
            error: true,
            message: `Unexpected error occured on the server. ${err.message}`,
        });
    }
});
exports.sendMail = sendMail;
