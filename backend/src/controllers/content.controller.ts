import {Request,  Response} from "express";
import { RequestUserWithUser } from "../middlewares/auth";

export function getContentController(req: RequestUserWithUser, res : Response): void {
    console.log(req.user)
    res.json({
        msg : "working"
    })
}

export function createContentController(req: Request, res : Response): void {
    
}

export function deleteContentController(req: Request, res : Response): void {
    
}
