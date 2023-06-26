import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../../../components/commons/button/Button";


export const SignupButton = styled(Button)`
  margin-top: 50px;
`;
export const imgLabel = styled.label`
  font-size: 16px;
  color: #767676;
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
  margin-top: 40px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Cont = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  @media screen and (max-width: 768px) {
    margin-top: 0px;
  }
`;

export const imgCont = styled.div`

`
export const Container = styled.main`
width: 87%;
max-width: 500px;
margin: 0 auto;
@media screen and (max-width: 360px) {
  max-width: 100%;
  margin: 20px;
}
`

export const Form = styled.main`
  
  display: flex;
  flex-direction: column;
  
`;


export const ImgTopLabel = styled.label`
width: 80px;
font-size: 16px;
color: #767676;
font-weight: 500;
margin-top: 30px;          
margin-bottom: 20px;
margin-right: 420px;
display: block;
@media screen and (max-width: 768px) {
  font-size: 14px;
}
`

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  @media screen and (max-width: 360px) {
    width: 100%;
    width: 280px;
    height: 300px;
  }
`;

export const ImgLabel = styled.label`
text-align: center;
@media screen and (max-width: 360px) {
  margin-right: 60px;
  margin-top: 30px;
}
`;

export const InpLabel = styled.label`
  font-size: 16px;
  color: #767676;
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
  margin-top: 40px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ImgInput = styled.input`
  display: none;
`;

export const Img = styled.img`
  &.default {
    max-width: 400px;
    height: 250px;
    box-sizing: border-box;
    background: #F2F2F2;
    object-fit: cover;
    border: 0.5px solid #DBDBDB;
    border-radius: 10px;
    }
  &.uploadbtn {
    position: relative;
    left: 135px;
    bottom: 62px; 
    cursor: pointer;
  }
`;
