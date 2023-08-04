import { useEffect, useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./routes/Router";
import { UserContext } from "./context/UserContext.jsx";
import { ModalContext } from "./context/ModalContext.jsx";
import { WebpContext } from "./context/WebpContext";
import { detectWebpSupport } from "./library/checkWebpSupport";
function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null,
  );
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);
  const [isWebpSupported, setIsWebpSupported] = useState(false);

  useEffect(() => {
    detectWebpSupport();
    if (document.body.classList.contains("webp")) {
      setIsWebpSupported(true);
    } else {
      setIsWebpSupported(false);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
        }}
      >
        <WebpContext.Provider value={isWebpSupported}>
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
        </WebpContext.Provider>
      </UserContext.Provider>
    </>
  );
}
export default App;
