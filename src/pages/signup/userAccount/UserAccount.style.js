import Button from "../../../components/commons/button/Button";
import styled from "styled-components";
import { css } from "styled-components";

export const SignupContainer = styled.main`
  width: 87%;
  max-width: 500px;
  margin: 20px auto;
`;

export const SignupForm = styled.form`
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

export const SignupButton = styled(Button)`
  margin-top: 50px;

  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--color-sub);
      cursor: not-allowed;
    `}
`;