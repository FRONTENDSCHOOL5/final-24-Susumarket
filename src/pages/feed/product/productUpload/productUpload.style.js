import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../../../components/commons/button/Button";


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

export const Container = styled.div`
  display: block;
  flex-direction: column;
  width: 87%;
  max-width: 500px;
  margin: 0px auto;
`;

// export const Title = styled.h1`
//   font-weight: 500;
//   font-size: 28px;
//   text-align: center;
//   margin-bottom: 40px;
// `;

export const Form = styled.article`
  
  display: flex;
  flex-direction: column;
`;


// userInput의 Inplabel 활용중이라 새로운 label 만들어줌(UserInput 공통 컴포넌트 사용x)
export const ImgTopLabel = styled.label`
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
text-align: center;
  display: flex;
  flex-direction: column;
`;

export const ImgLabel = styled.label`
max-width: 500px;
height: 250px;
  text-align: center;
  background-color: #F2F2F2;
  border-radius: 10px; 
   position: relative;

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
  &.defalutlion {
    box-sizing: border-box;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 13.56%;
    bottom: 0%;
        
    background: #F2F2F2;
    /* DBDBDB */
    
    border: 0.5px solid #DBDBDB;
    border-radius: 10px;
  }
  &.uploadbtn {
    position: absolute;
    left: 85.09%;
    right: 3.73%;
    top: 79.66%;
    bottom: 5.08%;
  }
`;
