"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConferenceValidityChecker = exports.AppointmentValidityChecker = void 0;
const express_validator_1 = require("express-validator");
exports.AppointmentValidityChecker = [
    (0, express_validator_1.body)("appointment_with").exists().withMessage("Enter the person you want appointment with"),
    (0, express_validator_1.body)("name").exists().withMessage("Name is required"),
    (0, express_validator_1.body)("contact").exists().withMessage("Contact is required"),
    (0, express_validator_1.body)("contact").matches(/^(01|\+8801)\d{9}$/).withMessage("Invalid Phone number"),
    (0, express_validator_1.body)("name").exists().withMessage("Name is required"),
    (0, express_validator_1.body)("reason_of_meeting").exists().withMessage("Reason of meeting is required"),
    (0, express_validator_1.body)("meeting_place").exists().withMessage("Meeting place is required"),
    (0, express_validator_1.body)("startTime").isString().matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/).withMessage("Invalid starting time format"),
    (0, express_validator_1.body)("endTime").isString().matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/).withMessage("Invalid ending time format"),
    (0, express_validator_1.body)("date").isString().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/).withMessage("Invalid date format")
];
exports.ConferenceValidityChecker = [
    (0, express_validator_1.body)("name").exists().withMessage("Name is required"),
    (0, express_validator_1.body)("contact").exists().withMessage("Contact is required"),
    (0, express_validator_1.body)("contact").matches(/^(01|\+8801)\d{9}$/).withMessage("Invalid Phone number"),
    (0, express_validator_1.body)("name").exists().withMessage("Name is required"),
    (0, express_validator_1.body)("reason_of_meeting").exists().withMessage("Reason of meeting is required"),
    (0, express_validator_1.body)("meeting_place").exists().withMessage("Meeting place is required"),
    (0, express_validator_1.body)("startTime").isString().matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/).withMessage("Invalid starting time format"),
    (0, express_validator_1.body)("endTime").isString().matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/).withMessage("Invalid ending time format"),
    (0, express_validator_1.body)("date").isString().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/).withMessage("Invalid date format")
];
