import axiosInstance from "../helper/axiosInstance";

export async function getBrainDataService(hash : string, filterType : string = "all") {
    const response = await axiosInstance.get(`/brain/profile/${hash}?type=${filterType}`);
    return response.data;
}