import axios from "axios";

export const customAxios = axios.create();

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.baseURL = process.env.REACT_APP_BASE_URL;
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);
