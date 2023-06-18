import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../../components/commons/button/Button";

export const Container = styled.div`
  width: 87%;
  max-width: 500px;
  margin: 20px auto;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
`;

export const LoginForm = styled.form`
  margin: auto 0;
  margin-top: 54px;
  display: flex;
  flex-direction: column;
`;

export const SignupButton = styled(Button)`
  margin-top: 50px;
`;
export const SignUpLink = styled(Link)`
  font-size: 12px;
  display: block;
  margin-top: 30px;
  color: #767676;
  font-size: 18px;
  text-align: center;
`;
