import { customAxios } from "../library/customAxios";

// 업로드한 게시물 정보를 리턴
export const postUploadAPI = async (post) => {
  try {
    const response = await customAxios.post("post", post);
    return response.data.post;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

// 게시물 피드 API
// 내가 팔로우하고 있는 유저의 게시글 목록 리턴
export const postFeedAPI = async () => {
  try {
    const response = await customAxios.get("post/feed");
    return response.data.posts;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

// 게시물 피드 페이징 API
// 페이징 처리된 내가 팔로우하고 있는 유저의 게시글 목록 리턴
export const postFeedPageAPI = async (limt, skip) => {
  try {
    const response = await customAxios.get(
      `post/feed/?limit=${limt}&skip=${skip}`
    );
    return response.data.posts;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

// 자신의 게시물 목록 API
// 자신의 게시물 목록을 리턴
export const myPostAPI = async (accountname) => {
  try {
    const response = await customAxios.post(`post/${accountname}/userpost`);
    return response.data.post;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

// 자신의 게시물 페이징 목록 API
// 페이징 처리된 자신의 게시물 목록을 리턴
export const myPostPageAPI = async (accountname, limit, skip) => {
  try {
    const response = await customAxios.post(
      `post/${accountname}/userpost?limit=${limit}&skip=${skip}`
    );
    return response.data.post;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

// 게시물 상세 API
// 게시물의 상세 정보 리턴
export const postDetailAPI = async (postId) => {
  try {
    const response = await customAxios.get(`post/${postId}`);
    return response.data.post;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

// 게시물 수정 API
// 게시물의 수정 정보 리턴
export const postEditAPI = async (postId, postContent, imgUrls) => {
  try {
    await customAxios.put(`post/${postId}`, {
      post: {
        content: postContent,
        image: imgUrls.join(","),
      },
    });
    // return response.data.post;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
// export const postEditAPI = async (postId) => {
//   try {
//     const response = await customAxios.put(`post/${postId}`);
//     return response.data.post;
//   } catch (error) {
//     console.log(error);
//     return error.response.data.message;
//   }
// };

// 게시물 삭제 API
export const postDeleteAPI = async (postId) => {
  try {
    const response = await customAxios.delete(`post/${postId}`);
    return response.data.message;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

// 게시물 신고 API
export const postReportAPI = async (postId) => {
  try {
    const response = await customAxios.post(`post/${postId}/report`);
    return response.data.report;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

// 전체 게시물 API
// 전체 게시물 정보를 리턴
export const postAPI = async () => {
  try {
    const response = await customAxios.get("post");
    return response.data.report;
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
