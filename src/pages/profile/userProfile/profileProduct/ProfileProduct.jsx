import React, { useCallback, useEffect, useState } from "react";
import {
  ProfileProductTitle,
  ProfileProductUl,
  ProfileProductWrapper,
} from "./ProfileProduct.styles";
import ProfileProductList from "./ProfileProductList";
import {
  PostNoneImg,
  PostNoneText,
  PostNoneWrapper,
} from "../../../../components/commons/postList/postList.styles"
import ProductNoneImgIcon from "../../../../img/symbol-logo-404.svg";
import { productListAPI } from "../../../../API/productAPI";

export default function ProfileProduct({
  onClickButton,
  settingPostModalProps,
  closeModal,
  userData
}) {
  const [productData, setProductData] = useState([]);
  const [isNoneProductData, setIsNoneProductData] = useState(false);

  const fetchProdcutData = useCallback(async () => {
    try {
      const response = await productListAPI(userData.accountname);
      setProductData(response);
      if (response.length === 0) {
        setIsNoneProductData(true);
      } else {
        setIsNoneProductData(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userData]);

  useEffect(() => {
    if (userData.accountname) {
      fetchProdcutData();
    }
  }, [userData]);
  return (
    <ProfileProductWrapper>
      <ProfileProductTitle>판매 중인 상품</ProfileProductTitle>
      {isNoneProductData ? (
        <PostNoneWrapper>
          <PostNoneImg src={ProductNoneImgIcon} alt="게시물 없음 아이콘" />
          <PostNoneText>현재 판매 중인 상품이 없어요.</PostNoneText>
        </PostNoneWrapper>
      ) : (
        <ProfileProductUl>
          {productData &&
            productData.map((product) => {
              return (
                <ProfileProductList
                  key={product.id}
                  onClickButton={onClickButton}
                  settingPostModalProps={settingPostModalProps}
                  closeModal={closeModal}
                  productList={product}
                  reFetchProdcutData={fetchProdcutData}
                />
              );
            })}
        </ProfileProductUl>
      )}
    </ProfileProductWrapper>
  );
}
