import { useState } from "react";
import { customAxios } from "../library/customAxios";


export default function useAuth() {
  const [data, setData] = useState(null);
  try {
    if (!data) {
      async function fetchMyProfile() {
        const response = await customAxios.get(`user/myinfo`);

        setData(response.data.user);
      }
      fetchMyProfile();
    }
  } catch (error) {
    console.log(error);
  }
  return data;
}
