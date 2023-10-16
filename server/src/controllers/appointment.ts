import { Request, Response } from "express";
import AppointmentModel from "../models/Appointment";
import {validationResult} from 'express-validator';

export const createAppointmentHandler = async (req: Request, res: Response) => {
  try {
    const {
      appointment_with,
      name,
      contact,
      reason_of_meeting,
      meeting_place,
      date,
      startTime,
      endTime,
    } = req.body;

    // check if appointment is already created (not required for now)

    const newAppointment = await AppointmentModel.create({
      appointment_with,
      name,
      contact,
      reason_of_meeting,
      meeting_place,
      date,
      startTime,
      endTime,
      email: res.locals.user.email
    });
    await newAppointment.save();

    res.status(200).json({ error: false, message: "Appointment created" });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    res
      .status(500)
      .json({
        error: true,
        message: `Failed to create appointment. ${error.message}`,
      });
  }
};
// Not used
export const verifyAppointmentHandler = (req: Request, res: Response) => {
  try {
    if (res.locals.user)
      res.status(200).json({ error: false, message: "verified" });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    res
      .status(500)
      .json({ error: true, message: `Failed to verify. ${error.message}` });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
    try {
      if (!res.locals?.user.email)
        return res.status(200).json({error: false, data:[] });
      
      const data = await AppointmentModel.find({ email: res.locals.user.email });
      res.status(200).json({error: false, data });

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