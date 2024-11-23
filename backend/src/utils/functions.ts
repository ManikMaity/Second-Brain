import { Response } from "express";
export const  handleErrorResponse = (err : any, res : Response) : void => {
    if (err.statusCode){
        res.status(err.statusCode).json({
            success : false,
            message : err.message,
            error : err
        })
    }
    else {
        res.status(500).json({
            success : false,
            message : "Failed to signup user",
            error : err
        })
    }
}