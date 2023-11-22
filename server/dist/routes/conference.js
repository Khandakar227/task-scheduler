"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conference_1 = require("../controllers/conference");
const cookie_1 = require("../middlewares/cookie");
const validator_1 = require("../libs/validator");
const validityHandler_1 = __importDefault(require("../middlewares/validityHandler"));
const conferenceRoutes = express_1.default.Router();
conferenceRoutes.post("/create", ...validator_1.ConferenceValidityChecker, validityHandler_1.default, cookie_1.verifyCookie, conference_1.bookConferenceHandler);
conferenceRoutes.get("/", cookie_1.verifyCookie, conference_1.getConferences);
// Admin only
conferenceRoutes.get("/admin", cookie_1.verifyAdminCookie, conference_1.getAllConferences);
conferenceRoutes.put("/admin/update-status/:id", cookie_1.verifyAdminCookie, conference_1.changeStatus);
conferenceRoutes.put("/:id", cookie_1.verifyAdminCookie, conference_1.updateConference);
conferenceRoutes.delete("/:id", cookie_1.verifyAdminCookie, conference_1.deleteConference);
exports.default = conferenceRoutes;
