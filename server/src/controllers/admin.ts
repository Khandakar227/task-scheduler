import { Request, Response } from "express";
import AdminModel from "../models/Admin";
import { checkPasswordMatch, hashPassword } from "../libs/password";
import jwt from 'jsonwebtoken'
import { COOKIE_MAX_AGE, COOKIE_NAME } from "../libs/config";

export const getAdmin = async (req: Request, res: Response) => {
    try {
        res.status(200).json({data:res.locals.user, error: false});        
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

export const signUpAsAdmin = async (req: Request, res: Response) => {
    try {
        const { name, password, email } = req.body;

        const checkEmail = await AdminModel.findOne({ email });
        if (checkEmail)
          return res.status(400).json({ message: "Email is already in use" });

        const hash = hashPassword(password); //Hash the password

        await AdminModel.create({
            name,
            email,
            password: hash
        });

        res.status(201).json({
            message: "Admin successfully created!",
          });
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

export const signInAsAdmin = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;
        const admin = await AdminModel.findOne({name});
        if(!admin) return res.status(401).json({error: true, message: "Invalid username or password"});
        
        const isPasswordMatched = checkPasswordMatch(
            password,
            admin.password as string
          );
        
          if (!isPasswordMatched)
          return res.status(401).json({ error: true, message: "Incorrect email or password" });

          const token = jwt.sign({
            name: admin.name,
            email:admin.email,
            role: 'admin'
        }, process.env.JWT_SECRET as string, {
            expiresIn: 3_600_000 * 4,
          });

          res
          .cookie(COOKIE_NAME, token, { maxAge: COOKIE_MAX_AGE, httpOnly: true })
          .status(200)
          .json({error: false, data: {
            name: admin.name,
            email:admin.email,
            role: 'admin'
          }
        })
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

export const logoutAdmin = async (req: Request, res: Response) => {
    try {
        res.status(200).clearCookie(COOKIE_NAME).json({message: "logged out"});        
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