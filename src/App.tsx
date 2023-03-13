import "./App.css";
import { useState } from "react";
import MainPage from "./pages/MainPage";
// import EndPage from "./pages/EndPage";
import FirstTutorial from "./maps/FirstTutorial";

function App() {
  const [isStart, setStart] = useState<boolean>(false);

  const startHandler = () => {
    setStart(true);
  };

  return (
    <>
      {isStart ? <FirstTutorial /> : <MainPage onStart={startHandler} />}
    </>
  );
}

export default App;
