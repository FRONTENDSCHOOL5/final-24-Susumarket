import { customAxios } from "../../../../library/customAxios";

const followerAPI = async (accountname) => {
  try {
    const response = await customAxios.get(`/profile/${accountname}/follower`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Account API 에러가 발생했습니다", error);
  }
};

export default followerAPI;
