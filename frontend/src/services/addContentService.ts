import axiosInstance from "../helper/axiosInstance";

interface ContentType {
  title: string;
  link: string;
  type: "link" | "tweet" | "video";
}

async function addContentService(data: ContentType) {
  const response = await axiosInstance.post("/content", data, {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("secondBrainToken") || "",
    },
  });

  return response.data;
}

export default addContentService;
