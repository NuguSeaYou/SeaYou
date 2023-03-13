import { useRef, useEffect, useState } from "react";
import drawImg from "./drawImg";
import classes from "./index.module.css";
import Button from "../../UI/Button";
import { tutorialMap1 } from "../../utils/maps";

const gameBoard = [
  [3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 0, 0, 0, 2, 0, 0, 0, 3],
  [3, 0, 1, 0, 2, 0, 4, 0, 3],
  [3, 0, 0, 0, 2, 0, 0, 0, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3],
];

type contentType = {
  id: number;
  imgURL: string;
  imgSize: number;
};

type positionType = {
  x: number;
  y: number;
};

export default function FirstTutorial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState<positionType>({
    x: tutorialMap1.userPosition[0],
    y: tutorialMap1.userPosition[1],
  });
  const [board, setBoard] = useState<number[][]>(tutorialMap1.map);
  const [startGame, setStartGame] = useState(false);
  const [onControl, setOnControl] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const startHandler = () => {
    setStartGame(true);
  };

  useEffect(() => {
    const newBoard = [...board];
    for (let i = 0; i < newBoard.length; i++) {
      for (let j = 0; j < newBoard[i].length; j++) {
        if (newBoard[i][j] === 1) {
          newBoard[i][j] = 0;
        }
      }
    }
    newBoard[position.y][position.x] = 1;
    setBoard(newBoard);
  }, [position]);

  useEffect(() => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        drawInCanvas(tutorialMap1.contents.Background, j * 50, i * 50);
        if (board[i][j] === 1) {
          drawInCanvas(tutorialMap1.contents.User, j * 50, i * 50);
        } else if (board[i][j] === 2) {
          drawInCanvas(tutorialMap1.contents.Rock, j * 50, i * 50);
        } else if (board[i][j] === 3) {
          drawInCanvas(tutorialMap1.contents.Brick, j * 50, i * 50);
        } else if (board[i][j] === 4) {
          drawInCanvas(tutorialMap1.contents.Flag, j * 50, i * 50);
        }
      }
    }
  }, [startGame, board]);

  const drawInCanvas = (content: contentType, x: number, y: number) => {
    drawImg({
      canvas: canvasRef,
      newImage: content.imgURL,
      x,
      y,
      w: content.imgSize,
      h: content.imgSize,
    });
  };

  type directionType = {
    [key: string]: number[];
  };

  const direction: directionType = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
  };

  const histroyHandler = (key: string) => {
    const newHistory: string[] = [...history];
    if (direction[key]) setHistory([...newHistory, key]);
  };

  const checkCanMove = (x: number, y: number, isCancle: boolean) => {
    if (board[x][y] === 3) return false;
    if (board[x][y] === 2) return false;
    return true;
  };

  const moveHandler = (key: string, isCancle: boolean = false) => {
    const newPosition = { ...position };
    newPosition.x += direction[key][0];
    newPosition.y += direction[key][1];
    const check = checkCanMove(newPosition.x, newPosition.y, isCancle);
    if (!check) return;
    !isCancle && histroyHandler(key);
    console.log(position, newPosition);
    setPosition({ ...newPosition });
  };

  const controlHandler = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "Control") {
      setOnControl(false);
    }
  };

  const characterHandler = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (onControl && (event.key === "z" || event.key === "Z")) {
      if (history) {
        const recentHistory = history.pop();
        if ("ArrowUp" === recentHistory) moveHandler("ArrowDown", true);
        if ("ArrowDown" === recentHistory) moveHandler("ArrowUp", true);
        if ("ArrowLeft" === recentHistory) moveHandler("ArrowRight", true);
        if ("ArrowRight" === recentHistory) moveHandler("ArrowLeft", true);
      }
    }
    if (event.key === "Control") {
      setOnControl(true);
    }
    if (direction[event.key]) {
      moveHandler(event.key);
    }
  };

  return (
    <div className={classes.canvasWrapper}>
      <Button
        onClickEvent={startHandler}
        className="game-start-button"
        content="시작하기"
      />
      <canvas
        onKeyDown={characterHandler}
        onKeyUp={controlHandler}
        ref={canvasRef}
        width={board[0].length * 50}
        height={board.length * 50}
        tabIndex={0}
      />
    </div>
  );
}
