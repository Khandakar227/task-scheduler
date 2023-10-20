import express from "express";
import { getAllRequests, getAllRequestsForAdmin } from "../controllers/requests";
import { verifyAdminCookie, verifyCookie } from "../middlewares/cookie";
import validationErrorHandler from "../middlewares/validityHandler";

const requestsRoutes = express.Router();

requestsRoutes.get("/", verifyCookie, getAllRequests);
requestsRoutes.get("/admin", verifyAdminCookie, getAllRequestsForAdmin);

export default requestsRoutes;