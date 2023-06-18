import styled from "styled-components";

const ErrorMessage = styled.strong`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  color: #eb5757;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export default ErrorMessage;
