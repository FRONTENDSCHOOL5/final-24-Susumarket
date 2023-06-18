import { Link } from "react-router-dom";
import styled from "styled-components";

export const ChatListTitle = styled.h1``;

export const ChatListUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 16px;
  position: relative;
`;

export const ChatListLi = styled.li``;

export const ChatListLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
`;
export const ChatListInfo = styled.div`
  width: calc(100% - 120px);
`;

export const ChatListUserImgWrapper = styled.div`
  position: relative;
  width: 42px;
  height: 42px;
  margin-right: 12px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  &.active::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 12px;
    height: 12px;
    background-color: var(--color-primary);
    border-radius: 50%;
  }
`;

export const ChatListUserImg = styled.img`
  width: 42px;
  height: 42px;
`;

export const ChatListUserName = styled.h2`
  font-size: 14px;
  font-weight: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatListLastChat = styled.p`
  font-size: 12px;
  color: #767676;
  margin-top: 5px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatListDate = styled.time`
  font-size: 10px;
  color: #dbdbdb;
  align-self: flex-end;
  margin-bottom: 6px;
`;
