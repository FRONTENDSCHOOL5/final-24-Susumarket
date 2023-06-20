import React, { useCallback } from "react";
import {
  ProfileProductImg,
  ProfileProductLi,
  ProfileProductButton,
  ProfileProductName,
  ProfileProductPrice,
} from "./ProfileProduct.styles";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../../../library/customAxios";

export default function ProfileProductList({
  onClickButton,
  closeModal,
  settingPostModalProps,
  productList,
  reFetchProdcutData,
}) {
  const onClickRemove = useCallback(async (id) => {
    try {
      await customAxios.delete(`product/${id}`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function onClickProduct() {
    settingPostModalProps([
      {
        name: "삭제",
        func: () => {
          onClickButton("정말 삭제하시겠습니까?", "삭제", async () => {
            await onClickRemove(productList.id);
            reFetchProdcutData();
            closeModal();
          });
        },
      },
      {
        name: "수정",
        func: () => {
          closeModal();
          navigate("/product/prductId/edit");
        },
      },
      {
        name: "웹 사이트에서 상품 보기",
        func: () => {
          closeModal();
          navigate("/product/prductId");
        },
      },
    ]);
  }
  const navigate = useNavigate();
  return (
    <>
      <ProfileProductLi>
        <ProfileProductButton onClick={onClickProduct}>
          <ProfileProductImg src={productList.itemImage} alt="상품 이미지" />
          <ProfileProductName>{productList.itemName}</ProfileProductName>
          <ProfileProductPrice>
            {productList.price.toLocaleString()} 원
          </ProfileProductPrice>
        </ProfileProductButton>
      </ProfileProductLi>
    </>
  );
}
