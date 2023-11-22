"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requests_1 = require("../controllers/requests");
const cookie_1 = require("../middlewares/cookie");
const requestsRoutes = express_1.default.Router();
requestsRoutes.get("/", cookie_1.verifyCookie, requests_1.getAllRequests);
requestsRoutes.get("/admin", cookie_1.verifyAdminCookie, requests_1.getAllRequestsForAdmin);
exports.default = requestsRoutes;
