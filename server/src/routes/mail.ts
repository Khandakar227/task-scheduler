import express from 'express';
import { sendMail } from '../controllers/mail';
import { verifyAdminCookie } from '../middlewares/cookie';

const mailRoutes = express.Router();

mailRoutes.post("/notify", verifyAdminCookie, sendMail);

export default mailRoutes;