import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
require("dotenv").config();

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

//TODO: learn about as in typescript
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Token missing");
        }
        try {
            const decode: JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            req.user = decode;
        }
        catch (error: any) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
        next();
    }
    catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
}

//isStudent
export const isStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.accountType !== "Student") {
            throw new Error('This is a protected route for students only');
        }
        next();
    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//isInstructor
export const isInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.accountType !== "Instructor") {
            throw new Error('This is a protected route for instructor only');
        }
        next();
    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//isAdmin
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.accountType !== "Admin") {
            throw new Error('This is a protected route for admin only');
        }
        next();
    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}