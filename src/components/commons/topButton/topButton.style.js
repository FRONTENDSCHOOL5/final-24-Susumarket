import styled from "styled-components";
import img from "../../../img/TopButton.svg";
import imgWebp from "../../../img/webp/TopButton.webp";

export const Button = styled.button`
  position: fixed;
  bottom: 100px;
  right: 30px;
  height: 36px;
  width: 36px;
  body.webp & {
    background-image: url(${imgWebp});
  }
  body.no-Webp &{
    background-image: url(${img});
  }
  background-color: rgba(0, 0, 0, 0);
  animation: fadeIn 0.5s;
  @media screen and (max-width: 500px) {
    right: 10px;
    bottom: 80px;
  }
  &.inactive {
    animation: fadeOut 0.5s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
