import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProfileInfoWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px 0;
  border-bottom: 0.5px solid rgb(219, 219, 219);
  background: rgb(255, 255, 255);
`;
export const ProfileInfoTitle = styled.h2``;

export const UserInfo = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;
export const ProfileInfoFollowers = styled(Link)`
  display: block;
`;
export const ProfileInfoFollowersCount = styled.strong`
  display: block;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 6px;
`;
export const ProfileInfoFollowersText = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #767676;
`;
export const ProfileInfoeImg = styled.img`
  width: 110px;
  height: 110px;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  margin-bottom: 16px;
`;
export const ProfileInfoFollowering = styled(Link)``;
export const ProfileInfoFolloweringCount = styled(ProfileInfoFollowersCount)``;
export const ProfileInfoFolloweringText = styled(ProfileInfoFollowersText)``;

export const ProfileInfoUserNameWrapper = styled.div``;
export const ProfileInfoUserId = styled.span`
  display: block;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 6px;
`;
export const ProfileInfoUserAccountName = styled.span`
  display: block;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #767676;
  margin-bottom: 16px;
  ::before {
    content: "@";
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #767676;
    margin-right: 3px;
  }
`;
export const ProfileInfoIntro = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #767676;
  margin-bottom: 24px;
`;
export const ProfuleInfoButtonWrapper = styled.div`
  Button:not(:last-child) {
    margin-right: 10px;
  }
`;
