import styled from "styled-components";
export const TopHeaderWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 13px 16px;
  font-size: 18px;
  border-bottom: 1px solid #dbdbdb;
  &.followers {
    justify-content: flex-start;
  }
`;
export const TopHeaderTitle = styled.h2`
  display: inline-block;
  font-weight: 500;
`;
export const SearchBtn = styled.button`
  background: none;
  width: 24px;
  height: 24px;
`;
export const SearchIconImg = styled.img`
  width: 24px;
  height: 24px;
`;
export const BackBtn = styled.button`
  background: none;
  width: 22px;
  height: 22px;
`;
export const BackIcon = styled.img`
  width: 22px;
  height: 22px;
`;
export const SearchInput = styled.input`
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
export const MoreBtn = styled.button`
  background: none;
  width: 24px;
  height: 24px;
`;
export const MoreIconImg = styled.img`
  width: 24px;
  height: 24px;
`;
