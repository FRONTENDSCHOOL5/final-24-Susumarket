import { customAxios } from "../../../../library/customAxios";

const followerAPI = async (accountname) => {
  try {
    const response = await customAxios.get(
      `/profile/${accountname}/follower?limit=1000`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Account API 에러가 발생했습니다", error);
  }
};

export default followerAPI;
