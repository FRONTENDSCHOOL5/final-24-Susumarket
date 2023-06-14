import styled from "styled-components";

export const BottomSheetModal = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px; /* Set your desired height */
  background-color: #ffffff;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  transition: transform 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(100%)"};
`;
export const BottomSheetCont = styled.div`
  list-style-type: none;
  align-items: center;
  justify-content: center;
`;
export const BottomSheetBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;
