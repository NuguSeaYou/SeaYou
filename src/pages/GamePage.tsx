import { useEffect, useState, useRef, useCallback } from "react";
import { tutorialMap2 } from "../utils/maps";
import Images from "../utils/images";
import FailModal from "./FailModal";

function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const limit = useRef<number>(20);
  const [board, setBoard] = useState<number[][]>(tutorialMap2.map);
  const [isFail, setIsFail] = useState<boolean>(false);
  const [count, setCount] = useState<number>(limit.current);

  function setCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = tutorialMap2.width;
    canvas.height = tutorialMap2.height;
    canvas.style.background = `url(${Images.background.src})`;
  };

  function keyHandler(event: React.KeyboardEvent<HTMLCanvasElement>): void {
    checkWin();

    if (event.key === "z") {
      backBoard();
    } else {
      changeBoard();
    };
  };

  function checkWin() {
    if (limit.current > 0) {
      setIsFail(false);
    } else {
      setIsFail(true);
    };
  };

  function backBoard(): void {
    limit.current += 1;
    setCount(count - 1);
  };

  function changeBoard(): void {
    limit.current -= 1;
    setCount(count + 1);
  };

  function drawImage(canvas: HTMLCanvasElement, x: number, y: number, img: HTMLImageElement) {
    const context = canvas.getContext("2d");
    context?.drawImage(img, x * 50, y * 50, 50, 50);
  };

  function matchImage(imgNumber: number): HTMLImageElement {
    switch (imgNumber) {
      case 1:
        return Images.baba;
      case 2:
        return Images.rock;
      case 3:
        return Images.wall;
      case 4:
        return Images.flag;
      default:
        return Images.background;
    };
  };

  function drawBoard() {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    };

    canvas.focus();

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[0].length; c++) {
        const useImage = matchImage(board[r][c]);
        drawImage(canvas, c, r, useImage)
      };
    };
  };

  function reStart() {
    setBoard(tutorialMap2.map);
    limit.current = 20;
    setIsFail(false);
    drawBoardCallback();
    setCount(limit.current);
  };

  const drawBoardCallback = useCallback(drawBoard, [board])

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas && setCanvas(canvas);
  }, [])

  useEffect(() => {
    drawBoardCallback();
  }, [drawBoardCallback, count])

  return (
    <div>
      <button onClick={reStart}>다시 시작</button>
      <h2>이동 횟수 : {limit.current}</h2>
      <canvas
        onKeyDown={keyHandler}
        ref={canvasRef}
        tabIndex={0}
      />
    </div>
  )
};

export default GamePage;