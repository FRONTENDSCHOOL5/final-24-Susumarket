import React, { useContext, useEffect, useState } from "react";
import ProfileInfo from "../../../components/units/profile/profileInfo/ProfileInfo";
import ProfileProduct from "../../../components/units/profile/ProfileProduct/ProfileProduct";
import PostModal from "../../../components/commons/postModal/PostModal";
import ConfirmModal from "../../../components/commons/confirmModal/confirmModal";
import TopButton from "../../../components/commons/topButton/TopButton";
import { useNavigate, useParams } from "react-router-dom";
import { ModalContext } from "../../../context/ModalContext";
import { UserContext } from "../../../context/UserContext";
import ProfilePost from "../../../components/units/profile/ProfilePost/ProfilePost";
import { customAxios } from "../../../library/customAxios";
import {
  UserProfileWrapper,
  UserUndefinedImg,
  UserUndefinedText,
  UserUndefinedWrapper,
} from "./userProfile.styles";
import undefindImg from "../../../img/symbol-logo-404.svg";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import { AccountContext } from "../../../context/AccountContext";
import  useAuth  from "../../../hook/useAuth"
import MenuBar from "../../../components/commons/menuBar/MenuBar";
export default function UserProfile() {
  const { setAccessToken } = useContext(UserContext);
  const { setIsOpenPostModal, setIsOpenConfirmModal } =
    useContext(ModalContext);
  const navigate = useNavigate();
  const params = useParams();
  const accountname = params.userId;
  // confirm 모달창 props 설정
  const [confirmProps, setConfirmProps] = useState({});
  // post 모달창 props 설정
  const [postModalProps, setPostModalProps] = useState([]);

  // 유저 데이터 저장
  const [userData, setUserData] = useState({});

  // 유효한 유저 인지 파악
  const [isInvalidProfile, setIsInvalidProfile] = useState(false);
  const [account, setAccount] = useState(null);

  const myProfile = useAuth(null);

  // post 모달창 props 설정 및 열기
  function settingPostModalProps(modalProps) {
    setPostModalProps(modalProps);
    setIsOpenPostModal(true);
  }

  // postModal 창에 버튼을 누를경우 confirm 모달창의 props를 넘겨줌
  function onClickButton(confirmMessage, submitMessage, handleSubmit) {
    setConfirmProps({ confirmMessage, submitMessage, handleSubmit });
    setIsOpenConfirmModal(true);
  }

  // 모달창을 닫는 함수
  function closeModal() {
    setIsOpenConfirmModal(false);
    setIsOpenPostModal(false);
  }

  async function fecthUserDate() {
    try {
      if (accountname) {
        const response = await customAxios.get(`profile/${accountname}`);
        setUserData(response.data.profile);
        setIsInvalidProfile(false);
      } else {
        setUserData(myProfile);
      }
    } catch (error) {
      setIsInvalidProfile(true);
      console.log(error);
    }
  }


  useEffect(() => {
    if(myProfile){
      setAccount(myProfile.accountname);
      fecthUserDate();
    }
   
  }, [accountname, myProfile]);

  return (
    userData.accountname&&<AccountContext.Provider value={{ setAccount, account }}>
      <NewTopHeader
        left={"back"}
        right={"more"}
        title="유저 프로필"
        onClickButton={() => {
          settingPostModalProps([
            {
              name: "로그아웃",
              func: () =>
                onClickButton("정말 로그아웃 하시겠습니까?", "로그아웃", () => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("account");
                  setAccessToken(null);
                  setAccount(null);
                  closeModal();
                  navigate("/login");
                }),
            },
            {
              name: "설정 및 개인 정보",
              func: () => {
                closeModal();
                navigate("/profile/test/edit");
              },
            },
          ]);
        }}
      />
      <UserProfileWrapper>
        {isInvalidProfile ? (
          <UserUndefinedWrapper>
            <UserUndefinedImg src={undefindImg} alt="존재하지 않는 유저" />
            <UserUndefinedText>유효하지 않은 프로필 입니다.</UserUndefinedText>
          </UserUndefinedWrapper>
        ) : (
          <>
            <ProfileInfo userData={userData} reFetchUserData={fecthUserDate} />
            <ProfileProduct
              onClickButton={onClickButton}
              settingPostModalProps={settingPostModalProps}
              closeModal={closeModal}
              userData={userData}
            />
            <ProfilePost
              onClickButton={onClickButton}
              settingPostModalProps={settingPostModalProps}
              closeModal={closeModal}
              userData={userData}
            />
          </>
        )}
        <PostModal menuList={postModalProps} />
        <ConfirmModal
          confirmMessage={confirmProps.confirmMessage}
          submitMessage={confirmProps.submitMessage}
          cancelMessage="취소"
          handleSubmit={confirmProps.handleSubmit}
        />
      </UserProfileWrapper>
      <TopButton />
      <MenuBar />
    </AccountContext.Provider>
  );
}
