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
exports.getAllRequestsForAdmin = exports.getAllRequests = void 0;
const Appointment_1 = __importDefault(require("../models/Appointment"));
const Conference_1 = __importDefault(require("../models/Conference"));
const utils_1 = require("../libs/utils");
const DLT_1 = __importDefault(require("../models/DLT"));
const getAllRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const appointments = yield Appointment_1.default.find({ email: user.email });
        const conferences = yield Conference_1.default.find({ email: user.email });
        const dltRooms = yield DLT_1.default.find({ email: user.email });
        res.status(200).json({ error: false, data: [...appointments, ...conferences, ...dltRooms] });
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
exports.getAllRequests = getAllRequests;
const getAllRequestsForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { upto, type } = req.query;
        let date = "";
        let query = {};
        if (upto == 'today') {
            query.date = (0, utils_1.YYYYMMDD)(new Date());
            date = (0, utils_1.DDMMYYYY)(new Date());
        }
        else if (upto == '7days') {
            query.date = {};
            const start_date = new Date();
            const end_date = new Date();
            end_date.setDate(end_date.getDate() + 7);
            query.date.$lte = end_date;
            query.date.$gte = start_date;
            date = `${(0, utils_1.DDMMYYYY)(start_date)} - ${(0, utils_1.DDMMYYYY)(end_date)}`;
        }
        else if (upto == '30days') {
            query.date = {};
            const start_date = new Date();
            const end_date = new Date();
            end_date.setDate(end_date.getDate() + 30);
            query.date.$lte = end_date;
            query.date.$gte = start_date;
            date = `${(0, utils_1.DDMMYYYY)(start_date)} - ${(0, utils_1.DDMMYYYY)(end_date)}`;
        }
        if (type == 'appointment') {
            const appointments = yield Appointment_1.default.find(query);
            res.status(200).json({ error: false, data: [...appointments], date });
        }
        else if (type == 'conference') {
            const conferences = yield Conference_1.default.find(query);
            res.status(200).json({ error: false, data: [...conferences], date });
        }
        else if (type == 'dlt') {
            const dltRooms = yield DLT_1.default.find(query);
            res.status(200).json({ error: false, data: [...dltRooms], date });
        }
        else {
            const appointments = yield Appointment_1.default.find(query);
            const conferences = yield Conference_1.default.find(query);
            const dltRooms = yield DLT_1.default.find(query);
            res.status(200).json({ error: false, data: [...appointments, ...conferences, ...dltRooms], date });
        }
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
exports.getAllRequestsForAdmin = getAllRequestsForAdmin;
