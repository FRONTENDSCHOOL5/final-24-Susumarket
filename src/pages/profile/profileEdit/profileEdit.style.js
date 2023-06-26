import styled from "styled-components";
import imgUploadIcon from "../../../img/img-button-active.svg";
import resetIcon from "../../../img/x.svg";
export const ProfileEditWrapper = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-top: 48px;
`;
export const ProfileEditForm = styled.form`
  position: relative;
  width: 90%;
`;

export const ProfileEditLabel = styled.label`
  position: relative;
  display: block;
  width: 110px;
  height: 110px;
  margin: 0 auto 30px;
  border: 2px solid #dbdbdb;
  border-radius: 50%;
  cursor: pointer;
  ::after {
    position: absolute;
    content: "";
    right: 0;
    bottom: 0;
    width: 36px;
    height: 36px;
    background: url(${imgUploadIcon}) no-repeat center / cover;
    border-radius: 50%;
  }
`;

export const ProfileEditImg = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const ProfileEditUploadInput = styled.input``;

export const ProfileEditImgRestBtn = styled.button`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  top: 0px;
  left: 50%;
  margin-left: 50px;
  transform: translateX(-50%);
  background: url(${resetIcon}) no-repeat center / contain #767676;
`;

export const ProfileEditSpan = styled.span``
