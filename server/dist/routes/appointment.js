"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointment_1 = require("../controllers/appointment");
const cookie_1 = require("../middlewares/cookie");
const validator_1 = require("../libs/validator");
const validityHandler_1 = __importDefault(require("../middlewares/validityHandler"));
const appointmentRoutes = express_1.default.Router();
appointmentRoutes.post("/create", ...validator_1.AppointmentValidityChecker, validityHandler_1.default, cookie_1.verifyCookie, appointment_1.createAppointmentHandler);
appointmentRoutes.get("/", cookie_1.verifyCookie, appointment_1.getAppointments);
// Admin only
appointmentRoutes.get("/admin", cookie_1.verifyAdminCookie, appointment_1.getAllAppointments);
appointmentRoutes.put("/admin/:id", cookie_1.verifyAdminCookie, appointment_1.updateAppointment);
appointmentRoutes.put("/admin/update-status/:id", cookie_1.verifyAdminCookie, appointment_1.changeStatus);
appointmentRoutes.delete("/:id", cookie_1.verifyAdminCookie, appointment_1.deleteAppointment);
exports.default = appointmentRoutes;
