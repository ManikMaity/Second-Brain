import axiosInstance from "../helper/axiosInstance";

async function deleteContentService(contentId : string) {
    const response = await axiosInstance.delete("/content", 
        {
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("secondBrainToken") || "",
            },
            data : {
                contentId
            }
        }
    )

    return response.data;
}

export default deleteContentService;