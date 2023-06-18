import axios from "axios";

export const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("accessToken")||""}`,
    "Content-Type": "application/json" // default 값
  }
})