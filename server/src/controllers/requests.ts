import { Request, Response } from "express";
import AppointmentModel from "../models/Appointment";
import { User } from "../libs/cookies";
import ConferenceModel from "../models/Conference";
import { DDMMYYYY, YYYYMMDD } from "../libs/utils";

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

export const getAllRequestsForAdmin = async (req: Request, res: Response) => {
    try {
        const {upto, type} = req.query;
        let date  = ""
        let query:any = {}
        
        if(upto == 'today') {
            query.date = YYYYMMDD(new Date());
            date = DDMMYYYY(new Date());
        } else if (upto == '7days') {
            query.date = {};
            const start_date =  new Date();
            const end_date = new Date();
            end_date.setDate(end_date.getDate() + 7);
            query.date.$lte = end_date;
            query.date.$gte = start_date;
            date = `${DDMMYYYY(start_date)} - ${DDMMYYYY(end_date)}`;
        } else if (upto == '30days') {
            query.date = {};
            const start_date =  new Date();
            const end_date = new Date();
            end_date.setDate(end_date.getDate() + 30);
            query.date.$lte = end_date;
            query.date.$gte = start_date;
            date = `${DDMMYYYY(start_date)} - ${DDMMYYYY(end_date)}`;
        }

        if (type == 'appointment') {
            const appointments = await AppointmentModel.find(query);
            res.status(200).json({error: false, data: [...appointments], date});
        } else if (type == 'conference') {
            const conferences = await ConferenceModel.find(query);
            res.status(200).json({error: false, data: [...conferences], date});
        } else {
            const appointments = await AppointmentModel.find(query);
            const conferences = await ConferenceModel.find(query);
            res.status(200).json({error: false, data: [...appointments, ...conferences], date});
        }

 
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