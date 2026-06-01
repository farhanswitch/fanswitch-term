"use client";

import { useEffect, useState } from "react";
import { TypewriterText } from "./output";

interface SudoRmProps {
  onComplete: () => void;
}

const FILES_TO_DELETE = [
  "deleting /src/components/terminal/terminal.tsx... [OK]",
  "deleting /src/components/tic-tac-toe/board.tsx... [OK]",
  "deleting /src/app/page.tsx... [OK]",
  "deleting /src/content/bio.md... [OK]",
  "deleting /src/content/projects.md... [OK]",
  "deleting /public/test/3-CV-Muhammad Farhan.pdf... [OK]",
  "deleting /public/cv/CV-MuhammadFarhan-BackendDeveloper.pdf... [OK]",
  "deleting /node_modules/... [OK]",
  "deleting /package.json... [OK]",
  "deleting /tailwind.config.ts... [OK]",
  "deleting /tsconfig.json... [OK]",
  "deleting /.git/HEAD... [OK]",
  "deleting system32... wait, wrong OS... [OK]",
  "formatting volume /... [OK]",
];

export function SudoRmOutput({ onComplete }: SudoRmProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"deleting" | "glitch" | "punchline">(
    "deleting",
  );

  useEffect(() => {
    if (phase !== "deleting") return;

    const interval = setInterval(() => {
      setLines((prev) => {
        if (prev.length < FILES_TO_DELETE.length) {
          return [...prev, FILES_TO_DELETE[prev.length]];
        }
        return prev;
      });
    }, 120); // Fast deletion speed

    return () => clearInterval(interval);
  }, [phase]);

  // Use a separate effect to monitor lines length and trigger glitch
  useEffect(() => {
    if (phase === "deleting" && lines.length === FILES_TO_DELETE.length) {
      const timer = setTimeout(() => setPhase("glitch"), 400);
      return () => clearTimeout(timer);
    }
  }, [lines.length, phase]);

  useEffect(() => {
    if (phase === "glitch") {
      const timer = setTimeout(() => {
        setPhase("punchline");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (phase === "punchline") {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0b] flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          <TypewriterText
            text="System destroyed. Rebooting... Just kidding. My architecture is immutable."
            speed={40}
            className="text-red-500 font-mono text-sm sm:text-base leading-relaxed"
            onComplete={() => {
              setTimeout(() => {
                onComplete();
              }, 2500);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 py-2 font-mono text-xs sm:text-sm">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`${
            line.includes("wait, wrong OS")
              ? "text-amber-500"
              : "text-red-500/90"
          }`}
        >
          {line}
        </div>
      ))}
      {phase === "deleting" && lines.length > 0 && (
        <span className="inline-block w-2 h-4 bg-red-500 animate-pulse mt-1" />
      )}
    </div>
  );
}
