import { Request, Response, NextFunction } from "express";
import { registerService } from "../services/auth.services";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body
        const registerData = await registerService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "user has been Successfully Registered",
            data: registerData
        })
    } catch (error) {
        next(error)
    }
}