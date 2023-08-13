import React from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import styled from "styled-components";
import noImg from "../../../../img/no-image.png";
import iconHeart from "../../../../img/webp/icon-heart.webp";
import iconHeartFill from "../../../../img/webp/icon-heart-fill.webp";
import Button from "../../../../components/commons/button/Button";
import InvalidPage from "../../../../components/commons/inValidPage/InvaliPage";
import Loading from "../../../../components/commons/loading/Loading";
import {
  ProfileDiv,
  ContentDiv,
  Btn,
  Bottom,
  Title,
  Div,
  Image,
  Nickname,
  Icon,
  HeartIcon,
  Profile,
  Price,
  Contents,
  Account,
} from "./productDetail.style.js";
import profileImg from "../../../../img/webp/ProfileImg.webp";

export default function ProductDetailPresenter({
  itemName,
  price,
  link,
  itemImage,
  name,
  profile,
  accountname,
  heartFill,
  isInValidPage,
  isLoading,
  clickHeart,
  newPrice,
  navigate,
}) {
  return (
    <>
      <NewTopHeader left={"back"} right={""} title={"상품 상세 페이지"} />
      {isLoading ? (
        <Loading />
      ) : !isInValidPage ? (
        <Div>
          <Image
            src={itemImage}
            alt="상품 사진"
            onError={(e) => {
              e.target.src = noImg;
            }}
          />
          <Profile>
            <Icon
              src={profile.includes("Ellipse.png") ? profileImg : profile}
              alt="프로필 이미지"
            />
            <ContentDiv>
              <ProfileDiv>
                <Nickname>{name}</Nickname>
                <Account>@{accountname} </Account>
              </ProfileDiv>
              <Title>{itemName}</Title>
              <Contents>{link}</Contents>
            </ContentDiv>
          </Profile>
          <Bottom>
            <HeartIcon src={heartFill} onClick={clickHeart} alt="좋아요" />
            <span
              style={{
                fontSize: "31px",
                marginRight: "15px",
                marginLeft: "15px",
                color: "#CDCDCD",
              }}
            >
              |
            </span>
            <Price>{newPrice}원</Price>
            <Btn
              className="ms"
              onClick={() => {
                navigate("/chatList/1");
              }}
            >
              채팅하기
            </Btn>
          </Bottom>
        </Div>
      ) : (
        <InvalidPage text={"현재 판매중인 상품이 아닙니다."} size={"large"} />
      )}
    </>
  );
}
