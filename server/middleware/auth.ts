import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided, authorization disallowed",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: string}
           
        req.user = {id: decoded.id}
        next();
    } catch (error) {
        res.status(401).json({message: "Unverified Token"})
    }
};

export default auth;