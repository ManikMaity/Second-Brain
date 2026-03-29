import axios from "axios";
import { BACKEND_URL } from "../clientConfig";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
});

export default axiosInstance;
