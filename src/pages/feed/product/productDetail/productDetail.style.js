import styled from "styled-components";


export const Div = styled.div`
padding-bottom: 0;
display: flex;
flex-direction: column;
align-items: center;
margin: 30px auto;
max-width: 500px;
box-shadow: 4px 4px 8px 8px #CDCDCD;

`;

export const Image = styled.img`
max-width: 100%;
width: 500px;
height: 400px;
margin: 0 auto;
border: 0px solid transparent;
`;

export const Nickname = styled.div`
width: 500px;
margin: 0px auto;
font-size: 18px;
font-weight: 900;
display: flex;
align-items: flex-start;
margin-top: 6px;
margin-bottom: 6px;
`;

export const Icon = styled.img`
width: 50px;
height: 50px;
-o-object-fit: cover;
object-fit: cover;
border-radius: 50%;
-webkit-border-radius: 50%;
-moz-border-radius: 50%;
display: flex;
justify-content: flex-start;
margin-right: 10px;
border-bottom: 1px solid #e9ecef;

`;
export const HeartIcon = styled.img`
cursor: pointer;
width: 25px;
height: 25px;
margin-top: 4px;
-o-object-fit: cover;
object-fit: cover;
border-radius: 50%;
-webkit-border-radius: 50%;
-moz-border-radius: 50%;
display: flex;
justify-content: flex-start;

`;
export const Profile = styled.div`
display: flex;
justify-content: flex-start;
width: 470px;
margin: 20px 10px 0px 10px;
border-bottom: 1px solid #e9ecef;
`;

export const Title = styled.div`
width: 500px;
font-size: 20px;
font-weight: 900;
display: flex;
align-items: flex-start;
margin-top: 20px;
`;

export const Price = styled.div`
display: flex;
align-items: center;
margin: 0px auto;
width: 400px;
font-weight: 900;
font-size: 18px;
`;

export const Contents = styled.div`
margin-top: 7px;
margin-bottom: 20px;
margin-right: 10px;
width: max-content;
max-width: 390px;
word-break: break-all;
font-size: 18px;
line-height: 1.8;
letter-spacing: -0.6px;
font-weight: 500;

`;

export const Account = styled.div`
font-size: 15px; 
color: #CDCDCD;
margin-top: 2px;
`;