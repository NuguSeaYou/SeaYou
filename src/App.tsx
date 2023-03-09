import "./App.css";
import { useState } from "react";
import MainPage from "./pages/MainPage";
import EndPage from "./pages/EndPage";
import FirstTutorial from "./maps/FirstTutorial";
import Canvas from "./pages/Canvas";

function App() {
  const [isStart, setStart] = useState<boolean>(false);

  const startHandler = () => {
    setStart(true);
  };

  return (
    <>
      {isStart ? <FirstTutorial /> : <MainPage onStart={startHandler} />}
      {/* <Canvas /> */}
    </>
  );
}

export default App;
