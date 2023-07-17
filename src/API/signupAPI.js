export const signupAPI = async (user) => {
  try {
    const response = await customAxios.post(`user`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
