import styled from "styled-components";

export const Img = styled.img`
  transition: all 0.5s;
  &.loading {
    filter: blur(10px);
    
  }
  &.loaded {
    filter: blur(0px);
  }
`;
