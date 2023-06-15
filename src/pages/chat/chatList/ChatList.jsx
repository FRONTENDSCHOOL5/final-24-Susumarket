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
              <ChatListUserName>애월읍 위니브 감귤농장</ChatListUserName>
              <ChatListLastChat>이번엔 정정 언제하맨마씸?</ChatListLastChat>
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
              <ChatListUserName>제주감귤마을</ChatListUserName>
              <ChatListLastChat>
                깊은 어둠의 존재감, 롤스로이스 뉴 블랙 배지를 보러오세요!
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
              <ChatListUserName>누구네 농장 친황경 한라봉</ChatListUserName>
              <ChatListLastChat>
                내 차는 내가 평가한다. 오픈 이벤트에 참여 하고 경품 받아가세요!
              </ChatListLastChat>
            </ChatListInfo>
            <ChatListDate dateTime="2023-06-10">2023.06.23</ChatListDate>
          </ChatListLink>
        </ChatListLi>
      </ChatListUl>
    </>
  );
}
