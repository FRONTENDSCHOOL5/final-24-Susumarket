import styled from "styled-components";

export const BottomSheetModal = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-top: 36px;
  background-color: #ffffff;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;
  z-index: 999;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(100%)"};
  // 모달창 위 회색 부분 추가하였습니다.
  ::after {
    content: "";
    position: absolute;
    display: block;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 4px;
    border-radius: 5px;
    background-color: #bdbdbd;
  }
`;
export const BottomSheetUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

export const BottomSheetLi = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

export const BottomSheetBtn = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 26px;
  font-size: 18px;
  font-weight: 400;
  background: none;
  :hover {
    background-color: var(--color-sub);
    color: #fff;
  }
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
