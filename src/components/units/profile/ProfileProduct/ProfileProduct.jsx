import React from "react";
import {
  ProfileProductTitle,
  ProfileProductUl,
  ProfileProductWrapper,
} from "./ProfileProduct.styles";
import ProfileProductList from "./ProfileProductList";

export default function ProfileProduct({
  onClickButton,
  settingPostModalProps,
  closeModal,
}) {
  return (
    <ProfileProductWrapper>
      <ProfileProductTitle>판매 중인 상품</ProfileProductTitle>
      <ProfileProductUl>
        <ProfileProductList
          onClickButton={onClickButton}
          settingPostModalProps={settingPostModalProps}
          closeModal={closeModal}
        />
      </ProfileProductUl>
    </ProfileProductWrapper>
  );
}
