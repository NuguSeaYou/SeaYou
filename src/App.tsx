import "./App.css";
import { useState } from "react";
import MainPage from "./pages/MainPage";
import EndPage from "./pages/EndPage";
import FirstTutorial from "./maps/FirstTutorial";

function App() {
  const [isMain, setIsMain] = useState<boolean>(true);
  const [isStart, setStart] = useState<boolean>(false);

  const startHandler = () => {
    setStart(true);
  };

  return (
    <>
      {isStart ? <FirstTutorial /> : <MainPage onStart={startHandler} />}
      {/* <button onClick={() => setIsMain(!isMain)}>
        {isMain ? "엔드페이지 보기" : "메인페이지 보기"}
      </button>
      {isMain ? <MainPage onStart={startHandler} /> : <EndPage />} */}
    </>
  );
}

export default App;
