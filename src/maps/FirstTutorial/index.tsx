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

export default function FirstTutorial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 2, y: 2 });
  const [board, setBoard] = useState<number[][]>(gameBoard);
  const [startGame, setStartGame] = useState(false);
  const [prevKey, setPrevKey] = useState("");
  const [history, setHistory] = useState<number[][]>([]);

  const startHandler = () => {
    setStartGame(true);
  };

  // useEffect(() => {
  //   const newBoard = [...board];
  //   for (let i = 0; i < newBoard.length; i++) {
  //     for (let j = 0; j < newBoard[i].length; j++) {
  //       if (newBoard[i][j] === 1) {
  //         newBoard[i][j] = 0;
  //       }
  //     }
  //   }
  //   newBoard[position.y][position.x] = 1;
  //   setBoard(newBoard);
  // }, [position]);

  useEffect(() => {
    drawBackground();
    //drawCharacter();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 1) {
          drawCharacter();
        }
        if (board[i][j] === 2) {
          drawRock(j * 100, i * 100);
        }
        if (board[i][j] === 3) {
          drawBrick(j * 100, i * 100);
        }
        if (board[i][j] === 4) {
          drawTarget(j * 100, i * 100);
        }
      }
    }
  }, [startGame, board]);

  const drawBackground = () => {
    drawImg({
      canvas: canvasRef,
      newImage: "/bg.png",
      x: 0,
      y: 0,
      w: board[0].length * 100 + 100,
      h: board.length * 100 + 100,
    });
  };

  const drawCharacter = () => {
    drawImg({
      canvas: canvasRef,
      newImage: "/baba.png",
      x: position.x * 100,
      y: position.y * 100,
      w: 100,
      h: 100,
    });
  };

  const drawBrick = (positionX: number, positionY: number) => {
    drawImg({
      canvas: canvasRef,
      newImage: "/brick.png",
      x: positionX,
      y: positionY,
      w: 100,
      h: 100,
    });
  };

  const drawRock = (positionX: number, positionY: number) => {
    drawImg({
      canvas: canvasRef,
      newImage: "/circle.png",
      x: positionX,
      y: positionY,
      w: 100,
      h: 100,
    });
  };

  const drawTarget = (positionX: number, positionY: number) => {
    drawImg({
      canvas: canvasRef,
      newImage: "/target.png",
      x: positionX,
      y: positionY,
      w: 100,
      h: 100,
    });
  };

  type directionType = {
    [key: string]: number[];
  };

  const direction: directionType = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
  };

  const histroyHandler = (key: string) => {
    const newHistory: number[][] = [...history];
    const reverseDirection = [direction[key][0] * -1, direction[key][1] * -1];
    if (direction[key]) {
      setHistory([...newHistory, reverseDirection]);
    }
  };

  const checkCanMove = (x: number, y: number, isCancle: boolean) => {
    if (isCancle) return false;
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
    setPosition({ ...newPosition });
  };

  const characterHandler = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    // if (prevKey === "Control" && (event.key === "z" || event.key === "Z")) {
    //   if (history) {
    //     const recentHistory = history.pop();
    //     recentHistory && moveHandler(recentHistory, true);
    //   }
    // }
    // setPrevKey(event.key);

    moveHandler(event.key);
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
        ref={canvasRef}
        width={board[0].length * 100}
        height={board.length * 100}
        tabIndex={0}
      />
    </div>
  );
}
