import styled from "styled-components";

export const ChatListTitle = styled.h1``;

export const ChatListUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 16px;
  position: relative;
`;

export const ChatListLi = styled.li`
  position: relative;
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
