import React, { useContext } from "react";
import {
  ChatListDate,
  ChatListInfo,
  ChatListLastChat,
  ChatListLi,
  ChatListLink,
  ChatListUl,
  ChatListUserImg,
  ChatListUserImgWrapper,
  ChatListUserName,
} from "./chatList.style";
import userImg from "../../../img/basic-profile.svg";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import PostModal from "../../../components/commons/postModal/PostModal";
import { ModalContext } from "../../../context/ModalContext";
import MenuBar from "../../../components/commons/menuBar/MenuBar";

export default function ChatList() {
  const { setIsOpenPostModal } = useContext(ModalContext);
  return (
    <>
      <NewTopHeader
        left={"back"}
        right={"more"}
        title={"채팅 리스트"}
        onClickButton={() => setIsOpenPostModal(true)}
      />
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
      <MenuBar />
      <PostModal menuList={[{ name: "초대" }]} />
    </>
  );
}
