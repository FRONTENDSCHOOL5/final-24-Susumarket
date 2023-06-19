import React from "react";
import {
  ProfileProductImg,
  ProfileProductLi,
  ProfileProductButton,
  ProfileProductName,
  ProfileProductPrice,
} from "./ProfileProduct.styles";
import { useNavigate } from "react-router-dom";

export default function ProfileProductList({
  onClickButton,
  closeModal,
  settingPostModalProps,
}) {
  function onClickProduct() {
    settingPostModalProps([
      {
        name: "삭제",
        func: () => {
          onClickButton("정말 삭제하시겠습니까?", "삭제", () => {
            closeModal();
            alert("삭제");
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
          <ProfileProductImg src="#" alt="상품 이미지"/>
          <ProfileProductName>테스트 상품</ProfileProductName>
          <ProfileProductPrice>100원</ProfileProductPrice>
        </ProfileProductButton>
      </ProfileProductLi>

      <ProfileProductLi>
        <ProfileProductButton onClick={onClickProduct}>
          <ProfileProductImg src="#" alt="상품 이미지"/>
          <ProfileProductName>테스트 상품</ProfileProductName>
          <ProfileProductPrice>100원</ProfileProductPrice>
        </ProfileProductButton>
      </ProfileProductLi>

      <ProfileProductLi>
        <ProfileProductButton onClick={onClickProduct}>
          <ProfileProductImg src="#" alt="상품 이미지"/>
          <ProfileProductName>테스트 상품</ProfileProductName>
          <ProfileProductPrice>100원</ProfileProductPrice>
        </ProfileProductButton>
      </ProfileProductLi>

      <ProfileProductLi>
        <ProfileProductButton onClick={onClickProduct}>
          <ProfileProductImg src="#" alt="상품 이미지"/>
          <ProfileProductName>테스트 상품</ProfileProductName>
          <ProfileProductPrice>100원</ProfileProductPrice>
        </ProfileProductButton>
      </ProfileProductLi>

      <ProfileProductLi>
        <ProfileProductButton onClick={onClickProduct}>
          <ProfileProductImg src="#" alt="상품 이미지"/>
          <ProfileProductName>테스트 상품</ProfileProductName>
          <ProfileProductPrice>100원</ProfileProductPrice>
        </ProfileProductButton>
      </ProfileProductLi>
    </>
  );
}
