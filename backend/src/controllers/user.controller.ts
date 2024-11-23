import {Request, Response} from "express";

export function signupController(req: Request, res: Response) : void {
    try {

    }
    catch(err : any){
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
}


export function signinController (req : Request, res : Response) {
    
}