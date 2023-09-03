import React from "react";
import NewTopHeader from "../../../../components/commons/newTopHeader/NewTopHeader";
import InvalidPage from "../../../../components/commons/inValidPage/InvaliPage";
import Loading from "../../../../components/commons/loading/Loading";
import noImg from "../../../../img/no-image.svg";
import profileImg from "../../../../img/ProfileImg.svg"
import noImgWebp from "../../../../img/webp/no-image.webp";
import profileImgWebp from "../../../../img/webp/ProfileImg.webp";
import { resolveWebp } from "../../../../library/checkWebpSupport";

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
  setHeartFill
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
              e.target.src = resolveWebp(noImgWebp, noImg);
            }}
          />
          <Profile>
            <Icon
              src={profile.includes("Ellipse.png") ? resolveWebp(profileImgWebp, profileImg) : profile}
              alt="프로필 이미지"
              onError={(e) => {
                e.target.src = resolveWebp(profileImgWebp, profileImg);
              }}
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
            <HeartIcon heartFill={heartFill} onClick={clickHeart} alt="좋아요" />
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
