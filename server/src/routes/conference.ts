import express from "express";
import { bookConferenceHandler, changeStatus, deleteConference, getAllConferences, getConferences, searchBookedRoomsForAdmin, updateConference } from "../controllers/conference";
import { verifyAdminCookie, verifyCookie } from "../middlewares/cookie";
import { ConferenceValidityChecker } from "../libs/validator";
import validationErrorHandler from "../middlewares/validityHandler";

const conferenceRoutes = express.Router();

conferenceRoutes.post("/create", ...ConferenceValidityChecker, validationErrorHandler, verifyCookie, bookConferenceHandler);
conferenceRoutes.get("/", verifyCookie, getConferences);
// Admin only
conferenceRoutes.get("/admin", verifyAdminCookie, getAllConferences);
conferenceRoutes.put("/admin/update-status/:id", verifyAdminCookie, changeStatus);
conferenceRoutes.put("/:id", verifyAdminCookie, updateConference);
conferenceRoutes.delete("/:id", verifyAdminCookie, deleteConference);
conferenceRoutes.delete("/admin/search", verifyAdminCookie, searchBookedRoomsForAdmin);

export default conferenceRoutes;