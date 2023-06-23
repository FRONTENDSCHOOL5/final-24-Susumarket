import { customAxios } from "../../../../library/customAxios";

export const deleteFollowAPI = async (id) => {
  try {
    const response = await customAxios.delete(`/profile/${id}/unfollow`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return null;
};
