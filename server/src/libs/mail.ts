import {createTransport} from 'nodemailer';
import dotenv from 'dotenv';
import { DDMMYYYY, setTimeFormat } from './utils';

dotenv.config();

const config = {
    email: process.env.MAIL_SENDER_EMAIL,
    logo_url: ''
}

const PHONE_NO = "+8802996691250";

export const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SENDER_EMAIL,
        pass: process.env.MAIL_SENDER_PASSKEY
    }
})

const emailBodyForAccpet =
(username: string, date:Date, start_time: string, end_time: string, type: 'Appointment'|'Conference') => `
<p>Dear ${username},</p>
<p>I hope this message finds you well. We wanted to inform you that there has been an update to your upcoming  ${type == 'Appointment' ? 'appointment' : 'booking'} schedule. The details of your  ${type == 'Appointment' ? 'appointment' : 'booking'} have been adjusted, and we want to ensure that you are aware of the changes. Here are the updated  ${type == 'Appointment' ? 'appointment' : 'booking'} details:</p>
<p><strong>Starting Date and Time: ${DDMMYYYY(date, 'short')} ${setTimeFormat(start_time, '12')}</strong></p> 
<p><strong>Ending Time: ${setTimeFormat(end_time, '12')} </strong></p>
<p>If the new appointment time is not suitable for you, please let us know as soon as possible so that we can explore alternative options.</p>
    <p>If the updated schedule works for you, there is no further action required.</p>
    <p>Should you have any questions or concerns, please feel free to reach out to us at <b>${PHONE_NO}</b>.</p>
<p>Best Regards,</p>
<p>Md. Nahidul Islam Prodhan</p>
<p>Senior Assistant Secretary</p>
<p>Vice Chancellor's Office</p>
`;

const emailBodyForDecline = (username: string, date: Date, start_time: string, end_time: string, type: 'Appointment'|'Conference') => `
<p>Dear ${username},</p>
<p>I trust this message finds you in good health. Thank you for your understanding and patience.</p>
<p>After careful consideration, we regret to inform you that we are unable to accommodate the requested changes to your upcoming ${type === 'Appointment' ? 'appointment' : 'booking'} schedule.</p>
<p>Kindly note that the original schedule remains unchanged:</p>
<p><strong>Starting Date and Time: ${DDMMYYYY(date, 'short')} ${setTimeFormat(start_time, '12')}</strong></p> 
<p><strong>Ending Time: ${setTimeFormat(end_time, '12')} </strong></p>
<p>We understand that this may cause inconvenience, and we sincerely apologize for any disruption this may have caused. If you have any further questions or concerns, please do not hesitate to reach out to us at <b>${PHONE_NO}</b>.</p>
<p>Thank you for your understanding.</p>
<p>Best Regards,</p>
<p>Md. Nahidul Islam Prodhan</p>
<p>Senior Assistant Secretary</p>
<p>Vice Chancellor's Office</p>
`;

const notifyUser = (email:string, username: string, date:Date, start_time: string, end_time: string, type: 'Appointment'|'Conference', request:"accepted"|"declined") => {
   const  mailOptions = {
        from: config.email,
        to: email,
        subject: type =='Appointment' ? 'Updates on appointment with Vice Chancellor of IUT' : 'Update on conference room booking for Vice Chancellor of IUT',
        html: request == 'accepted' ? emailBodyForAccpet(username, date, start_time, end_time, type) : emailBodyForDecline(username, date, start_time, end_time, type)
      };

      transporter.sendMail(mailOptions, (err, info)=>{
        console.log(info);
        if (err) throw new Error(err.message);
      });
      
}

export default notifyUser;
