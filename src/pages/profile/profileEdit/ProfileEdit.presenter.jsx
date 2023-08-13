import React from "react";
import {
  ProfileEditForm,
  ProfileEditImg,
  ProfileEditImgRestBtn,
  ProfileEditLabel,
  ProfileEditUploadInput,
  ProfileEditWrapper,
} from "./profileEdit.style";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import UserInput from "../../../components/commons/dataInput/UserInput";
import DataInput from "../../../components/commons/dataInput/DataInput";
import ErrorMessage from "../../../components/commons/errorMessage/ErrorMessage";
export default function ProfileEditUI({
  isDisabled,
  username,
  usernameValidation,
  accountname,
  accountnameValidation,
  intro,
  imgPreviewURL,
  defaultProfileImg,
  defaultProfileImgWebp,
  onSubmitSave,
  reset,
  onChangeImg,
  onChangeUserame,
  onChangeAccountname,
  onBlurAccountname,
  onChangeIntro,
  resolveWebp,
}) {
  return (
    <>
      <NewTopHeader
        left="back"
        title="프로필 수정"
        right="save"
        disabled={isDisabled}
        onClickButton={(e) => onSubmitSave(e)}
      />
      <ProfileEditWrapper>
        <ProfileEditForm>
          <ProfileEditLabel htmlFor="input-file">
            <ProfileEditImg
              src={
                imgPreviewURL ||
                resolveWebp(defaultProfileImgWebp, defaultProfileImg)
              }
              alt="유저 프로필 이미지"
              onError={(e) =>
                (e.target.src = resolveWebp(
                  defaultProfileImgWebp,
                  defaultProfileImg,
                ))
              }
            />
          </ProfileEditLabel>

          <ProfileEditImgRestBtn
            type="button"
            onClick={reset}
            area-label="이미지 초기화"
          ></ProfileEditImgRestBtn>

          <ProfileEditUploadInput
            type="file"
            className="a11y-hidden"
            id="input-file"
            accept="image/*"
            onChange={onChangeImg}
          />
          <UserInput label="사용자 이름" inputId="input-username">
            <DataInput
              type="text"
              id="input-username"
              placeholder="2~10자 이내여야 합니다."
              value={username}
              onChange={onChangeUserame}
              max={10}
            />
            {usernameValidation.errorMessage && (
              <ErrorMessage>{usernameValidation.errorMessage}</ErrorMessage>
            )}
          </UserInput>

          <UserInput label="계정 ID" inputId="input-accountId">
            <DataInput
              type="text"
              id="input-accountId"
              placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
              value={accountname}
              onChange={onChangeAccountname}
              onBlur={onBlurAccountname}
            />
            {accountnameValidation.errorMessage && (
              <ErrorMessage>{accountnameValidation.errorMessage}</ErrorMessage>
            )}
          </UserInput>

          <UserInput label="소개" inputId="input-intro">
            <DataInput
              type="text"
              id="input-intro"
              placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
              value={intro}
              onChange={onChangeIntro}
              max={50}
            />
          </UserInput>
        </ProfileEditForm>
      </ProfileEditWrapper>
    </>
  );
}
