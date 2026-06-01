"use client";

import { useMinimax } from "@/hooks/use-minimax";
import { useState, useCallback } from "react";
import { GameOverDialog } from "./dialog";

interface BoardProps {
  onComplete: () => void;
}

export function Board({ onComplete }: BoardProps) {
  const {
    board,
    handlePlayerMove,
    result,
    isXNext,
    resetGame,
    triggerComputerFirst,
  } = useMinimax();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Show dialog when game ends (once)
  if (result && !dialogShown) {
    setDialogShown(true);
    setTimeout(() => setShowDialog(true), 600);
  }

  const handleDialogClose = useCallback(() => {
    setShowDialog(false);
    onComplete();
  }, [onComplete]);

  const handleStart = useCallback(
    (goFirst: boolean) => {
      setHasStarted(true);
      if (goFirst) {
        resetGame();
      } else {
        triggerComputerFirst();
      }
    },
    [resetGame, triggerComputerFirst],
  );

  const renderCell = (index: number) => {
    const value = board[index];
    const isClickable = !value && !result && isXNext;

    return (
      <button
        key={index}
        onClick={() => handlePlayerMove(index)}
        disabled={!isClickable}
        aria-label={`Cell ${index + 1}: ${value || "empty"}`}
        className={`
          relative aspect-square w-full
          flex items-center justify-center
          bg-zinc-900/50
          border border-zinc-800/60
          text-2xl sm:text-3xl font-mono font-bold
          transition-all duration-150 ease-out
          ${
            isClickable
              ? "cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-700"
              : "cursor-default"
          }
          ${value === "X" ? "text-zinc-100" : ""}
          ${value === "O" ? "text-emerald-400" : ""}
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50
          active:scale-[0.95]
          disabled:active:scale-100
        `}
      >
        {value && (
          <span className="animate-in fade-in zoom-in-50 duration-200">
            {value}
          </span>
        )}
      </button>
    );
  };

  // Pre-game: choose who starts
  if (!hasStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-dvh w-full bg-[#0a0a0b] text-zinc-300 font-mono px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
            Muhammad Farhan
          </h1>
          <p className="text-sm text-zinc-500 mt-1 uppercase tracking-[0.2em]">
            Backend Developer
          </p>
        </div>

        {/* Prompt */}
        <div className="mb-8 text-center">
          <p className="text-sm text-zinc-500 mb-1">Before we begin —</p>
          <h2 className="text-lg text-zinc-200">Who goes first?</h2>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleStart(true)}
            className="
              px-8 py-3
              bg-transparent border border-zinc-700
              text-zinc-300 font-mono text-sm uppercase tracking-widest
              hover:border-emerald-400/60 hover:text-emerald-400
              transition-all duration-150
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50
              active:scale-[0.97]
            "
          >
            I do
          </button>
          <button
            onClick={() => handleStart(false)}
            className="
              px-8 py-3
              bg-emerald-500 border border-emerald-500
              text-zinc-950 font-mono text-sm font-bold uppercase tracking-widest
              hover:bg-emerald-400
              transition-all duration-150
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50
              active:scale-[0.97]
            "
          >
            Computer
          </button>
        </div>

        <p className="mt-12 text-[11px] text-zinc-700 max-w-xs text-center leading-relaxed">
          Hint: The algorithm is unbeatable. You&apos;ve been warned.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-dvh w-full bg-[#0a0a0b] text-zinc-300 font-mono px-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
          Your Name
        </h1>
        <p className="text-xs text-zinc-500 mt-1 uppercase tracking-[0.2em]">
          Backend Developer
        </p>
      </div>

      {/* Status bar */}
      <div className="mb-6 flex items-center gap-3 text-xs text-zinc-500">
        <span
          className={`transition-colors ${isXNext && !result ? "text-zinc-100" : ""}`}
        >
          You (X)
        </span>
        <span className="text-zinc-700">vs</span>
        <span
          className={`transition-colors ${!isXNext && !result ? "text-emerald-400" : ""}`}
        >
          Computer (O)
        </span>
        {!isXNext && !result && (
          <span className="ml-2 text-emerald-500/60 animate-pulse text-[10px]">
            thinking...
          </span>
        )}
      </div>

      {/* Board grid */}
      <div className="grid grid-cols-3 gap-1 w-full max-w-[280px] sm:max-w-[320px]">
        {Array.from({ length: 9 }).map((_, i) => renderCell(i))}
      </div>

      {/* Result tag */}
      {result && (
        <div className="mt-6 text-sm text-zinc-500 animate-in fade-in duration-300">
          {result === "draw"
            ? "Draw."
            : result === "O"
              ? "Computer wins."
              : "You win?!"}
        </div>
      )}

      {/* Game Over Dialog */}
      <GameOverDialog
        open={showDialog}
        result={result}
        onClose={handleDialogClose}
      />
    </div>
  );
}
