import { body } from "express-validator";

export const AppointmentValidityChecker = [
    body("appointment_with").exists().withMessage("Enter the person you want appointment with"),
    body("name").exists().withMessage("Name is required"),
    body("contact").exists().withMessage("Contact is required"),
    body("contact").matches(/^(01|\+8801)\d{9}$/).withMessage("Invalid Phone number"),
    body("name").exists().withMessage("Name is required"),
    body("reason_of_meeting").exists().withMessage("Reason of meeting is required"),
    body("meeting_place").exists().withMessage("Meeting place is required"),
    body("startTime").isString().matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/).withMessage("Invalid starting time format"),
    body("endTime").isString().matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/).withMessage("Invalid ending time format"),
    body("date").isString().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/).withMessage("Invalid date format")
]

export const ConferenceValidityChecker = [
    body("name").exists().withMessage("Name is required"),
    body("contact").exists().withMessage("Contact is required"),
    body("contact").matches(/^(01|\+8801)\d{9}$/).withMessage("Invalid Phone number"),
    body("name").exists().withMessage("Name is required"),
    body("reason_of_meeting").exists().withMessage("Reason of meeting is required"),
    body("meeting_place").exists().withMessage("Meeting place is required"),
    body("startTime").isString().matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/).withMessage("Invalid starting time format"),
    body("endTime").isString().matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/).withMessage("Invalid ending time format"),
    body("date").isString().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/).withMessage("Invalid date format")
]