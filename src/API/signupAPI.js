import { customAxios } from "../library/customAxios";

export const signupAPI = async (user) => {
  try {
    const response = await customAxios.post(`user`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
