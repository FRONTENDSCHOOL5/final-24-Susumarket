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

export const Cont = styled.article`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-top: 0px;
  }
  width: 400px;
`;

export const imgCont = styled.div`

`
export const Container = styled.main`
width: 87%;
max-width: 500px;
margin: 0 auto;
`

export const Form = styled.main`
  
  display: flex;
  flex-direction: column;
`;


// userInput의 Inplabel 활용중이라 새로운 label 만들어줌(UserInput 공통 컴포넌트 사용x)
export const ImgTopLabel = styled.label`
padding-top: 20px;
max-width: 400px;
height: 60px;
font-size: 25px;
color: #767676;
font-weight: 1000;
margin-top: 30px;          
margin-bottom: 20px;
margin: 0 auto;
display: block;
@media screen and (max-width: 768px) {
  font-size: 14px;
}
`

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 0;
`;

export const txtContainer = styled.div`
  padding-top:50px;

  `;

export const txt = styled.label`

`
export const ImgLabel = styled.label`
text-align: center;
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
