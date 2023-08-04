import { Link } from "react-router-dom";
import styled from "styled-components";
import multiflyImgIcon from "../../../img/icon-img-layers.svg";
export const PostWrapper = styled.section`
  position: relative;
  background-color: #fff;
  height: 100%;
  min-height: 515px;
`;
export const PostTitle = styled.h2``;

export const PostDisplayBtns = styled.div`
  display: flex;
  justify-content: right;
  gap: 6px;
  border-bottom: 1px solid #dbdbdb;
  padding: 9px 16px;
`;
export const PostDisplayList = styled.button`
  width: 26px;
  height: 26px;
  background: none;
`;

export const PostDisplayListImg = styled.img`
  width: 26px;
  height: 26px;
`;

export const PostButtonSpan = styled.span``;

export const PostDisplayGallery = styled.button`
  width: 26px;
  height: 26px;
  background: none;
`;
export const PostDisplayGalleryImg = styled.img`
  width: 26px;
  height: 26px;
`;
export const PostUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 390px;
  width: 100%;
  padding: 16px 16px 70px;
  margin: 0 auto;
  gap: 24px;
`;

export const PostLi = styled.li`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 304px;
  width: 100%;
  padding-bottom: 24px;
`;

export const PostContents = styled.div``;

export const PostText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 16px;
  word-break: break-all;
  margin-left: 15px;
`;
export const PostImgWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
  max-height: 228px;
  border-radius: 10px;
  overflow: hidden;
`;
export const PostImgUl = styled.ul`
  display: flex;
  transition: all 0.5s;
  gap: 5px;
`;

export const PostImgLi = styled.li`
  min-width: 304px;
  width: 100%;
  max-height: 228px;
  min-height: 228px;
  border: 0.5px #dbdbdb;
  border-radius: 10px;
  overflow: hidden;
`;

export const PostImg = styled.img`
  border-radius: 10px;
  margin-bottom: 16px;
  width: 100%;
  max-width: 304px;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
`;

export const PostImgBtnUl = styled.ul`
  position: absolute;
  display: flex;
  gap: 6px;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
`;

export const PostImgBtnLi = styled.li``;

export const PostImgBtn = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f6d1d2;
  transition: all 0.5s;
  &.active {
    background-color: var(--color-primary);
    transform: scale(1.1);
  }
`;

export const PostLikeCommentBtns = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  margin-bottom: 16px;
  align-items: center;
  width: 100%;
`;

export const PostLikeBtn = styled.button`
  display: flex;
  align-items: center;
  margin-right: 18px;
  background: none;
`;
export const PostLikeBtnIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
export const PostHeartCount = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #767676;
`;

export const PostCommentLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const PostCommentLinkIcon = styled(PostLikeBtnIcon)``;
export const PostCommentCount = styled(PostHeartCount)``;

export const PostGalleryUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, auto));
  justify-content: center;
  gap: 8px;
  padding: 40px;
  width: 100%;
  padding: 16px 16px 70px;
  margin: 0 auto;
  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
`;

export const PostGalleryLi = styled.li`
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  @media screen and (max-width: 400px) {
    width: 114px;
    height: 114px;
  }
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

export const PostGalleryLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;

export const PostGalleryImg = styled.img`
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PostNoneWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
export const PostNoneImg = styled.img`
  width: 110px;
  height: 110px;
  vertical-align: top;
  margin-bottom: 20px;
`;

export const PostNoneText = styled.p`
  text-align: center;
  color: #767676;
  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
`;

export const UserSearchWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 180px;
  @media (max-height: 500px) {
    margin-top: 70px;
  }
  @media (min-height: 500px) and (max-height: 600px) {
    margin-top: 120px;
  }
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  margin: auto;
  // vertical-align: middle;
`;
export const Content = styled.div`
  font-size: 15px;
  color: #767676;
  margin: 15px 0px;
`;

export const LoadingWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 110px);
`;
