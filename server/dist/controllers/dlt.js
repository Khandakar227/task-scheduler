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
exports.searchDLTForm = exports.updateDLT = exports.getDLTBookings = exports.bookDLT = void 0;
const DLT_1 = __importDefault(require("../models/DLT"));
const utils_1 = require("../libs/utils");
const bookDLT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { meeting_place, name, designation, designation_post, mobile_no, details, date_of_booking, start_time, end_time, duration, tech_supports, logistics_supports, logistics_support_reason, official_coverage, refreshment_supports, participants_count } = req.body;
        const dlt = yield DLT_1.default.create({
            email: res.locals.user.email,
            meeting_place,
            name,
            designation,
            designation_post,
            mobile_no,
            details,
            date_of_booking,
            start_time: (0, utils_1.timeToDate)(date_of_booking, start_time),
            end_time: (0, utils_1.timeToDate)(date_of_booking, end_time),
            duration,
            tech_supports,
            logistics_supports,
            logistics_support_reason,
            official_coverage,
            refreshment_supports,
            participants_count
        });
        res.status(200).json({ error: false, message: "DLT Room booked.", data: dlt });
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
exports.bookDLT = bookDLT;
const getDLTBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = res.locals) === null || _a === void 0 ? void 0 : _a.user.email))
            return res.status(200).json({ error: false, data: [] });
        const data = yield DLT_1.default.find({ email: (_b = res.locals) === null || _b === void 0 ? void 0 : _b.user.email });
        res.status(200).json({ error: false, data });
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
exports.getDLTBookings = getDLTBookings;
const updateDLT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const body = req.body;
        let updateFields = {};
        yield Promise.resolve(Object.keys(body).forEach(k => {
            if (body[k])
                updateFields[k] = body[k];
        }));
        const data = yield DLT_1.default.findByIdAndUpdate(id, updateFields, { new: true });
        res.status(200).json({ error: false, data });
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
exports.updateDLT = updateDLT;
const searchDLTForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        if (!q || !q.trim())
            return res.status(200).json({ error: false, data: [] });
        const dltRooms = yield DLT_1.default.find({ $text: { $search: q.trim() } });
        res.status(200).json({ error: false, data: dltRooms });
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
exports.searchDLTForm = searchDLTForm;
