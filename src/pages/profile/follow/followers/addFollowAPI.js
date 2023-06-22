import { customAxios } from "../../../../library/customAxios";

export const addFollowAPI = async (id) => {
  try {
    const response = await customAxios.post(`/profile/${id}/follow`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return null;
};