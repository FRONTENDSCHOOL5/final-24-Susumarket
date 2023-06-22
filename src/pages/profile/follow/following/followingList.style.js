import styled from "styled-components";
import { Link } from "react-router-dom";

export const FollowingListUl = styled.ul`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  max-width: 390px;
`;

export const FollowingListLi = styled.li`
  display: flex;
  margin-bottom: 16px;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

export const FollowingListLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 358px;
`;

export const UserWrapper = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  width: 250px;
`;

export const UserName = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

export const UserIntro = styled.strong`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  width: 220px;
  color: #767676;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FollowButton = styled.button`
  padding: 7px 11px;
  min-width: 56px;
  background-color: #b51215;
  color: #fff;
  font-size: 12px;
  line-height: 15px;
  border-radius: 28px;
  height: 28px;
`;
