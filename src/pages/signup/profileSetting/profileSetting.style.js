import styled from "styled-components";
import Button from "../../../components/commons/button/Button";

export const ProfileContainer = styled.main`
  width: 87%;
  max-width: 500px;
  margin: 20px auto;
`;

export const ProfileForm = styled.form`
  margin: auto 0;
  margin-top: 54px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
`;

export const Subtitle = styled.h2`
  text-align: center;
  color: #767676;
  font-weight: 400;
  font-size: 18px;
`;

export const ProfileButton = styled(Button)`
  margin-top: 50px;
`;

export const ImgLabel = styled.label`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
`;
export const ImgInput = styled.input`
  display: none;
`;

export const Img = styled.img`
  &.defaultlion {
    position: absolute;
    margin-left: -30px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
  }
  &.uploadbtn {
    position: relative;
    top: 70px;
    left: 50px;
  }
`;