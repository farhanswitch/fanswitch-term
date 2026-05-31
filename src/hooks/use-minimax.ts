import { useState, useCallback } from 'react';
import { BoardState, Player, GameResult } from '../types';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export function useMinimax() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [result, setResult] = useState<GameResult>(null);

  const checkWinner = (currentBoard: BoardState): GameResult => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    if (!currentBoard.includes(null)) return 'draw';
    return null;
  };

  const minimax = (newBoard: BoardState, depth: number, isMaximizing: boolean): number => {
    const res = checkWinner(newBoard);
    if (res === 'O') return 10 - depth;
    if (res === 'X') return depth - 10;
    if (res === 'draw') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = 'O';
          const score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = 'X';
          const score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const makeComputerMove = useCallback((currentBoard: BoardState) => {
    let bestScore = -Infinity;
    let move = -1;

    // Optional optimization: If it's the very first move of the game, take center
    if (currentBoard.every(cell => cell === null)) {
      move = 4;
    } else {
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          const score = minimax(currentBoard, 0, false);
          currentBoard[i] = null;
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
    }

    if (move !== -1) {
      const newBoard = [...currentBoard];
      newBoard[move] = 'O';
      setBoard(newBoard);
      
      const gameRes = checkWinner(newBoard);
      if (gameRes) {
        setResult(gameRes);
      } else {
        setIsXNext(true);
      }
    }
  }, []);

  const handlePlayerMove = useCallback((index: number) => {
    if (board[index] || result || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const gameRes = checkWinner(newBoard);
    if (gameRes) {
      setResult(gameRes);
      return;
    }

    setIsXNext(false);
    
    // Defer computer move slightly to allow state to update
    setTimeout(() => {
      makeComputerMove(newBoard);
    }, 0);
  }, [board, result, isXNext, makeComputerMove]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setResult(null);
  }, []);

  const triggerComputerFirst = useCallback(() => {
    const emptyBoard: BoardState = Array(9).fill(null);
    setBoard(emptyBoard);
    setIsXNext(false);
    setResult(null);
    setTimeout(() => {
      makeComputerMove([...emptyBoard]);
    }, 300);
  }, [makeComputerMove]);

  return {
    board,
    isXNext,
    result,
    handlePlayerMove,
    resetGame,
    triggerComputerFirst,
  };
}
