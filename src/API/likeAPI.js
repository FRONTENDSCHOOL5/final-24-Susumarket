import { customAxios } from "../library/customAxios";

// 좋아요를 한 게시물 정보를 리턴
export const likeAPI = async (postId) => {
  try {
    const response = await customAxios.post(`post/${postId}/heart`);
    return response.data.post;
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      alert(error.response.data.message);
    }
    throw error;
  }
};

// 좋아요 취소 API
// 좋아요 취소를 한 게시물 정보를 리턴
export const unikeAPI = async (postId) => {
  try {
    const response = await customAxios.delete(`post/${postId}/unheart`);
    return response.data.post;
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      alert(error.response.data.message);
    }
    throw error;
  }
};
