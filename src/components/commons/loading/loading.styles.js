import styled from "styled-components";

export const Background = styled.div`
  position: relative;
  height: calc(100vh - 115px);
  background: #ffffffb7;
  z-index: 999;
`;

export const LoadingImg = styled.img`
  vertical-align: top;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
