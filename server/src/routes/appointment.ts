import express from "express";
import { createAppointmentHandler, verifyAppointmentHandler } from "../controllers/appointment";
import { verifyCookie } from "../middlewares/cookie";

const appointmentRoutes = express.Router();

appointmentRoutes.post("/create", verifyCookie, createAppointmentHandler);
appointmentRoutes.get("/", verifyCookie, verifyAppointmentHandler);

export default appointmentRoutes;