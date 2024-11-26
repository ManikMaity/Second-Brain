import axiosInstance from "../helper/axiosInstance";

export interface SigninType {
    email : string;
    password : string;
}

interface SignupType extends SigninType{
    username : string;
}

export async function signupService(data : SignupType) {
    const response = await axiosInstance.post("/user/signup", data);
    return response.data;
}