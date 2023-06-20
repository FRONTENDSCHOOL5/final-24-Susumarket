import { Link } from "react-router-dom";
import styled from "styled-components";
import multiflyImgIcon from "../../../../img/icon-img-layers.svg"
export const ProfilePostWrapper = styled.section`
  background-color: #fff;
`;
export const ProfilePostTitle = styled.h2``;

export const ProfilePostDisplayBtns = styled.div`
  display: flex;
  justify-content: right;
  gap: 6px;
  border: 1px solid #767676;
  padding: 9px 16px;
`;
export const ProfilePostDisplayList = styled.button`
  width: 26px;
  height: 26px;
  background: none;
`;

export const ProfilePostDisplayListImg = styled.img`
  width: 26px;
  height: 26px;
`;

export const ProfilePostButtonSpan = styled.span``;

export const ProfilePostDisplayGallery = styled.button`
  width: 26px;
  height: 26px;
  background: none;
`;
export const ProfilePostDisplayGalleryImg = styled.img`
  width: 26px;
  height: 26px;
`;
export const ProfilePostUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 390px;
  width: 100%;
  padding: 16px 16px 70px;
  margin: 0 auto;
`;

export const ProfilePostLi = styled.li`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 358px;
  width: 100%;
`;

export const ProfilePostAuth = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
`;

export const ProfilePostAuthImg = styled.img`
  width: 42px;
  height: 42px;
  border: 0.5px solid #dbdbdb;
  border-radius: 50%;
  margin-right: 12px;
`;

export const ProfilePostAuthInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfilePostAuthName = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 2px;
`;

export const ProfilePostAuthId = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #767676;
  ::before {
    content: "@";
    margin-right: 3px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #767676;
  }
`;

export const ProfilePostMoreBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 0;
  width: 18px;
  height: 18px;
  background: none;
`;
export const ProfilePostMoreBtnIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const ProfilePostContents = styled.div`
  padding-left: 54px;
`;

export const ProfilePostText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 16px;
  word-break: break-all;
`;
export const ProfilePostImgWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
  max-height: 228px;
  border-radius: 10px;
  overflow: hidden;
`;
export const ProfilePostImgUl = styled.ul`
  display: flex;
  transition: all 0.5s;
  gap: 5px;
`;

export const ProfilePostImgLi = styled.li`
  min-width: 304px;
  width: 100%;
  max-height: 228px;
  min-height: 228px;
  border: 0.5px #dbdbdb;
  border-radius: 10px;
  overflow: hidden;
`;

export const ProfilePostImg = styled.img`
  border-radius: 10px;
  margin-bottom: 16px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
`;

export const ProfilePostImgBtnUl = styled.ul`
  position: absolute;
  display: flex;
  gap: 6px;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
`;

export const ProfilePostImgBtnLi = styled.li``;

export const ProfilePostImgBtn = styled.button`
  width: 6px;
  height: 6px;
  border-radius: 50%;

  &.active {
    background-color: var(--color-primary);
  }
`;

export const ProfilePostLikeCommentBtns = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  margin-bottom: 16px;
  align-items: center;
  width: 100%;
`;

export const ProfilePostLikeBtn = styled.button`
  display: flex;
  align-items: center;
  margin-right: 18px;
  background: none;
`;
export const ProfilePostLikeBtnIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
export const ProfilePostLikeCount = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #767676;
`;

export const ProfilePostCommentLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const ProfilePostCommentLinkIcon = styled(ProfilePostLikeBtnIcon)``;
export const ProfilePostCommentCount = styled(ProfilePostLikeCount)``;

export const ProfilePostGalleryUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  padding: 16px 16px 70px;
  margin: 0 auto;
`;

export const ProfilePostGalleryLi = styled.li`
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  &.multifly::before {
    content: "";
    display: block;
    position: absolute;
    right: 6px;
    top: 6px;
    width: 20px;
    height: 20px;
    background-image: url(${multiflyImgIcon});
    background-position: center;
    background-size: cover;
  }
`;

export const ProfilePostGalleryLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;

export const ProfilePostGalleryImg = styled.img`
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
