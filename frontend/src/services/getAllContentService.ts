import axiosInstance from "../helper/axiosInstance";

async function getAllContentService(filterType : string = "all") {
    const response = await axiosInstance.get(`/content?type=${filterType}`, {
        headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("secondBrainToken") || "",
        },
    })
    return response.data;
}

export default getAllContentService;