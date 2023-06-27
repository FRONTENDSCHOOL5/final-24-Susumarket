import styled from "styled-components";

export const InvalidWrapper = styled.section`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

export const InvalidTitle = styled.h2``

export const InvalidImg = styled.img`
  width: 110px;
  height: 110px;
  vertical-align: top;
  margin-bottom: 12px;
  &.large{
    width: 200px;
    height: 200px;
  }
`
export const InvalidText = styled.p`
  text-align: center;
  color: #767676;
  margin-bottom: 12px;
  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
`