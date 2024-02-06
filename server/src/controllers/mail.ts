import { Request, Response } from "express";
import notifyUser from "../libs/mail";

export const sendMail = async (req: Request, res: Response) => {
    try {
        const { email, username, startTime, endTime, date, type, request } = req.body;
        notifyUser(email, username, date, startTime, endTime, type, request);
        res.status(200).json({error: false, message: "Message sent"});
    } catch (error) {
        const err = error as Error;
        console.log(err);
        res
        .status(500)
        .json({
            error: true,
            message: `Unexpected error occured on the server. ${err.message}`,
        });
    }
}