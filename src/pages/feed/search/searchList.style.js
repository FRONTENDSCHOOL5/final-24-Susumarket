import styled from "styled-components";
import { Link } from "react-router-dom";
import sampleImg from "../../../img/basic-profile.svg";

export const SearchListTitle = styled.h2``;

export const SearchListUl = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 390px;
  width: 100%;
`;

export const SearchListLi = styled.li`
  display: flex;
  margin-bottom: 16px;
  background-color: #fff;
`;

export const SearchListLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const SearchListImg = styled.img`
  background: url(${sampleImg}) no-repeat center center;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

export const UserId = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #767676;
`;
