import React, { useContext, useState } from "react";
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
} from "./ChatRoom.style";
import userImg from "../../../img/basic-profile.svg";
import imgBtn from "../../../img/img-button.svg";
import imgBtnActive from "../../../img/img-button-active.svg";
import catImg from "../../../img/cat.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalContext } from "../../../context/ModalContext";
import PostModal from "../../../components/commons/postModal/PostModal";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import ConfirmModal from "../../../components/commons/confirmModal/confirmModal";

export default function ChatRoom() {
  const [msgValue, setMsgValue] = useState("");
  const [isHoverImgBtn, setIsHoverImgBtn] = useState(false);
  const { setIsOpenConfirmModal, setIsOpenPostModal } =
    useContext(ModalContext);

  const location = useLocation();
  const navgate = useNavigate();
  const pathnameNum = location.pathname.slice(10, 11);

  function onChangeMsg(e) {
    setMsgValue(e.target.value);
  }

  function onClickExit() {
    navgate("/chatList");
    setIsOpenConfirmModal(false);
    setIsOpenPostModal(false);
  }

  function onSubmitMsg(e) {
    e.preventDefault();
    setMsgValue("");
  }

  return (
    <>
      <NewTopHeader
        left={"back"}
        right={"more"}
        title={"채팅방"}
        text={
          pathnameNum === "1"
            ? "그림 그려드림"
            : pathnameNum === "2"
            ? "수제 핸드 메이드 가방"
            : "귀여운 수제 키링"
        }
        onClickButton={() => setIsOpenPostModal(true)}
      />
      <ChatRoomWrapper>
        <ChatRoomUl>
          <ChatRoomLi>
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper>
              <ChatRoomMsg>그림 요청하고 싶어요.</ChatRoomMsg>
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:08</ChatRoomDate>
          </ChatRoomLi>

          <ChatRoomLi className="sent">
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper>
              <ChatRoomMsg>네. 어떤 그림인지 말해주세요.</ChatRoomMsg>
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:15</ChatRoomDate>
          </ChatRoomLi>

          <ChatRoomLi>
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper className="imgMsg">
              <ChatRoomImgMsg src={catImg} />
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:30</ChatRoomDate>
          </ChatRoomLi>

          <ChatRoomLi>
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper>
              <ChatRoomMsg>저희 고양이 사진인데 이거 가능한가요?</ChatRoomMsg>
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:30</ChatRoomDate>
          </ChatRoomLi>

          <ChatRoomLi className="sent">
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper>
              <ChatRoomMsg>네, 가능합니다!</ChatRoomMsg>
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:40</ChatRoomDate>
          </ChatRoomLi>

          <ChatRoomLi>
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper>
              <ChatRoomMsg>그럼 그림 부탁드릴게요~</ChatRoomMsg>
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:45</ChatRoomDate>
          </ChatRoomLi>

          <ChatRoomLi className="sent">
            <ChatRoomUserImg src={userImg} />
            <ChatRoomMsgWrapper>
              <ChatRoomMsg>네, 그림 요청 받았습니다.</ChatRoomMsg>
            </ChatRoomMsgWrapper>
            <ChatRoomDate dateTime="2013.06.08">12:45</ChatRoomDate>
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
      <ConfirmModal
        confirmMessage={"정말 나가시겠습니까?"}
        cancelMessage={"취소"}
        submitMessage={"나가기"}
        handleSubmit={() => {
          onClickExit();
        }}
      />
      <PostModal
        menuList={[
          { name: "채팅방 나가기", func: () => setIsOpenConfirmModal(true) },
        ]}
      />
    </>
  );
}
