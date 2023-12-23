"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = require("nodemailer");
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const config = {
    email: '"Admin" <foo@example.com>',
    logo_url: ''
};
const PHONE_NO = "+8802996691250";
exports.transporter = (0, nodemailer_1.createTransport)({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SENDER_EMAIL,
        pass: process.env.MAIL_SENDER_PASSKEY
    }
});
const emailBody = (username, date, start_time, end_time, type) => `
<p>Dear ${username},</p>
<p>I hope this message finds you well. We wanted to inform you that there has been an update to your upcoming  ${type == 'Appointment' ? 'appointment' : 'booking'} schedule. The details of your  ${type == 'Appointment' ? 'appointment' : 'booking'} have been adjusted, and we want to ensure that you are aware of the changes. Here are the updated  ${type == 'Appointment' ? 'appointment' : 'booking'} details:</p>
<p><strong>Starting Date and Time: ${(0, utils_1.DDMMYYYY)(date, 'short')} ${(0, utils_1.setTimeFormat)(start_time, '12')}</strong></p> 
<p><strong>Ending Time: ${(0, utils_1.setTimeFormat)(end_time, '12')} </strong></p>
<p>If the new appointment time is not suitable for you, please let us know as soon as possible so that we can explore alternative options.</p>
    <p>If the updated schedule works for you, there is no further action required.</p>
    <p>Should you have any questions or concerns, please feel free to reach out to us at <b>${PHONE_NO}</b>.</p>
<p>Best Regards,</p>
  `;
const notifyUser = (email, username, date, start_time, end_time, type) => {
    const mailOptions = {
        from: config.email,
        to: email,
        subject: type == 'Appointment' ? 'Updates on appointment with Vice Chancellor of IUT' : 'Update on conference room booking for Vice Chancellor of IUT',
        html: emailBody(username, date, start_time, end_time, type)
    };
    exports.transporter.sendMail(mailOptions, (err, info) => {
        console.log(info);
        if (err)
            throw new Error(err.message);
    });
};
exports.default = notifyUser;
