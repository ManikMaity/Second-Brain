import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/server.config";
import UserModel, { MongooseUserType } from "../schemas/user.schema";
import { Mongoose } from "mongoose";

export interface RequestUserWithUser extends Request {
    user?: MongooseUserType
}

export async function authenticate(req : RequestUserWithUser, res : Response, next : NextFunction) {
    try {
        const token = req.headers['token'] as string | undefined;
        if (!token){
            throw {
                statusCode : 400,
                message : "Token not provided"
            }
        }
        const decodeedData : any = jwt.verify(token, JWT_SECRET ?? "manikmaity");
        const userId = decodeedData?.id;
        if (!userId){
            throw {
                statusCode : 400,
                message : "Invalid token"
            }
        }
        const userData = await UserModel.findById(userId);
        if (!userData){
            throw {
                statusCode : 404,
                message : "No user found with this token."
            }
        }
        req.user = userData;
        next();
    }
    catch(err : any) {
        if (err.statusCode){
            res.status(err.statusCode).json({
                success : false,
                message : err.message,
                error : err.error
            });
        }
        else {
            res.status(500).json({
                success : false,
                message : "Authentication error",
                error : err.message
            });
        }
    }
}