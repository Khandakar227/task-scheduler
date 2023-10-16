import { Request, Response } from "express";
import AppointmentModel from "../models/Appointment";
import { User } from "../libs/cookies";
import ConferenceModel from "../models/Conference";

export const getAllRequests = async (req: Request, res: Response) => {
    try {
        const user:User = res.locals.user;

        const appointments = await AppointmentModel.find({ email: user.email });
        const conferences = await ConferenceModel.find({ email: user.email });

        res.status(200).json({error: false, data: [...appointments, ...conferences]});
        
    } catch (error) {
        const err = error as Error;
        console.log(err.message);
        res
        .status(500)
        .json({
            error: true,
            message: `Unexpected error occured on the server. ${err.message}`,
        });
    }
}