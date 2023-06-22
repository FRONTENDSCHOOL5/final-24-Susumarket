import styled from "styled-components";

export const UserProfileWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100vh;
  background-color: #f2f2f2;
`
export const UserUndefinedWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
export const UserUndefinedImg = styled.img`
  width: 158px;
  height: 158px;
  vertical-align: top;
  margin-bottom: 20px;
`;

export const UserUndefinedText = styled.p`
  text-align: center;
  color: #767676;
`;
