import styled from "styled-components";
import morebutton from "../../../../img/icon-more-vertical.svg";
import { Link } from "react-router-dom";

export const UserLink = styled(Link)`
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
  width: 100%;
`;
export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 304px;
`;
export const UserProfile = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  vertical-align: top;
`;
export const UserInfo = styled.div`
  margin-left: 10px;
`;

export const UserName = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  margin-right: 10px;
`;
export const AccountName = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: #767676;
  ::before {
    content: "@";
    font-weight: 400;
    font-size: 12px;
    color: #767676;
    margin-right: 3px;
  }
`;
export const UserButton = styled.button`
  background: url(${morebutton}) no-repeat center/16px 16px;
  width: 14px;
  height: 14px;
  margin-left: auto;
  margin-right: 20px;
`;
export const PostWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 24px;
  margin-top: 20px;
  border-bottom: 1px solid #c4c4c4;
`;
export const PostWrapperTitle = styled.h2``;

export const PostCard = styled.div`
  position: relative;
  max-width: 304px;
  margin: 0 auto;
`;

export const PostContent = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 16px;
  margin-top: 10px;
  word-break: break-all;
  margin-left: 15px;
`;

// 댓글
export const CommentWrapper = styled.div`
  /* margin-top: 20px; */
`;

export const CommentForm = styled.form`
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: white;
  display: flex;
  border-top: 0.5px solid rgb(219, 219, 219);
  padding: 12px 16px;
  gap: 18px;
`;

export const CommentUserWrapper = styled.div`
  display: flex;
`;

export const CommentUserImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CommentContent = styled.p`
  word-break: break-all;
  margin-top: 10px;
  padding-left: 48px;
  font-size: 14px;
`;

export const CommentInput = styled.input`
  -webkit-box-flex: 1;
  flex-grow: 1;
  padding: 0px;
  border: none;
  font-size: 14px;
  line-height: 18px;
  ::placeholder {
    color: #c4c4c4;
  }
`;

export const CommentMoreBtn = styled.button`
  background: url(${morebutton}) no-repeat center / 20px 20px;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  margin-left: auto;
`;

export const CommentSubmitButton = styled.button`
  font-size: 14px;
  line-height: 18px;
  flex-shrink: 0;
  margin-left: auto;
  color: ${(props) => (props.value ? "var(--color-primary)" : "#C4C4C4")};
  background: none;
`;

export const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 304px;
  width: 100%;
  padding: 16px 16px 70px;
  margin: 0 auto;
  gap: 24px;
`;

export const CommentItem = styled.li`
  /* margin-top: 10px; */
`;
export const CommentBtnSpan = styled.span``;
