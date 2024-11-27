import axiosInstance from "../helper/axiosInstance";

async function shareBrainService(shareBrain: boolean) {
  const response = await axiosInstance.post(
    "/brain/share",
    {
      share: shareBrain,
    },
    {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("secondBrainToken") || "",
      },
    }
  );

  return response.data;
}


export default shareBrainService;