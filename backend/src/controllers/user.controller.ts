import {Request, Response} from "express";
import { UserSchemaType, UserSigninSchemaType } from "../validations/user.validation";
import UserModel from "../schemas/user.schema";
import bcrypt from "bcrypt";
import { JWT_SECRET, SALT } from "../configs/server.config";
import jwt from "jsonwebtoken";

export async function signupController(req: Request, res: Response) {
    try {
        const {username, email, password} : UserSchemaType = req.body
        const hashedPassword = bcrypt.hashSync(password, SALT);
        const user = await UserModel.create({
            username,
            email,
            password : hashedPassword
        });
        if (!user) {
            throw {
                statusCode : 500,
                message : "Failed to signup user"
            }
        }
        res.status(200).json({
            success : true,
            message : "User signed up successfully",
            data : user
        })
    }
    catch(err : any){
        if (err.code === 11000){
            res.status(409).json({
                success : false,
                message : "User with this email already exists",
                error : err.message
            })
        }
        else if (err.statusCode){
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


export async function signinController (req : Request, res : Response) {
    try{
        const {email, password} : UserSigninSchemaType = req.body;
        const user = await UserModel.findOne({email : email});
        if (!user){
            throw {
                message : "User with this email dont exit.",
                statusCode : 401
            }
        }
        if (!bcrypt.compareSync(password, user.password)){
            throw {
                message : "Password is incorrect",
                statusCode : 404
            }
        }

        const {password : pass, ...userData} = user.toObject();
        
        const token = jwt.sign({id : user._id}, JWT_SECRET ?? "manikmaity", {expiresIn : "30d"});
        res.status(200).json({
            success : true,
            message : "User signed in successfully",
            data : {
                user : userData,
                token
            }
        })
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