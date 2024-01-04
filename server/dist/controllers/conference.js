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
exports.searchBookedRoomsForAdmin = exports.changeStatus = exports.deleteConference = exports.updateConference = exports.getAllConferences = exports.getConferences = exports.verifyConferenceHandler = exports.bookConferenceHandler = void 0;
const Conference_1 = __importDefault(require("../models/Conference"));
const bookConferenceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, contact, reason_of_meeting, meeting_place, date, startTime, endTime, } = req.body;
        // check if appointment is already created (not required for now)
        const newAppointment = yield Conference_1.default.create({
            name,
            contact,
            reason_of_meeting,
            meeting_place,
            date,
            startTime,
            endTime,
            email: res.locals.user.email
        });
        yield newAppointment.save();
        res.status(200).json({ error: false, message: "Conference booked and awaited for approval" });
    }
    catch (err) {
        const error = err;
        console.log(error.message);
        res
            .status(500)
            .json({
            error: true,
            message: `Failed to book conference. ${error.message}`,
        });
    }
});
exports.bookConferenceHandler = bookConferenceHandler;
// Not used
const verifyConferenceHandler = (req, res) => {
    try {
        if (res.locals.user)
            res.status(200).json({ error: false, message: "verified" });
    }
    catch (err) {
        const error = err;
        console.log(error.message);
        res
            .status(500)
            .json({ error: true, message: `Failed to verify. ${error.message}` });
    }
};
exports.verifyConferenceHandler = verifyConferenceHandler;
const getConferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = res.locals) === null || _a === void 0 ? void 0 : _a.user.email))
            return res.status(200).json({ error: false, data: [] });
        const data = yield Conference_1.default.find({ email: res.locals.user.email });
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
exports.getConferences = getConferences;
const getAllConferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Conference_1.default.find();
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
exports.getAllConferences = getAllConferences;
const updateConference = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, contact, reason_of_meeting, meeting_place, date, startTime, endTime, } = req.body;
        yield Conference_1.default.findByIdAndUpdate(id, {
            $set: {
                name,
                contact,
                reason_of_meeting,
                meeting_place,
                date,
                startTime,
                endTime
            }
        });
        res.status(200).json({ error: false, message: "Updated" });
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
exports.updateConference = updateConference;
const deleteConference = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Conference_1.default.findByIdAndDelete(id);
        res.status(201).json({ error: false, message: "Conference Deleted" });
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
exports.deleteConference = deleteConference;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        yield Conference_1.default.findByIdAndUpdate(id, {
            $set: {
                status: status.toLowerCase() == 'declined' ? 'Declined' :
                    status.toLowerCase() == 'approved' ? 'Approved' : 'Pending'
            }
        });
        res.status(200).json({ error: false, message: "Conference status changed" });
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
exports.changeStatus = changeStatus;
// Admin only
const searchBookedRoomsForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        if (!q || !q.trim())
            return res.status(200).json({ error: false, data: [] });
        const conferences = yield Conference_1.default.find({ $text: { $search: q.trim() } });
        res.status(200).json({ error: false, data: conferences });
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
exports.searchBookedRoomsForAdmin = searchBookedRoomsForAdmin;
