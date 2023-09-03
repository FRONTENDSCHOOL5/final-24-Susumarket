import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModalContext } from "../../../context/ModalContext";
import { UserContext } from "../../../context/UserContext";

import { AccountContext } from "../../../context/AccountContext";
import useAuth from "../../../hook/useAuth";
import Loading from "../../../components/commons/loading/Loading";
import { userProfileAPI } from "../../../API/profileAPI";
import UserProfileUI from "./UserProfile.presenter";
export default function UserProfile() {
  const { setAccessToken } = useContext(UserContext);
  const { setIsOpenPostModal, setIsOpenConfirmModal } =
    useContext(ModalContext);
  const navigate = useNavigate();
  const params = useParams();
  const accountname = params.userId;
  const { setAccount } = useContext(AccountContext);
  // confirm 모달창 props 설정 => 버튼 마다 confirm 모달창이 달라지기 때문에 사용
  const [confirmProps, setConfirmProps] = useState({});
  // post 모달창 props 설정 => 버튼 마다 post 모달창이 달라지기 때문에 사용
  const [postModalProps, setPostModalProps] = useState([]);

  // 유저 데이터 저장
  const [userData, setUserData] = useState({});

  // 유효한 유저 인지 파악
  const [isInvalidProfile, setIsInvalidProfile] = useState(false);

  const [loading, setLoading] = useState(true); // Loading state
  // 자신의 프로필 정보를 가져오는 커스텀 훅
  const myProfile = useAuth(null);

  // post 모달창 props 설정 및 열기
  const settingPostModalProps = (modalProps) => {
    setPostModalProps(modalProps);
    setIsOpenPostModal(true);
  };

  // postModal 창에 버튼을 누를경우 confirm 모달창의 props를 넘겨줌
  const onClickButton = (
    confirmMessage,
    submitMessage,
    cancelMessage,
    handleSubmit,
  ) => {
    setConfirmProps({
      confirmMessage,
      submitMessage,
      cancelMessage,
      handleSubmit,
    });
    setIsOpenConfirmModal(true);
  };

  // 모달창을 닫는 함수
  const closeModal = () => {
    setIsOpenConfirmModal(false);
    setIsOpenPostModal(false);
  };

  const fecthUserDate = async () => {
    try {
      // accountname params가 존재할때 와 존재하지 않을때를 분기처리해줌
      // accountname이 존재할 시 accountname과 일치하는 유저 프로필을 불러옴
      if (accountname) {
        const response = await userProfileAPI(accountname);
        setUserData(response);
        setIsInvalidProfile(false);
        setLoading(false); // Set loading to false when data is fetched
      } else {
        // accountname이 존재하지 않을 시에는 자신의 프로필 정보를 불러옴
        setUserData(myProfile);
        setLoading(false); // Set loading to false when data is fetched
      }
    } catch (error) {
      setIsInvalidProfile(true);
    }
  };

  // 유저 정보가 있을 경우에만 유저 데이터를 받아옴
  useEffect(() => {
    if (myProfile) {
      fecthUserDate();
    }
  }, [myProfile, accountname]);

  if (loading) {
    return <Loading />;
  }
  return (
    // userData.accountname undeifined 방지
    userData.accountname && (
      <UserProfileUI
        settingPostModalProps={settingPostModalProps}
        onClickButton={onClickButton}
        setAccessToken={setAccessToken}
        setAccount={setAccount}
        closeModal={closeModal}
        navigate={navigate}
        confirmProps={confirmProps}
        postModalProps={postModalProps}
        isInvalidProfile={isInvalidProfile}
        userData={userData}
        fecthUserDate={fecthUserDate}
      />
    )
  );
}
