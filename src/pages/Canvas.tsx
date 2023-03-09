import React, { useEffect, useState, useRef, useCallback } from "react";
import field from "../images/field.png";
import character from "../images/jjong.jpg";
import stone from "../images/stone.png";
import wall from "../images/wall.png";
import flag from "../images/flag.png";
import { tutorialMap2 } from "../utils/maps";

function Canvas() {
  type directionType = {
    [key: string]: number[];
  };

  const direction: directionType = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
  };

  const tutorialMap: number[][] = [
    [3, 3, 3, 3, 3, 3, 3, 3],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 1, 0, 2, 0, 0, 4, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [3, 3, 3, 3, 3, 3, 3, 3],
  ];

  type imageType = {
    [key: string]: string;
  };

  const [gameBoard, setGameBoard] = useState<number[][]>(tutorialMap2.map);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function game(board: number[][], target: number, move: string) {
    const newBoard = board.map((element) => [...element]);
    const width = newBoard[0].length;
    const height = newBoard.length;

    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(move)) {
      return;
    }

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        if (board[r][c] === target) {
          const nr = r + direction[move][0];
          const nc = c + direction[move][1];

          if (nr < 0 || nr >= height || nc < 0 || nc >= width) {
            continue;
          }

          if (newBoard[nr][nc] === 3) {
            continue;
          }

          if (newBoard[nr][nc] === 4) {
            console.log("성공!");
          }

          if (newBoard[nr][nc] === 0) {
            newBoard[nr][nc] = target;
            newBoard[r][c] = 0;
            break;
          }

          if (newBoard[nr][nc] === 2) {
            let queue = [
              [r, c],
              [nr, nc],
            ];
            let idx = 1;
            let isBreak = false;

            while (idx < queue.length) {
              const adjR = queue[idx][0] + direction[move][0];
              const adjC = queue[idx][1] + direction[move][1];
              idx += 1;

              if (adjR < 0 || adjR >= height || adjC < 0 || adjC >= width) {
                isBreak = true;
                break;
              }

              if (newBoard[adjR][adjC] >= 3) {
                isBreak = true;
                break;
              }

              queue.push([adjR, adjC]);

              if (newBoard[adjR][adjC] === 0) {
                break;
              }
            }

            if (!isBreak) {
              for (let idx = queue.length - 1; idx >= 1; idx--) {
                const beforeR = queue[idx - 1][0];
                const beforeC = queue[idx - 1][1];
                const newR = queue[idx][0];
                const newC = queue[idx][1];

                newBoard[newR][newC] = board[beforeR][beforeC];
                newBoard[beforeR][beforeC] = 0;
              }
            }
          }
        }
      }
    }
    setGameBoard(newBoard);
  }

  const drawGameBoard = useCallback(() => {
    const status = ["field", "character", "stone", "wall", "flag"];
    const images: imageType = { field, character, stone, wall, flag };
    const canvas = canvasRef.current;
    const context = canvas && canvas.getContext("2d");

    if (!context || !canvas) {
      return;
    }

    for (let r = 0; r < gameBoard.length; r++) {
      for (let c = 0; c < gameBoard[0].length; c++) {
        const boardImg = new Image();
        boardImg.src = images[status[gameBoard[r][c]]];

        boardImg.onload = function () {
          context.drawImage(boardImg, c * 100, r * 100, 100, 100);
        };
      }
    }
  }, [gameBoard]);

  function handleMove(event: React.KeyboardEvent<HTMLCanvasElement>) {
    game(gameBoard, 1, event.key);
  }

  useEffect(() => {
    drawGameBoard();
  }, [drawGameBoard, gameBoard]);

  return (
    <div>
      <canvas
        width={800}
        height={500}
        onKeyDown={handleMove}
        ref={canvasRef}
        tabIndex={0}
      />
    </div>
  );
}

export default Canvas;
