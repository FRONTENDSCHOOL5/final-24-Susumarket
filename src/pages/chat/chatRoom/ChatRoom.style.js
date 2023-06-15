import styled from "styled-components";

export const ChatRoomTitle = styled.h1``;
export const ChatRoomWrapper = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: calc(100vh - 115px);
  position: relative;
  display: flex;
  flex-direction: column-reverse;
`;

export const ChatRoomUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  padding: 20px 16px 16px;
`;

export const ChatRoomMsgWrapper = styled.div`
  max-width: 240px;
  padding: 12px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 0 10px 10px 10px;
  &.imgMsg {
    padding: 0;
    background: none;
    border: 0;
  }
`;

export const ChatRoomUserImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
`;

export const ChatRoomLi = styled.li`
  display: flex;
  gap: 10px;
  &.sent {
    flex-direction: row-reverse;
  }
  &.sent ${ChatRoomMsgWrapper} {
    background-color: var(--color-primary);
    color: #fff;
    border-radius: 10px 0 10px 10px;
  }
  &.sent ${ChatRoomMsgWrapper}.imgMsg {
    padding: 0;
    background: none;
    border: 0;
  }
  &.sent ${ChatRoomUserImg} {
    display: none;
  }
`;

export const ChatRoomMsg = styled.p``;
export const ChatRoomDate = styled.time`
  align-self: flex-end;
  font-size: 10px;
  line-height: 10px;
  color: #767676;
`;
export const ChatRoomImgMsg = styled.img`
  width: 240px;
  height: 240px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
`;

export const ChatRoomMsgInputForm = styled.form`
  position: absolute;
  display: flex;
  gap: 10px;
  align-items: center;
  bottom: 0;
  padding: 10px;
  background-color: #fff;
  width: 100%;
`;
export const ChatRoomImgBtnIcon = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  fill: blue;
`;
export const ChatRoomImgBtn = styled.button`
  background: none;
  width: 44px;
  height: 44px;
`;

export const ChatRoomMsgInput = styled.input`
  flex-grow: 1;
  border: none;
  padding: 10px;
`;
export const ChatRoomSubmitBtn = styled.button`
  text-align: right;
  background: none;
  font-weight: 14px;
  color: ${(props) => (props.value ? "var(--color-primary)" : "#c4c4c4")};
`;

