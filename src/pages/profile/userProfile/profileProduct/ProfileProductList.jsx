import React, { useCallback, useContext } from "react";
import {
  ProfileProductImg,
  ProfileProductLi,
  ProfileProductButton,
  ProfileProductName,
  ProfileProductPrice,
} from "./ProfileProduct.styles";
import noImg from "../../../../img/no-image.png";
import { useNavigate, useParams } from "react-router-dom";
import { AccountContext } from "../../../../context/AccountContext";
import { productDeleteAPI } from "../../../../API/productAPI";

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
  const { account } = useContext(AccountContext);
  const onClickRemove = useCallback(async (id) => {
    try {
      await productDeleteAPI(id);
    } catch (error) {
      alert(error);
      reFetchProdcutData();
    }
  }, []);

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
          <ProfileProductImg
            src={productList.itemImage}
            alt="상품 이미지"
            onError={(e) => (e.target.src = noImg)}
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
