import React, { useContext, useEffect, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBtn,
  BottomSheetLi,
  BottomSheetUl,
} from "./postModalStyle";
import { ModalContext } from "../../../context/ModalContext";
import { useLocation } from "react-router-dom";

const PostModal = ({ menuList }) => {
  // context를 이용해서 전역으로 모달 상태관리를 합니다.
  // props로 isOpen과 onclose를 안받아도 됩니다.
  // menuList라는 props는 name과 Func로 이루어진 배열 안의 객체입니다. ex)[{name:"버튼이름"", func:버튼 클릭 시 실행 함수}]
  // name에는 버튼에 들어갈 text를 넣어주고, func 해당 버튼에서 동작할 함수를 넣어줍니다.
  const { isOpenPostModal, setIsOpenPostModal, setIsOpenConfirmModal } =
    useContext(ModalContext);
  const BottomSheetModalRef = useRef(null);
  const firstBtnRef = useRef(null);
  const previousBtnRef = useRef(null);
  const lastBtnRef = useRef(null);
  const pathname = useLocation().pathname;

  useEffect(() => {
    // 모달 창이 열릴 때 모달창이 포커싱 되도록 설정
    if (isOpenPostModal) {
      BottomSheetModalRef.current.focus();
    }
  }, [isOpenPostModal]);

  useEffect(() => {
    setIsOpenPostModal(false);
  }, [pathname]);

  return (
    <>
      <BottomSheetModal
        isOpen={isOpenPostModal}
        tabIndex={"0"}
        // 모달창 포커스를 위해 tabIndex 추가
        ref={BottomSheetModalRef}
        onKeyDown={(e) => {
          // esc를 누를 경우 모달 창이 닫힘
          if (e.keyCode === 27) {
            setIsOpenPostModal(false);
          }
        }}
      >
        <BottomSheetUl>
          {menuList.map((menu, idx) => {
            return (
              <BottomSheetLi key={menu.name}>
                <BottomSheetBtn
                  type="button"
                  onClick={menu.func}
                  // 모달창 키보드 포커스를 벗어나지 않게하기 위해
                  // 맨 처음 버튼과 맨 마직막 버튼 그리고 맨 마지막 이전버튼 ref를 설정
                  ref={
                    idx === 0
                      ? firstBtnRef
                      : idx === menuList.length - 2
                      ? previousBtnRef
                      : idx === menuList.length - 1
                      ? lastBtnRef
                      : null
                  }
                  onKeyDown={(e) => {
                    // idx 가 0일때는 제일 첫 버튼 첫 버튼에서 이전 탭을 누를 경우
                    // 맨 마지막 버튼으로 focus가 되도록 설정
                    if (idx === 0) {
                      if (e.shiftKey && e.keyCode === 9) {
                        e.preventDefault();
                        lastBtnRef.current.focus();
                      }
                    }
                    // idx 가 menuList.length - 1 일때는 맨 마지막 버튼
                    // 맨 마지막 버튼에서 다음 버튼을 눌렀을때
                    // 처음 버튼으로 focus 되도록 설정
                    else if (idx === menuList.length - 1) {
                      // 만약 버튼이 2개 이하라면 previousBtnRef 버튼과 firstBtnRef가 같기 때문에
                      // previousBtnRef가 firstBtnRef에 덮어쓰여져서 문제가 발생하기 때문에
                      // 조건문으로 다르게 처리함
                      // 버튼이 2개 이하일 경우에는 previousBtnRef 대신 firstBtnRef를 focus
                      if (
                        e.shiftKey &&
                        e.keyCode === 9 &&
                        menuList.length > 2
                      ) {
                        e.preventDefault();
                        previousBtnRef.current.focus();
                      } else if (e.keyCode === 9) {
                        e.preventDefault();
                        firstBtnRef.current.focus();
                      }
                    }
                  }}
                >
                  {menu.name}
                </BottomSheetBtn>
              </BottomSheetLi>
            );
          })}
        </BottomSheetUl>
      </BottomSheetModal>
      <BottomSheetBackdrop
        isOpen={isOpenPostModal}
        onClick={() => {
          setIsOpenConfirmModal(false);
          setIsOpenPostModal(false);
        }}
      />
    </>
  );
};

export default PostModal;
