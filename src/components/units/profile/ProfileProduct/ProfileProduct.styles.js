import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProfileProductWrapper = styled.section`
  overflow-x: scroll;
  padding: 20px;
  background-color: #fff;
  border: 1px solid rgb(219, 219, 219);
`;
export const ProfileProductTitle = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 16px;
`;

export const ProfileProductUl = styled.ul`
  display: flex;
  gap: 10px;
  height: 100%;
  padding-bottom: 20px;
  overflow: scroll hidden;
`;
export const ProfileProductLi = styled.li``;
export const ProfileProductButton = styled.button`
  background: none;
  display: flex;
  flex-direction: column;
`;
export const ProfileProductImg = styled.img`
  width: 140px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid rgb(219, 219, 219);
`;
export const ProfileProductName = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin: 6px 0px;
`;
export const ProfileProductPrice = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
`;
