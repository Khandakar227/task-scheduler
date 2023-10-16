import express from "express";
import { createAppointmentHandler, getAppointments, verifyAppointmentHandler } from "../controllers/appointment";
import { verifyCookie } from "../middlewares/cookie";
import { AppointmentValidityChecker } from "../libs/validator";
import validationErrorHandler from "../middlewares/validityHandler";

const appointmentRoutes = express.Router();

appointmentRoutes.post("/create", ...AppointmentValidityChecker, validationErrorHandler, verifyCookie, createAppointmentHandler);
// appointmentRoutes.get("/", verifyCookie, verifyAppointmentHandler);
appointmentRoutes.get("/", verifyCookie, getAppointments );

export default appointmentRoutes;