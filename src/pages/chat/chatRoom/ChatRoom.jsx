import React, { useContext, useState } from "react";
import TopHeader from "../../../components/commons/topHeader/TopHeader";
import {
  ChatRoomDate,
  ChatRoomLi,
  ChatRoomMsg,
  ChatRoomMsgInput,
  ChatRoomMsgInputForm,
  ChatRoomMsgWrapper,
  ChatRoomImgBtnIcon,
  ChatRoomSubmitBtn,
  ChatRoomUl,
  ChatRoomUserImg,
  ChatRoomWrapper,
  ChatRoomImgBtn,
  ChatRoomImgMsg,
  ChatRoomTitle,
} from "./ChatRoom.style";
import userImg from "../../../img/basic-profile.svg";
import imgBtn from "../../../img/img-button.svg";
import imgBtnActive from "../../../img/img-button-active.svg";
import catImg from "../../../img/cat.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalContext } from "../../../context/ModalContext";
import PostModal from "../../../components/commons/postModal/PostModal";

export default function ChatRoom() {
  const [msgValue, setMsgValue] = useState("");
  const [isHoverImgBtn, setIsHoverImgBtn] = useState(false);
  const { setIsOpenPostModal } = useContext(ModalContext);

  const location = useLocation();
  const navgate = useNavigate();
  const pathnameNum = location.pathname.slice(10, 11);

  function onChangeMsg(e) {
    setMsgValue(e.target.value);
  }

  function onClickExit() {
    navgate("/chatList");
    setIsOpenPostModal(false);
  }

  function onSubmitMsg(e) {
    e.preventDefault();
    setMsgValue("");
  }

  return (
    <>
      <ChatRoomTitle className="a11y-hidden">채팅방</ChatRoomTitle>
      <TopHeader
        type="chat"
        username={
          pathnameNum === "1"
            ? "애월읍 감귤 농장"
            : pathnameNum === "2"
            ? "제주감귤마을"
            : "누구네 농장 친환경 한라봉"
        }
      />
      <ChatRoomWrapper>
        <ChatRoomUl>
          <ChatRoomLi>
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper>
              <ChatRoomMsg>
                옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,
                뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할
                넣는 풍부하게 뛰노는 인생의 힘있다.
              </ChatRoomMsg>
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:08</ChatRoomDate>
          </ChatRoomLi>

          <ChatRoomLi>
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper>
              <ChatRoomMsg>감귤 사고 싶어어어요~~!</ChatRoomMsg>
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:08</ChatRoomDate>
          </ChatRoomLi>

          <ChatRoomLi className="sent">
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper>
              <ChatRoomMsg>네 말씀하세요.</ChatRoomMsg>
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:15</ChatRoomDate>
          </ChatRoomLi>

          <ChatRoomLi className="sent">
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper className="imgMsg">
              <ChatRoomImgMsg src={catImg} />
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:30</ChatRoomDate>
          </ChatRoomLi>
        </ChatRoomUl>
      </ChatRoomWrapper>
      <ChatRoomMsgInputForm onSubmit={(e) => onSubmitMsg(e)}>
        <ChatRoomImgBtn
          type="button"
          onMouseMove={() => setIsHoverImgBtn(true)}
          onMouseLeave={() => setIsHoverImgBtn(false)}
        >
          <ChatRoomImgBtnIcon
            src={isHoverImgBtn ? imgBtnActive : imgBtn}
            alt="이미지 등록"
          />
        </ChatRoomImgBtn>
        <ChatRoomMsgInput
          onChange={onChangeMsg}
          value={msgValue}
          placeholder="메세지 입력하기"
        />
        <ChatRoomSubmitBtn value={msgValue}>전송</ChatRoomSubmitBtn>
      </ChatRoomMsgInputForm>

      <PostModal menuList={[{name:"채팅방 나가기", func: onClickExit}]}/>
    </>
  );
}
