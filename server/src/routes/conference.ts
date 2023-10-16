import express from "express";
import { bookConferenceHandler, getConferences, verifyConferenceHandler } from "../controllers/conference";
import { verifyCookie } from "../middlewares/cookie";
import { ConferenceValidityChecker } from "../libs/validator";
import validationErrorHandler from "../middlewares/validityHandler";

const conferenceRoutes = express.Router();

conferenceRoutes.post("/create", ...ConferenceValidityChecker, validationErrorHandler, verifyCookie, bookConferenceHandler);
// conferenceRoutes.get("/", verifyCookie, verifyConferenceHandler);
conferenceRoutes.get("/", verifyCookie, getConferences);

export default conferenceRoutes;