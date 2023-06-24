import React from "react";
import Button from "../../../components/commons/button/Button";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import LionImage from "../../../img/symbol-logo-gray.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MenuBar from "../../../components/commons/menuBar/MenuBar";
const UserSearchWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 180px;
  @media (max-height: 500px) {
    margin-top: 70px;
  }
  @media (min-height: 500px) and (max-height: 600px) {
    margin-top: 120px;
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin: auto;
  // vertical-align: middle;
`;
const Content = styled.div`
  font-size: 15px;
  color: #767676;
  margin: 15px 0px;
`;

export default function Post() {
  const navigate = useNavigate();
  const clickSearchBtn = () => {
    navigate("/search");
  };
  return (
    <>
      <NewTopHeader
        left="text"
        text="수수마켓 피드"
        right="search"
        title="수수마켓 피드"
      ></NewTopHeader>
      <UserSearchWrapper>
        <Img src={LionImage} alt="유저 검색 이미지" />
        <Content>유저를 검색해 팔로우 해보세요!</Content>
        <Button className="ms" onClick={clickSearchBtn}>
          검색하기
        </Button>
      </UserSearchWrapper>
      <MenuBar />
    </>
  );
}
