import axiosInstance from "../helper/axiosInstance";

async function getAllContentService() {
    const response = await axiosInstance.get("/content", {
        headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("secondBrainToken") || "",
        },
    })
    return response.data;
}

export default getAllContentService;