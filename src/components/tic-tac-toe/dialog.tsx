"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GameOverDialogProps {
  open: boolean;
  result: "X" | "O" | "draw" | null;
  onClose: () => void;
}

export function GameOverDialog({ open, result, onClose }: GameOverDialogProps) {
  const isPlayerWin = result === "X";
  const isDraw = result === "draw";

  const title = isPlayerWin
    ? "Impossible... Almost."
    : isDraw
      ? "A Draw? That's the Best You'll Get."
      : "You Lost. As Expected.";

  const description = isPlayerWin
    ? "Okay, you beat a minimax algorithm. Impressive. But can you ship production code at 2 AM? That's where I come in."
    : isDraw
      ? "You couldn't beat a tic-tac-toe bot. Imagine what happens when the codebase fights back. You need someone who wins against complexity — hire me."
      : "The algorithm is unbeatable — just like my commitment to clean architecture. If you want that kind of precision on your team, there's only one move left.";

  const subject = isDraw
    ? "Let's Talk — Your Tic Tac Toe Drew Me In"
    : "Let's Talk — I Just Lost to Your Portfolio";

  const mailtoHref = `mailto:your@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    "Hi,\n\nI just played the tic-tac-toe on your portfolio and I'm impressed. Let's chat about working together.\n\nBest,",
  )}`;

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <DialogContent
        className="
          bg-zinc-950 border border-zinc-800 text-zinc-100
          shadow-2xl shadow-emerald-500/5
          max-w-md
        "
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-emerald-400 text-base sm:text-lg font-mono">
            {title}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm leading-relaxed mt-2 font-mono">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
          <a
            href={mailtoHref}
            className="
              inline-flex items-center justify-center gap-2
              h-10 px-6
              bg-emerald-500 hover:bg-emerald-400
              text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest
              rounded-none
              transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50
              active:scale-[0.97]
            "
          >
            <span className="text-2xl -mt-2">✉</span>
            Hire Me
          </a>
          <Button
            variant="outline"
            onClick={onClose}
            className="
              border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600
              font-mono text-xs uppercase tracking-widest
            "
          >
            Continue →
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
