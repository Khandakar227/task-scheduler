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
exports.changeStatus = exports.deleteAppointment = exports.updateAppointment = exports.getAllAppointments = exports.getAppointments = exports.verifyAppointmentHandler = exports.createAppointmentHandler = void 0;
const Appointment_1 = __importDefault(require("../models/Appointment"));
const createAppointmentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointment_with, name, contact, reason_of_meeting, meeting_place, date, startTime, endTime, } = req.body;
        // check if appointment is already created (not required for now)
        const newAppointment = yield Appointment_1.default.create({
            appointment_with,
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
        res.status(200).json({ error: false, message: "Appointment created" });
    }
    catch (err) {
        const error = err;
        console.log(error.message);
        res
            .status(500)
            .json({
            error: true,
            message: `Failed to create appointment. ${error.message}`,
        });
    }
});
exports.createAppointmentHandler = createAppointmentHandler;
// Not used
const verifyAppointmentHandler = (req, res) => {
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
exports.verifyAppointmentHandler = verifyAppointmentHandler;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = res.locals) === null || _a === void 0 ? void 0 : _a.user.email))
            return res.status(200).json({ error: false, data: [] });
        const data = yield Appointment_1.default.find({ email: res.locals.user.email });
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
exports.getAppointments = getAppointments;
/**
 * Admin only
 */
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query;
        console.log(q);
        const appointments = yield Appointment_1.default.find();
        res.status(200).json({ error: false, data: appointments });
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
exports.getAllAppointments = getAllAppointments;
/**
 * Admin only
 */
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { appointment_with, name, contact, reason_of_meeting, meeting_place, date, startTime, endTime, } = req.body;
        yield Appointment_1.default.findByIdAndUpdate(id, {
            $set: {
                appointment_with,
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
exports.updateAppointment = updateAppointment;
/**
 * Admin only
 */
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Appointment_1.default.findByIdAndDelete(id);
        res.status(201).json({ error: false, message: "Appointment Deleted" });
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
exports.deleteAppointment = deleteAppointment;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        yield Appointment_1.default.findByIdAndUpdate(id, {
            $set: {
                status: status.toLowerCase() == 'declined' ? 'Declined' :
                    status.toLowerCase() == 'approved' ? 'Approved' : 'Pending'
            }
        });
        res.status(200).json({ error: false, message: "Appointment status changed" });
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
