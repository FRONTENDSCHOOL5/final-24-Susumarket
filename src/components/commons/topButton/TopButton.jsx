import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "../../../img/TopButton.svg";

const TopButton = () => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const MoveTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return <>{showBtn && <Button onClick={MoveTop}></Button>}</>;
};

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 50px;
  height: 36px;
  width: 36px;
  background-image: url(${img});
  background-color: rgba(0, 0, 0, 0);
`;

export default TopButton;
