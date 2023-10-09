import express from "express";
import { bookConferenceHandler, verifyConferenceHandler } from "../controllers/conference";
import { verifyCookie } from "../middlewares/cookie";
import { ConferenceValidityChecker } from "../libs/validator";

const conferenceRoutes = express.Router();

conferenceRoutes.post("/create", ...ConferenceValidityChecker, verifyCookie, bookConferenceHandler);
conferenceRoutes.get("/", verifyCookie, verifyConferenceHandler);

export default conferenceRoutes;