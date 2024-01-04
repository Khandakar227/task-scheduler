import express from "express";
import { getAllRequests, getAllRequestsForAdmin, searchRequestsForAdmin } from "../controllers/requests";
import { verifyAdminCookie, verifyCookie } from "../middlewares/cookie";

const requestsRoutes = express.Router();

requestsRoutes.get("/", verifyCookie, getAllRequests);
requestsRoutes.get("/admin", verifyAdminCookie, getAllRequestsForAdmin);
requestsRoutes.get("/admin/search", verifyAdminCookie, searchRequestsForAdmin);

export default requestsRoutes;