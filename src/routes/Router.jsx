import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Splash from "../pages/splash/Splash";

import Login from "../pages/login/Login";
import LoginEmail from "../pages/login/loginEmail/LoginEmail";
import UserAccount from "../pages/signup/userAccount/UserAccount";
import ProfileSetting from "../pages/signup/profileSetting/ProfileSetting";

import Search from "../pages/feed/search/Search";
import Post from "../pages/feed/post/Post";
import PostDetail from "../pages/feed/post/postDetail/PostDetail";
import PostEdit from "../pages/feed/post/postEdit/PostEdit";
import PostUpload from "../pages/feed/post/postUpload/PostUpload";
import ProductDetail from "../pages/feed/product/productDetail/ProductDetail";
import ProductEdit from "../pages/feed/product/productEdit/ProductEdit";
import ProductUpload from "../pages/feed/product/productUpload/ProductUpload";

import UserProfile from "../pages/profile/userProfile/UserProfile";
import ProfileEdit from "../pages/profile/profileEdit/ProfileEdit";
import Followers from "../pages/profile/follow/followers/Followers";
import Following from "../pages/profile/follow/following/Following";

import ChatList from "../pages/chat/chatList/ChatList";
import ChatRoom from "../pages/chat/chatRoom/ChatRoom";

import NotFound from "../pages/notFound/NotFound";
import MenuBar from "../components/commons/menuBar/MenuBar";
import { UserContext } from "../context/UserContext";

export default function Router() {
  const { accessToken, account } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route
          path="/login/"
          element={
            accessToken && account ? <Navigate to={"/post"} /> : <Login />
          }
        />
        <Route
          path="/login/loginEmail/"
          element={
            accessToken && account ? <Navigate to={"/post"} /> : <LoginEmail />
          }
        />
        <Route
          path="/signup/userAccount/"
          element={
            accessToken && account ? <Navigate to={"/post"} /> : <UserAccount />
          }
        />
        <Route
          path="/signup/profileSetting/"
          element={
            accessToken && account ? (
              <Navigate to={"/post"} />
            ) : (
              <ProfileSetting />
            )
          }
        />

        <Route
          path="/search/"
          element={
            accessToken && account ? (
              <>
                <Search />
                <MenuBar />
              </>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        <Route
          path="/post/"
          element={
            accessToken && account ? <Outlet /> : <Navigate to={"/login"} />
          }
        >
          <Route
            index
            element={
              <>
                <Post />
                <MenuBar />
              </>
            }
          />
          <Route path=":postId/" element={<PostDetail />} />
          <Route path=":postId/edit" element={<PostEdit />} />
          <Route path="upload" element={<PostUpload />} />
        </Route>

        <Route
          path="/product/"
          element={
            accessToken && account ? <Outlet /> : <Navigate to={"/login"} />
          }
        >
          <Route path=":productId/" element={<ProductDetail />} />
          <Route path=":productId/edit" element={<ProductEdit />} />
          <Route path="upload" element={<ProductUpload />} />
        </Route>

        <Route
          path="/profile/:userId"
          element={
            accessToken && account ? (
              <>
                <Outlet />
                <MenuBar />
              </>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        >
          <Route index element={<UserProfile />} />
          <Route path="edit" element={<ProfileEdit />} />
          <Route path="followers" element={<Followers />} />
          <Route path="following" element={<Following />} />
        </Route>

        <Route
          path="/chatList"
          element={
            accessToken && account ? <Outlet /> : <Navigate to={"/login"} />
          }
        >
          <Route
            index
            element={
              <>
                <ChatList />
                <MenuBar />
              </>
            }
          />
          <Route path=":chatId" element={<ChatRoom />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
