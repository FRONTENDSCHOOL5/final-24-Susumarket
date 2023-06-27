import React, { useState, useEffect, useRef } from "react";
import { throttle } from "lodash";
import { Button } from "./topButton.style";

const TopButton = () => {
  const [showBtn, setShowBtn] = useState(false);
  const btnRef = useRef();

  const handleScroll = throttle(() => {
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
  },200);

  useEffect(() => {
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

  return (
    <>
      {showBtn && (
        <Button type="button" onClick={MoveTop} ref={btnRef}></Button>
      )}
    </>
  );
};

export default TopButton;
