import { customAxios } from "../library/customAxios";

// 마이 프로필 API 자신의 프로필 정보를 리턴
export const myProfileAPI = async () => {
  try {
    const response = await customAxios.get("user/myinfo");
    return response.data.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 개인 유저 프로필 API accountname를 인자로 받습니다.
// 개인 유저 프로필 정보를 리턴
export const userProfileAPI = async (accountname) => {
  try {
    const response = await customAxios.get(`profile/${accountname}`);
    return response.data.profile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 유저 프로필 수정 API 인자로 user 객체를 받습니다.
// 수정된 유저 프로필 정보를 리턴
export const profileEditAPI = async (user) => {
  try {
    const response = await customAxios.put(`user`, user);
    return response.data.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 팔로우 API 팔로우 인자로 accountname를 받음
// 한 유저 프로필 정보 리턴
export const followAPI = async (accountname) => {
  try {
    const response = await customAxios.post(`profile/${accountname}/follow`);
    return response.data;
  } catch (error) {
    console.log(error);
    if(error.response.data.message){
      alert(error.response.data.message)
    }
    throw error;
  }
};

// 언팔로우 API 인자로 accountname를 받음
// 언팔로우 한 유저 프로필 정보 리턴
export const unFollowAPI = async (accountname) => {
  try {
    const response = await customAxios.delete(
      `profile/${accountname}/unfollow`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    if(error.response.data.message){
      alert(error.response.data.message)
    }
    throw error;
  }
};

// 팔로잉 목록 API 인자로 accountname를 받음
// 팔로잉한 목록(내가 팔로우한 사용자 목록)을 리턴
export const followingAPI = async (accountname) => {
  try {
    const response = await customAxios.get(`/profile/${accountname}/following`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 팔로잉 목록 페이징 API 페이징 처리된 데이터를 리턴
// limit = {몇개 불러올지}&skip={몇개 건너뛸지}
export const followingPageAPI = async (accountname, limit, Number) => {
  try {
    const response = await customAxios.get(
      `/profile/${accountname}/following?limit=${limit}&skip=${Number}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 팔로워 목록 API 인자로 accountname를 받음
// 팔로워한 목록(나를 팔로우한 사용자 목록)을 리턴
export const followerAPI = async (accountname) => {
  try {
    const response = await customAxios.get(`/profile/${accountname}/follower`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 팔로워 목록 페이징 API 페이징 처리된 데이터를 리턴
// limit = {몇개 불러올지}&skip={몇개 건너뛸지}
export const followerPageAPI = async (accountname, limit, Number) => {
  try {
    const response = await customAxios.get(
      `/profile/${accountname}/follower?limit=${limit}&skip=${Number}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadProfileImageAPI = async () => {
  try {
    const response = await customAxios.get(`user/myinfo`);
    return response.data.user.image;
  } catch (error) {
    console.error(error);
  }
};