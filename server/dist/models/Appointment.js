"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    appointment_with: { type: String, required: true },
    reason_of_meeting: { type: String, required: true },
    meeting_place: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now, required: true }
});
const AppointmentModel = (0, mongoose_1.model)("Appointment", schema);
exports.default = AppointmentModel;
