import { customAxios } from "../library/customAxios";

// 검색 API 검색할 keyword를 인자로 받습니다.
// 검색 결과를 리턴합니다.
export const searchAPI = async (keyword) => {
  try{
    const response = await customAxios.get(`user/searchuser/?keyword=${keyword}`);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}