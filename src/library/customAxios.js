import axios from "axios";

export const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json", // default 값
  },
});

// axios 요청전 토큰을 불러와서 적용시켜줌
// 초기 로그인시 customAxios가 호출됨 이때는 token 값 없이 customAxios가 설정됨 
// 이후 새로고침을 하지않으면 customAxios 설정은 바뀌지 않고 token값이 없이 실행되게됨
// 이를 수정하려고 아래와 같은 로직 사용
// customAxios에서 api 요청전 실행되는 함수로 매 API 호출전 accessToken를 새로 초기화 해주도록 처리
// https://velog.io/@liankim/customizing-axios 관련 레퍼런스
customAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : "";

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

