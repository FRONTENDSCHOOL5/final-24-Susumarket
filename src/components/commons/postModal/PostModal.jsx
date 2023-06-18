import React, { useContext } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBtn,
  BottomSheetLi,
  BottomSheetUl,
} from "./postModalStyle";
import { ModalContext } from "../../../context/ModalContext";

const PostModal = ({ menuList }) => {
  // context를 이용해서 전역으로 모달 상태관리를 합니다. 
  // props로 isOpen과 onclose를 안받아도 됩니다.
  // menuList라는 props는 name과 Func로 이루어진 배열 안의 객체입니다. ex)[{name:"버튼이름"", func:버튼 클릭 시 실행 함수}]
  // name에는 버튼에 들어갈 text를 넣어주고, func 해당 버튼에서 동작할 함수를 넣어줍니다.
  const { isOpenPostModal, setIsOpenPostModal } = useContext(ModalContext);
  return (
    <>
      <BottomSheetModal isOpen={isOpenPostModal}>
        <BottomSheetUl>
          {menuList.map((menu)=>{return(
            <BottomSheetLi key={menu.name}>
              <BottomSheetBtn type="button" onClick={menu.func}>{menu.name}</BottomSheetBtn>
            </BottomSheetLi>
          )})}
        </BottomSheetUl>
      </BottomSheetModal>
      <BottomSheetBackdrop  isOpen={isOpenPostModal} onClick={()=>setIsOpenPostModal(false)}/>
    </>
  );
};

export default PostModal;
