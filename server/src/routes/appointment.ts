import express from "express";
import { createAppointmentHandler, deleteAppointment, getAllAppointments, getAppointments, updateAppointment } from "../controllers/appointment";
import { verifyAdminCookie, verifyCookie } from "../middlewares/cookie";
import { AppointmentValidityChecker } from "../libs/validator";
import validationErrorHandler from "../middlewares/validityHandler";

const appointmentRoutes = express.Router();

appointmentRoutes.post("/create", ...AppointmentValidityChecker, validationErrorHandler, verifyCookie, createAppointmentHandler);
appointmentRoutes.get("/", verifyCookie, getAppointments );
// Admin only
appointmentRoutes.get("/admin", verifyAdminCookie, getAllAppointments);
appointmentRoutes.put("/:id", verifyAdminCookie, updateAppointment);
appointmentRoutes.delete("/:id", verifyAdminCookie, deleteAppointment);

export default appointmentRoutes;