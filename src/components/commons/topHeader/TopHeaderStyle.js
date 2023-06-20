import styled from "styled-components";
export const TopHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 13px 16px;
  font-size: 18px;
  border-bottom: 1px solid #dbdbdb;
`;
export const TopHeaderTitle = styled.h2`
  display: inline-block;
  font-weight: 500;
  vertical-align: middle;
  margin-left: 8px;
`;
export const TopHeaderSearchBtn = styled.button`
  background: none;
`;
export const TopHeaderSearchIconImg = styled.img`
  vertical-align: middle;
  width: 24px;
  height: 24px;
`;
export const TopHeaderBackBtn = styled.button`
  background: none;
`;
export const TopHeaderBackIcon = styled.img`
  vertical-align: middle;
  width: 24px;
  height: 24px;
`;
export const TopHeaderSearchInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 7px 16px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 32px;
  border: none;
  background-color: #f2f2f2;
  ::placeholder {
    color: #c4c4c4;
  }
`;
export const TopHeaderMoreBtn = styled.button`
  background: none;
`;
export const TopHeaderMoreIconImg = styled.img`
  vertical-align: middle;
  width: 24px;
  height: 24px;
`;
export const TopHeaderLeft = styled.div``;
