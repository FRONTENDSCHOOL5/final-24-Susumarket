import styled from "styled-components";
import Button from ".././../../../components/commons/button/Button";

export const Div = styled.div`
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
  max-width: 500px;
  box-shadow: 4px 4px 8px 8px #cdcdcd;
  @media screen and (max-width: 360px) {
    max-width: 100%;
    margin: 20px;
  }
`;
export const ContentDiv = styled.div`
  @media screen and (max-width: 360px) {
    max-width: 100%;
    width: 390px;
  }
`;
export const ProfileDiv = styled.div`
  @media screen and (max-width: 360px) {
    max-width: 100%;
    width: 200px;
    padding-left: 10px;
  }
`;
export const Btn = styled(Button)`
  color: white;
  font-size: 15px;
  font-weight: 500;
  @media screen and (max-width: 360px) {
  }
`;

export const Image = styled.img`
  max-width: 100%;
  width: 500px;
  height: 400px;
  margin: 0 auto;
  border: 0px solid transparent;
  @media screen and (max-width: 360px) {
    width: 100%;
    height: auto;
  }
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
  @media screen and (max-width: 360px) {
    width: 100%;
    font-size: 15px;
  }
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
  @media screen and (max-width: 360px) {
    margin-top: 10px;
    margin-left: 10px;
    width: 35px;
    height: 35px;
  }
`;
export const HeartIcon = styled.button`
  cursor: pointer;
  width: 24px;
  height: 22px;
  margin-top: 5px;
  object-fit: cover;
  background: url(${(props) => props.heartFill});
  @media screen and (max-width: 360px) {
    width: 20px;
    height: 20px;
  }
`;
export const Profile = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 470px;
  margin: 20px 10px 0px 10px;
  border-bottom: 1px solid #e9ecef;
  @media screen and (max-width: 360px) {
    width: 100%;
  }
`;
export const Bottom = styled.div`
  display: flex;
  width: 450px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 10px;
  @media screen and (max-width: 360px) {
    width: 100%;
    width: 280px;
  }
`;
export const Title = styled.div`
  width: 500px;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: flex-start;
  margin-top: 20px;

  @media screen and (max-width: 360px) {
    width: 100%;
    height: auto;
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  margin: 0px auto;
  width: 400px;
  font-weight: 900;
  font-size: 26px;
  @media screen and (max-width: 360px) {
    width: 200px;
  }
`;

export const Contents = styled.div`
  margin-top: 7px;
  margin-bottom: 20px;
  margin-right: 10px;
  width: max-content;
  max-width: 360px;
  word-break: break-all;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: -0.6px;
  font-weight: 500;
  @media screen and (max-width: 360px) {
    width: 100%;
    width: 230px;
    font-size: 15px;
  }
`;

export const Account = styled.div`
  font-size: 15px;
  color: #cdcdcd;
  margin-top: 2px;
  @media screen and (max-width: 360px) {
    width: 100%;
  }
`;
