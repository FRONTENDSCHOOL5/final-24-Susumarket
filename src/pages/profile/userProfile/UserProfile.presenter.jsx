import React from "react";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import {
  UserProfileWrapper,
  UserUndefinedImg,
  UserUndefinedText,
  UserUndefinedWrapper,
} from "./userProfile.styles";
import ProfileInfo from "./profileInfo/ProfileInfo.container";
import ProfileProduct from "./profileProduct/ProfileProduct";
import PostList from "../../../components/commons/postList/PostList";
import PostModal from "../../../components/commons/postModal/PostModal";
import ConfirmModal from "../../../components/commons/confirmModal/confirmModal";
import TopButton from "../../../components/commons/topButton/TopButton";
import MenuBar from "../../../components/commons/menuBar/MenuBar";
import undefindImg from "../../../img/symbol-logo-404.svg";
import undefindImgWebp from "../../../img/webp/symbol-logo-404.webp";
import { resolveWebp } from "../../../library/checkWebpSupport";
export default function UserProfileUI({
  settingPostModalProps,
  onClickButton,
  setAccessToken,
  setAccount,
  closeModal,
  navigate,
  confirmProps,
  postModalProps,
  isInvalidProfile,
  userData,
  fecthUserDate,
}) {
  return (
    <>
      <NewTopHeader
        left={"back"}
        right={"more"}
        title={"유저 프로필"}
        onClickButton={() => {
          settingPostModalProps([
            {
              name: "로그아웃",
              func: () =>
                onClickButton("정말 로그아웃 하시겠습니까?", "로그아웃", "취소",() => {
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
            <UserUndefinedImg src={resolveWebp(undefindImgWebp, undefindImg)} alt="존재하지 않는 유저" />
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
            <PostList
              onClickButton={onClickButton}
              settingPostModalProps={settingPostModalProps}
              closeModal={closeModal}
              userData={userData}
              isFeed={false}
            />
          </>
        )}
        <ConfirmModal
          confirmMessage={confirmProps.confirmMessage}
          submitMessage={confirmProps.submitMessage}
          cancelMessage="취소"
          handleSubmit={confirmProps.handleSubmit}
        />
      </UserProfileWrapper>
      <TopButton />
      <MenuBar />
      <PostModal menuList={postModalProps} />
    </>
  );
}
