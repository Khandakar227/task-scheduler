import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { COOKIE_NAME } from "../libs/config";

export const verifyCookie = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verify token
    const token = verify(req.cookies[COOKIE_NAME], process.env.JWT_SECRET as string);
    res.locals.user = token;
    next();
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

export const verifyAdminCookie = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = verify(req.cookies[COOKIE_NAME], process.env.JWT_SECRET as string);
    res.locals.user = token;
    if (res.locals.user.role != 'admin') return res.status(403).json({ error: true, message: "You are not authorized" });
    next();
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return res.status(403).json({ error: true, message: "You are not authorized" });
  }
}