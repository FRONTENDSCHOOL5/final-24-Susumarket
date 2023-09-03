import React, { useCallback, useContext } from "react";
import {
  ProfileProductLi,
  ProfileProductButton,
  ProfileProductName,
  ProfileProductPrice,
} from "./ProfileProduct.styles";
import { useNavigate, useParams } from "react-router-dom";
import { AccountContext } from "../../../../context/AccountContext";
import { productDeleteAPI } from "../../../../API/productAPI";
import ProgressiveImg from "../../../../components/commons/progressiveImg/ProgressiveImg";

export default function ProfileProductList({
  onClickButton,
  closeModal,
  settingPostModalProps,
  productList,
  setProductData,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const userAccountname = params.userId;
  const { account } = useContext(AccountContext);
  const onClickRemove = async (id) => {
    await productDeleteAPI(id);
    setProductData((prev) => prev.filter((item) => item.id !== id));
  };

  // 현재 자신의 accountname과 account가 일치할때만 삭제 수정 버튼이 활성화 되도록함
  // 그렇지 않으면 그냥 상품 상세 페이지로 이동되도록 처리함
  function onClickProduct() {
    if (userAccountname && userAccountname !== account) {
      navigate(`/product/${productList.id}`);
    } else {
      settingPostModalProps([
        {
          name: "삭제",
          func: () => {
            onClickButton("정말 삭제하시겠습니까?", "삭제", "취소", () => {
              onClickRemove(productList.id);
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
          name: "상품 판매 상세 페이지로 이동",
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
          <ProgressiveImg
            src={productList.itemImage}
            alt="상품 이미지"
            style={{
              width: "140px",
              height: "90px",
              borderRadius: "8px",
              objectFit: "cover",
              border: "1px solid rgb(219, 219, 219)",
            }}
          />
          <ProfileProductName>{productList.itemName}</ProfileProductName>
          <ProfileProductPrice>
            {productList.price.toLocaleString()} 원
          </ProfileProductPrice>
        </ProfileProductButton>
      </ProfileProductLi>
    </>
  );
}
