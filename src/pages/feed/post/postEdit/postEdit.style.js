import styled from "styled-components";
import xbutton from "../../../../img/x.svg";
import imgUploadBtn from "../../../../img/upload-file.svg";

export const PostImgButton = styled.button`
  // top: 70%;
  position: fixed;
  bottom: 70px;
  right: 40px;
  width: 50px;
  height: 50px;
  background: url(${imgUploadBtn}) no-repeat;
  background-position: 0 0;
`;

export const UploadMain = styled.main`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const ProfileImgLabel = styled.label``;

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  // background-color: var(--color-sub);
  margin-left: 20px;
  margin-top: 20px;
`;

export const TextArea = styled.textarea`
  font-size: 15px;
  width: calc(85% - 90px);
  outline: none;
  border: none;
  resize: none;
  margin-left: 20px;
  margin-top: 35px;
`;
export const PostImgLabel = styled.label`
  margin-top: 10px;
`;

export const PostImgInput = styled.input`
  display: none;
`;

export const Delete = styled.button`
  background: url(${xbutton});
  width: 20px;
  height: 20px;
  z-index: 999;
  position: absolute;
  margin-left: -35px;
  margin-top: 5px;
`;

export const PostImg = styled.img`
  width: 322px;
  height: 220px;
  max-width: 100%;
  border-radius: 20px;
  margin-left: 30px;
  position: relative;
  @media screen and (max-width: 361px) {
    margin-left: 20px;
  }
`;

export const UploadImgArea = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 30px;
`;
