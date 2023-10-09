import express from "express";
import { createAppointmentHandler, verifyAppointmentHandler } from "../controllers/appointment";
import { verifyCookie } from "../middlewares/cookie";
import { AppointmentValidityChecker } from "../libs/validator";

const appointmentRoutes = express.Router();

appointmentRoutes.post("/create", ...AppointmentValidityChecker, verifyCookie, createAppointmentHandler);
appointmentRoutes.get("/", verifyCookie, verifyAppointmentHandler);

export default appointmentRoutes;