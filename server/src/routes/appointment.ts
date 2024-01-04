import express from "express";
import { changeStatus, createAppointmentHandler, deleteAppointment, getAllAppointments, getAppointments, searchAppointmentsForAdmin, updateAppointment } from "../controllers/appointment";
import { verifyAdminCookie, verifyCookie } from "../middlewares/cookie";
import { AppointmentValidityChecker } from "../libs/validator";
import validationErrorHandler from "../middlewares/validityHandler";

const appointmentRoutes = express.Router();

appointmentRoutes.post("/create", ...AppointmentValidityChecker, validationErrorHandler, verifyCookie, createAppointmentHandler);
appointmentRoutes.get("/", verifyCookie, getAppointments );
// Admin only
appointmentRoutes.get("/admin", verifyAdminCookie, getAllAppointments);
appointmentRoutes.put("/admin/:id", verifyAdminCookie, updateAppointment);
appointmentRoutes.put("/admin/update-status/:id", verifyAdminCookie, changeStatus);
appointmentRoutes.delete("/:id", verifyAdminCookie, deleteAppointment);
appointmentRoutes.delete("/admin/search", verifyAdminCookie, searchAppointmentsForAdmin);

export default appointmentRoutes;