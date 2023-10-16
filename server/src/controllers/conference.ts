import { Request, Response } from "express";
import ConferenceModel from "../models/Conference";

export const bookConferenceHandler = async (req: Request, res: Response) => {
  try {
    const {
      name,
      contact,
      reason_of_meeting,
      meeting_place,
      date,
      startTime,
      endTime,
    } = req.body;

    // check if appointment is already created (not required for now)

    const newAppointment = await ConferenceModel.create({
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

    res.status(200).json({ error: false, message: "Conference booked and awaited for approval" });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    res
      .status(500)
      .json({
        error: true,
        message: `Failed to book conference. ${error.message}`,
      });
  }
};

// Not used
export const verifyConferenceHandler = (req: Request, res: Response) => {
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


export const getConferences = async (req: Request, res: Response) => {
  try {
    if (!res.locals?.user.email)
      return res.status(200).json({error: false, data:[] });
    
    const data = await ConferenceModel.find({ email: res.locals.user.email });
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