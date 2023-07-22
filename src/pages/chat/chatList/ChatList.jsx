import React, { useContext } from "react";
import { ChatListLi, ChatListUl } from "./chatList.style";
import userImg from "../../../img/basic-profile.svg";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import PostModal from "../../../components/commons/postModal/PostModal";
import { ModalContext } from "../../../context/ModalContext";
import MenuBar from "../../../components/commons/menuBar/MenuBar";
import TopButton from "../../../components/commons/topButton/TopButton";
import UserInfo from "../../../components/commons/userInfo/UserInfo";

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
        <ChatListLi className={"active"}>
          <UserInfo
            userData={{
              username: "cooll_bob_ross",
              accountname: "cooll_bob_ross",
              image: userImg,
            }}
            right={"date"}
            bottom={"chat"}
            lastChat={"자유롭게 대화 하세요~"}
            date={"2023.06.10"}
          />
        </ChatListLi>

        <ChatListLi className={"active"}>
          <UserInfo
            userData={{
              username: "알쏭달쏭그림가게",
              accountname: "i_love_my_thing",
              image: userImg,
            }}
            right={"date"}
            bottom={"chat"}
            lastChat={"네, 그림 요청 받았습니다."}
            date={"2023.06.10"}
          />
        </ChatListLi>

        <ChatListLi className={"active"}>
          <UserInfo
            userData={{
              username: "나라 사랑 공예 사랑",
              accountname: "i_love_my_craft",
              image: userImg,
            }}
            right={"date"}
            bottom={"chat"}
            lastChat={"한정판 수제 공예품 팔아요! 지금 바로 확인해보세요."}
            date={"2023.06.13"}
          />
        </ChatListLi>

        <ChatListLi>
          <UserInfo
            userData={{
              username: "링링",
              accountname: "acc_acc",
              image: userImg,
            }}
            right={"date"}
            bottom={"chat"}
            lastChat={
              "귀여운 수제 키링 판매! 오픈 이벤트에 참여 하고 경품 받아가세요!"
            }
            date={"2023.06.23"}
          />
        </ChatListLi>
      </ChatListUl>
      <TopButton />
      <MenuBar />
      <PostModal menuList={[{ name: "초대" }]} />
    </>
  );
}
