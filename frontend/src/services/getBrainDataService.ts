import axiosInstance from "../config/helper/axiosInstance";

export async function getBrainDataService(
  hash: string | undefined,
  filterType: string = "all",
) {
  const response = await axiosInstance.get(
    `/brain/profile/${hash}?type=${filterType}`,
  );
  return response.data;
}
