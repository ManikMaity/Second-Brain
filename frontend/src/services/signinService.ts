import axiosInstance from "../helper/axiosInstance";
import { SigninType } from "./signupService";

export async function signinService(data : SigninType) {
    const response = await axiosInstance.post("/user/signin", data);
    return response.data;
}