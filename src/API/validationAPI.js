import { customAxios } from "../library/customAxios";

export const emailValidationAPI = async (user) => {
  try {
    const response = await customAxios.post(`user/emailvalid`, user);
    return response.data.message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const accountValidationAPI = async (user) => {
  try {
    const response = await customAxios.post(`user/accountnamevalid`, user);
    return response.data.message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
