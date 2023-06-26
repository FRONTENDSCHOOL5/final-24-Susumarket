import React, { useContext, useEffect, useState } from "react";
import {
  ChatRoomDate,
  ChatRoomLi,
  ChatRoomMsg,
  ChatRoomMsgInput,
  ChatRoomMsgInputForm,
  ChatRoomMsgWrapper,
  ChatRoomSubmitBtn,
  ChatRoomUl,
  ChatRoomUserImg,
  ChatRoomWrapper,
  ChatRoomImgBtn,
  ChatRoomImgMsg,
  ChatRoomBtnSpan,
} from "./chatRoom.style";
import userImg from "../../../img/basic-profile.svg";
import catImg from "../../../img/cat.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalContext } from "../../../context/ModalContext";
import PostModal from "../../../components/commons/postModal/PostModal";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import ConfirmModal from "../../../components/commons/confirmModal/confirmModal";
import TopButton from "../../../components/commons/topButton/TopButton";

export default function ChatRoom() {
  const [msgValue, setMsgValue] = useState("");

  // 화면의 크기에 따라 채팅방 높이를 조절하기 위한 채팅방 높이 값
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        middle={"text"}
        title={"채팅방"}
        text={
          pathnameNum === "1"
            ? "coolll_bob_ross"
            : pathnameNum === "2"
            ? "그림쟁이"
            : pathnameNum === "3"
            ? "수제 핸드 메이드 가방"
            : "귀여운 수제 키링"
        }
        onClickButton={() => setIsOpenPostModal(true)}
      />

      <ChatRoomWrapper height={height}>
        <ChatRoomUl>
          {pathnameNum === "1" ? (
            <>
              <ChatRoomLi>
                <ChatRoomUserImg src={userImg} alt="유저 프로필 이미지" />
                <ChatRoomMsgWrapper>
                  <ChatRoomMsg>자유롭게 대화 하세요~</ChatRoomMsg>
                </ChatRoomMsgWrapper>
                <ChatRoomDate dateTime="2023-06-08">13:00</ChatRoomDate>
              </ChatRoomLi>
            </>
          ) : (
            <>
              <ChatRoomLi>
                <ChatRoomUserImg src={userImg} alt="유저 프로필 이미지" />
                <ChatRoomMsgWrapper>
                  <ChatRoomMsg>그림 요청하고 싶어요.</ChatRoomMsg>
                </ChatRoomMsgWrapper>
                <ChatRoomDate dateTime="2023-06-10">12:08</ChatRoomDate>
              </ChatRoomLi>

              <ChatRoomLi className="sent">
                <ChatRoomUserImg src={userImg} alt="유저 프로필 이미지" />
                <ChatRoomMsgWrapper>
                  <ChatRoomMsg>네. 어떤 그림인지 말해주세요.</ChatRoomMsg>
                </ChatRoomMsgWrapper>
                <ChatRoomDate dateTime="2023-06-10">12:15</ChatRoomDate>
              </ChatRoomLi>

              <ChatRoomLi>
                <ChatRoomUserImg src={userImg} alt="유저 프로필 이미지" />
                <ChatRoomMsgWrapper className="imgMsg">
                  <ChatRoomImgMsg src={catImg} alt="이미지 메세지" />
                </ChatRoomMsgWrapper>
                <ChatRoomDate dateTime="2023-06-10">12:30</ChatRoomDate>
              </ChatRoomLi>

              <ChatRoomLi>
                <ChatRoomUserImg src={userImg} alt="유저 프로필 이미지" />
                <ChatRoomMsgWrapper>
                  <ChatRoomMsg>
                    저희 고양이 사진인데 이거 가능한가요?
                  </ChatRoomMsg>
                </ChatRoomMsgWrapper>
                <ChatRoomDate dateTime="2023-06-10">12:30</ChatRoomDate>
              </ChatRoomLi>

              <ChatRoomLi className="sent">
                <ChatRoomUserImg src={userImg} alt="유저 프로필 이미지" />
                <ChatRoomMsgWrapper>
                  <ChatRoomMsg>네, 가능합니다!</ChatRoomMsg>
                </ChatRoomMsgWrapper>
                <ChatRoomDate dateTime="2023-06-10">12:40</ChatRoomDate>
              </ChatRoomLi>

              <ChatRoomLi>
                <ChatRoomUserImg src={userImg} alt="유저 프로필 이미지" />
                <ChatRoomMsgWrapper>
                  <ChatRoomMsg>그럼 그림 부탁드릴게요~</ChatRoomMsg>
                </ChatRoomMsgWrapper>
                <ChatRoomDate dateTime="2023-06-10">12:45</ChatRoomDate>
              </ChatRoomLi>

              <ChatRoomLi className="sent">
                <ChatRoomUserImg src={userImg} alt="유저 프로필 이미지" />
                <ChatRoomMsgWrapper>
                  <ChatRoomMsg>네, 그림 요청 받았습니다.</ChatRoomMsg>
                </ChatRoomMsgWrapper>
                <ChatRoomDate dateTime="2023-06-10">12:45</ChatRoomDate>
              </ChatRoomLi>
            </>
          )}
        </ChatRoomUl>
      </ChatRoomWrapper>

      <ChatRoomMsgInputForm onSubmit={onSubmitMsg}>
        <ChatRoomImgBtn type="button">
          <ChatRoomBtnSpan className="a11y-hidden">
            이미지 업로드
          </ChatRoomBtnSpan>
        </ChatRoomImgBtn>
        <ChatRoomMsgInput
          onChange={onChangeMsg}
          value={msgValue}
          placeholder="메세지 입력하기"
        />
        <ChatRoomSubmitBtn type="button" value={msgValue} onClick={onSubmitMsg}>
          전송
        </ChatRoomSubmitBtn>
      </ChatRoomMsgInputForm>
      <ConfirmModal
        confirmMessage={"정말 나가시겠습니까?"}
        cancelMessage={"취소"}
        submitMessage={"나가기"}
        handleSubmit={() => {
          onClickExit();
        }}
      />
      <TopButton />
      <PostModal
        menuList={[
          { name: "채팅방 나가기", func: () => setIsOpenConfirmModal(true) },
        ]}
      />
    </>
  );
}
