import dotenv from "dotenv";
dotenv.config();

export const PORT : number = Number(process.env.PORT);
export const DB_URL = process.env.DB_URL;
export const SALT : number = Number(process.env.SALT);
export const JWT_SECRET = process.env.JWT_SECRET;

