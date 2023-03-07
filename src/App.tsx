import "./App.css";
// import { useState } from "react";
// import MainPage from "./pages/MainPage";
// import EndPage from "./pages/EndPage";
import Canvas from "./pages/Canvas";

function App() {
  // const [isMain, setIsMain] = useState<boolean>(true);

  return (
    <>
      {/* <button onClick={() => setIsMain(!isMain)}>{isMain ? "엔드페이지 보기" : "메인페이지 보기"}</button>
      {isMain ? <MainPage /> : <EndPage/>} */}
      <Canvas />
    </>
  );
}

export default App;
