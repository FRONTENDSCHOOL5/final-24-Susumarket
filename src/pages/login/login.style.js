import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--color-sub);
  animation: fadeIn 1s;
  @keyframes fadeIn{
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
}
`;

export const LoginSelectWrapper = styled.ul`
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  position: absolute;
  padding: 50px 30px;
  width: 100%;
  bottom: 0;
  animation: downUp 1.5s;

  @keyframes downUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;

export const LoginLionImg = styled.img`
  position: absolute;
  top: 204px;
  left: 50%;
  transform: translateX(-50%);
  animation: sacleUp 1s;
`;

export const LoginSelectLi = styled.li`
  width: 322px;
  height: 44px;
  :last-child {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 8px;
  }
`;

export const LoginSelectBtn = styled.button`
  background: url(${(props) => props.logo}) no-repeat center left 17px / 24px
    24px;
  width: 100%;
  border: 1px solid ${(props) => props.color};
  border-radius: 30px;
  padding: 13px 87px;
  color: #767676;
  :hover {
    background-color: #eee;
  }
`;

export const LoginLink = styled(Link)`
  font-size: 12px;
  color: #767676;
  :first-child::after {
    content: "";
    width: 0.5px;
    height: 10px;
    margin-left: 12px;
    background-color: #767676;
    display: inline-block;
  }
`;