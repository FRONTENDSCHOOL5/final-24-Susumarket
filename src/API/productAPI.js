// 상품 업로드 API prodcut 객체를 인자로 받습니다.
import { customAxios } from "../library/customAxios";

// 업로드한 상품 정보를 리턴
export const uploadProductAPI = async (product) => {
  try {
    const response = await customAxios.post("product", product);
    return response.data.product;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 상품 목록 API accountname를 인자로 받습니다.
// 유저의 상품 목록 정보를 리턴

export const productListAPI = async (accountname) => {
  try {
    const response = await customAxios.get(`/product/${accountname}`);
    return response.data.product;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 상품 목록 페이징 API accountname, limit, skip를 인자로 받습니다.
// 페이징 처리된 유저의 상품 목록 정보를 리턴
export const productListPageAPI = async (accountname, product, limit, skip) => {
  try {
    const response = await customAxios.get(
      `/product/${accountname}/?limit=${limit}&skip=${skip}`,
      product,
    );
    return response.data.product;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 상품 상세 API productId를 인자로 받습니다.
// 상품 상세 정보를 리턴
// API 주소에 detail이 빠져있음
export const productDetailAPI = async (productId) => {
  try {
    const response = await customAxios.get(`product/detail/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 상품 수정 API productId, product 객체를 인자로 받습니다.
// 수정된 상품 정보를 리턴
export const productEditAPI = async (productId, product) => {
  try {
    const response = await customAxios.put(`product/${productId}`, product);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      alert(error.response.data.message);
    }
    throw error;
  }
};

// 상품 삭제 API prodcutId를 인자로 받습니다.
export const productDeleteAPI = async (productId) => {
  try {
    const response = await customAxios.delete(`product/${productId}`);
    return response.data.message;
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      alert(error.response.data.message);
    }
    throw error;
  }
};
