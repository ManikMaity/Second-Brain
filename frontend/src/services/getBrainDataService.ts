import axiosInstance from "../helper/axiosInstance";

export async function getBrainDataService(hash : string) {
    const response = await axiosInstance.get(`/brain/profile/${hash}`);
    return response.data;
}