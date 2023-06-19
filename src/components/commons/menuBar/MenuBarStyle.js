import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 10px;
  line-height: 14px;
  font-weight: 400;
  border-top: 1px solid #dbdbdb;
`;

export const MenuBarUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 6px;
`;

export const MenuBarLi = styled.li`
  max-width: 84px;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 84px;
  gap: 4px;
  + li {
    margin-left: 14px;
  }
`;

export const LinkStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.4rem;
  list-style: none;
  text-decoration: none;
  gap: 4px;
  p {
    color: #767676;
  }
`;

export const Img = styled.img`
  width: 24px;
  height: 24px;
`;
