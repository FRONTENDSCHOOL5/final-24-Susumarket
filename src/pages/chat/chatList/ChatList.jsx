import React from "react";
import TopHeader from "../../../components/commons/topHeader/TopHeader";
import {
  ChatListDate,
  ChatListInfo,
  ChatListLastChat,
  ChatListLi,
  ChatListLink,
  ChatListTitle,
  ChatListUl,
  ChatListUserImg,
  ChatListUserImgWrapper,
  ChatListUserName,
} from "./chatList.style";
import userImg from "../../../img/basic-profile.svg";

export default function ChatList() {
  return (
    <>
      <TopHeader type="profile" />
      <ChatListTitle className="a11y-hidden">채팅리스트</ChatListTitle>
      <ChatListUl>
        <ChatListLi>
          <ChatListLink to="/chatList/1">
            <ChatListUserImgWrapper className="active">
              <ChatListUserImg src={userImg} alt="유저 프로필 이미지" />
            </ChatListUserImgWrapper>
            <ChatListInfo>
              <ChatListUserName>그림 그려 드려요 </ChatListUserName>
              <ChatListLastChat>네, 그림 요청 받았습니다.</ChatListLastChat>
            </ChatListInfo>
            <ChatListDate dateTime="2023-06-10">2023.06.10</ChatListDate>
          </ChatListLink>
        </ChatListLi>

        <ChatListLi>
          <ChatListLink to="/chatList/2">
            <ChatListUserImgWrapper className="active">
              <ChatListUserImg src={userImg} alt="유저 프로필 이미지" />
            </ChatListUserImgWrapper>
            <ChatListInfo>
              <ChatListUserName>수제 핸드 메이드 가방</ChatListUserName>
              <ChatListLastChat>
                한정판 수제 핸드 메이드 가방 팔아요! 지금 바로 확인해보세요.
              </ChatListLastChat>
            </ChatListInfo>
            <ChatListDate dateTime="2023-06-10">2023.06.13</ChatListDate>
          </ChatListLink>
        </ChatListLi>

        <ChatListLi>
          <ChatListLink to="/chatList/3">
            <ChatListUserImgWrapper>
              <ChatListUserImg src={userImg} alt="유저 프로필 이미지" />
            </ChatListUserImgWrapper>
            <ChatListInfo>
              <ChatListUserName>귀여운 수제 키링</ChatListUserName>
              <ChatListLastChat>
                귀여운 수제 키링 판매! 오픈 이벤트에 참여 하고 경품 받아가세요!
              </ChatListLastChat>
            </ChatListInfo>
            <ChatListDate dateTime="2023-06-10">2023.06.23</ChatListDate>
          </ChatListLink>
        </ChatListLi>
      </ChatListUl>
    </>
  );
}
