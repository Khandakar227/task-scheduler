import express from "express";
import { bookConferenceHandler, deleteConference, getAllConferences, getConferences, updateConference } from "../controllers/conference";
import { verifyAdminCookie, verifyCookie } from "../middlewares/cookie";
import { ConferenceValidityChecker } from "../libs/validator";
import validationErrorHandler from "../middlewares/validityHandler";

const conferenceRoutes = express.Router();

conferenceRoutes.post("/create", ...ConferenceValidityChecker, validationErrorHandler, verifyCookie, bookConferenceHandler);
conferenceRoutes.get("/", verifyCookie, getConferences);
// Admin only
conferenceRoutes.get("/admin", verifyAdminCookie, getAllConferences);
conferenceRoutes.put("/:id", verifyAdminCookie, updateConference);
conferenceRoutes.delete("/:id", verifyAdminCookie, deleteConference);

export default conferenceRoutes;