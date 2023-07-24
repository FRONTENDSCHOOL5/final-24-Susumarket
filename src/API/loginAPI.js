import { customAxios } from "../library/customAxios";

// 로그인 API  data를 리턴 => 리턴 값을 통해 에러 메세지 출력 acessToken, account 저장
export const loginAPI = async (user) => {
  try {
    const response = await customAxios.post(`user/login`, user);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
