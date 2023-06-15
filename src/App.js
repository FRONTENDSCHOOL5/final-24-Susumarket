import { useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./routes/Router";
import { UserContext } from "./context/UserContext.jsx"
import { ModalContext } from "./context/ModalContext.jsx";
function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{
        accessToken, setAccessToken
      }}> 
      <ModalContext.Provider value={{ 
        isOpenConfirmModal,
        setIsOpenConfirmModal,
        isOpenPostModal,
        setIsOpenPostModal }}>
        <Router />
      </ModalContext.Provider>
      </UserContext.Provider>
    </>
  );
}
export default App;
