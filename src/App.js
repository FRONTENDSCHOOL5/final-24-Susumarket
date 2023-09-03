import { useEffect, useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./routes/Router";
import { UserContext } from "./context/UserContext.jsx";
import { ModalContext } from "./context/ModalContext.jsx";
import { detectWebpSupport } from "./library/checkWebpSupport";
import useAuth from "./hook/useAuth";
import { AccountContext } from "./context/AccountContext";
function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null,
  );
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);
  // 자신의 프로필 정보를 가져오는 커스텀 훅
  const myProfile = useAuth(null);
  // account 상태
  const [account, setAccount] = useState(null);
  // webp 지원유무가 확인 되었을때 컴포넌트를 렌더링 시키위해 사용
  const [webpChecked, setWebpChecked] = useState(false);
  useEffect(() => {
    detectWebpSupport();
  }, []);

  const checkwebp = async () => {
    const webpSupport = await detectWebpSupport();
    if (webpSupport) {
      document.body.classList.add("webp");
    } else {
      document.body.classList.add("no-webp");
    }
    // webp 지원유무가 확인되었다면 true로 설정
    setWebpChecked(true);
  };

  useEffect(() => {
    checkwebp();
  }, []);

  // 유저 정보가 있을 경우에만 유저 데이터를 받아옴
  useEffect(() => {
    if (myProfile) {
      setAccount(myProfile.accountname);
    }
  }, [myProfile]);

  return (
    webpChecked && (
      <AccountContext.Provider value={{ setAccount, account }}>
        <GlobalStyle />
        <UserContext.Provider
          value={{
            accessToken,
            setAccessToken,
          }}
        >
          <ModalContext.Provider
            value={{
              isOpenConfirmModal,
              setIsOpenConfirmModal,
              isOpenPostModal,
              setIsOpenPostModal,
            }}
          >
            <Router />
          </ModalContext.Provider>
        </UserContext.Provider>
      </AccountContext.Provider>
    )
  );
}
export default App;
