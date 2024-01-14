import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { COOKIE_NAME } from "../libs/config";

export const verifyCookie = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verify payload
    const authorization = req.headers.authorization;
    if(!authorization)
      return res.status(403).json({ error: true, message: "You are not authorized" });
    
    const token = authorization.split(" ")[1]
    if(!token)
      return res.status(403).json({ error: true, message: "You are not authorized" });
    
    const payload = verify(token, process.env.JWT_SECRET as string);
    res.locals.user = payload;
    next();
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return res.status(403).json({ error: true, message: "You are not authorized" });
  }
};

export const verifyAdminCookie = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verify payload
    const authorization = req.headers.authorization;
    if(!authorization)
      return res.status(403).json({ error: true, message: "You are not authorized" });
    
    const token = authorization.split(" ")[1]
    if(!token)
      return res.status(403).json({ error: true, message: "You are not authorized" });
    const payload = verify(token, process.env.JWT_SECRET as string);
    res.locals.user = payload;
    if (res.locals.user.role != 'admin') return res.status(403).json({ error: true, message: "You are not authorized" });
    next();
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return res.status(403).json({ error: true, message: "You are not authorized" });
  }
}