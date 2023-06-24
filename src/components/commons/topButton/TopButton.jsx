import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import img from "../../../img/TopButton.svg";

const TopButton = () => {
  const [showBtn, setShowBtn] = useState(false);
  const btnRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBtn(true);
      } else {
        if (btnRef.current) {
          btnRef.current.classList.add("inactive");
          setTimeout(() => {
            setShowBtn(false);
          }, 300);
        }
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

  return <>{showBtn && <Button onClick={MoveTop} ref={btnRef}></Button>}</>;
};

const Button = styled.button`
  position: fixed;
  bottom: 100px;
  right: 50px;
  height: 36px;
  width: 36px;
  background-image: url(${img});
  background-color: rgba(0, 0, 0, 0);
  animation: fadeIn 0.5s;
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

export default TopButton;
