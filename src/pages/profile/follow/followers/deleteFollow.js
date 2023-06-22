import { customAxios } from "../../../../library/customAxios";

export const deleteFollow = async (id) => {
  try {
    const response = await customAxios.delete(`/profile/${id}/unfollow`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return null;
};
