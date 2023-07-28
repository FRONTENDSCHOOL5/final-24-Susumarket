import styled from "styled-components";
import IconModalBtn from "../../../img/icon-more-vertical.svg";
export const UserInfoWrapper = styled.div``;

export const UserProfileLink = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  width: 280px;
`;

export const UserProfileImg = styled.img`
  width: ${(props) => (props.commentDate ? "34px" : "42px")};
  height: ${(props) => (props.commentDate ? "34px" : "42px")};
  border: 0.5px solid #dbdbdb;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const UserIdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* width: calc(100% - 120px); */
  max-width: 220px;
  flex-grow: 1;
`;

export const UserNameWrapper = styled.div``;

export const UserName = styled.span`
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
`;

export const UserAccount = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #767676;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  max-width: 120px;
  ::before {
    content: "@";
    margin-right: 3px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #767676;
  }
`;

export const UserInfoModalBtn = styled.button`
  width: 24px;
  height: 24px;
  background: url(${IconModalBtn}) no-repeat center / 18px;
  align-self: flex-start;
  margin-top: 3px;
`;

export const UserInfoDate = styled.time`
  font-size: 10px;
  color: #dbdbdb;
  align-self: flex-end;
  margin-bottom: 6px;
`;

export const Intro = styled.p`
  font-size: 12px;
  color: #767676;
  margin-top: 5px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Chat = styled.p`
  font-size: 12px;
  color: #767676;
  margin-top: 5px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
