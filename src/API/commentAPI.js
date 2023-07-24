import { customAxios } from "../library/customAxios";

// 댓글 작성 API postId comment 객체를 인자로 받습니다.
// 작성한 comment 정보를 리턴
export const writeCommentAPI = async (postId, comment) => {
  try {
    const response = await customAxios.post(`post/${postId}/comments`, comment);
    return response.data.comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 댓글 목록 API postId를 인자로 받습니다.
// 댓글 목록 정보를 리턴
export const commentListAPI = async (postId) => {
  try {
    const response = await customAxios.get(`post/${postId}/comments`);
    return response.data.comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 댓글 목록 페이징 API postId, limit, skip를 인자로 받습니다.
// 페이징 처리된 댓글 목록 정보를 리턴
export const commentListPageAPI = async (postId, limit, skip) => {
  try {
    const response = await customAxios.get(`post/${postId}/comments?limit=${limit}&skip=${skip}`);
    return response.data.comment;
  } catch (error) {
    console.log(error);
    throw error;;
  }
};

// 댓글 삭제 API 인자로 postId, commnetId를 받습니다.
// 삭제 메세지를 리턴 
export const commentDeleteAPI = async (postId, commentId) => {
  try {
    const response = await customAxios.delete(`post/${postId}/comments/${commentId}`);
    return response.data.message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 댓글 삭제 API 인자로 postId, commnetId를 받습니다.
// 신고한 댓글 id를 리턴
export const commentReportAPI = async (postId, commentId) => {
  try {
    const response = await customAxios.post(`post/${postId}/comments/${commentId}/report`);
    return response.data.report.comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
