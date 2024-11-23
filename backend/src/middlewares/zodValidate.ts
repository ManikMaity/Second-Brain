import { Schema, ZodObject } from "zod";
import { Request, Response,  NextFunction} from "express";

export default function zodValidate(schema : ZodObject<any, any>) {
    return (req : Request, res : Response, next : NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err : any) {
            res.status(401).json({
                success : false,
                message : "Invalid request",
                error : err.issues.map((issue : any) => issue.message)
            })
        }
    }
}