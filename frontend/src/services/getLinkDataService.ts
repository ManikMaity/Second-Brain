import axiosInstance from "../helper/axiosInstance"

async function getLinkDataService() {
  const resposne = await axiosInstance.get("/brain/exits", {
    headers : {
        "Content-Type": "application/json",
        token : localStorage.getItem("secondBrainToken") || "",
    }
  })

  return resposne.data;
}

export default getLinkDataService
