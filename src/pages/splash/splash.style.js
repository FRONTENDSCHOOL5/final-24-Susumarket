import styled from "styled-components";

export const SplashWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 17px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

export const SplashTitle = styled.h2``
export const SplashLionImg = styled.img`
animation: move 2s infinite;
@keyframes move {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
`
export const SplashTextImg = styled.img``

