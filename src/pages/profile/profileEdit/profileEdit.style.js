import styled from "styled-components";
import imgUploadIcon from "../../../img/img-button-active.svg";
import resetIcon from "../../../img/x.svg";
export const ProfileEditWrapper = styled.main`
  display: flex;
  justify-content: center;
  min-width: 390px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-top: 48px;
`;
export const ProfileEditForm = styled.form`
  width: 90%;
`;

export const ProfileEditLabel = styled.label`
  position: relative;
  display: block;
  width: 110px;
  height: 110px;
  margin: 0 auto 30px;
  border: 1px solid #dbdbdb;
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
  object-fit: contain;
  border-radius: 50%;
`;

export const ProfileEditUploadInput = styled.input``;

export const ProfileEditImgRestBtn = styled.button`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  right: -10px;
  background: url(${resetIcon}) no-repeat center / contain #767676;
`;
