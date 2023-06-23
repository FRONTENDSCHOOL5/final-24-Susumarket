import React, { useCallback, useContext } from "react";
import {
  ProfileProductImg,
  ProfileProductLi,
  ProfileProductButton,
  ProfileProductName,
  ProfileProductPrice,
} from "./ProfileProduct.styles";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../../../../library/customAxios";
import { UserContext } from "../../../../context/UserContext";

export default function ProfileProductList({
  onClickButton,
  closeModal,
  settingPostModalProps,
  productList,
  reFetchProdcutData,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const userAccountname = params.userId;
  const { account } = useContext(UserContext);
  const onClickRemove = useCallback(async (id) => {
    try {
      await customAxios.delete(`product/${id}`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function onClickProduct() {
    if (userAccountname !== account) {
      navigate(`/product/${productList.id}`);
    } else {
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
            navigate(`/product/${productList.id}/edit`);
          },
        },
        {
          name: "웹 사이트에서 상품 보기",
          func: () => {
            closeModal();
            navigate(`/product/${productList.id}`);
          },
        },
      ]);
    }
  }

  return (
    <>
      <ProfileProductLi>
        <ProfileProductButton type="button" onClick={onClickProduct}>
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
