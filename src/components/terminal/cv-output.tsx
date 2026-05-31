"use client";

import { useState } from "react";
import { useTypewriter } from "@/hooks/use-typewriter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface CvOutputProps {
  onComplete?: () => void;
}

export function CvOutput({ onComplete }: CvOutputProps) {
  const [open, setOpen] = useState(false);
  const { displayedText, isTyping } = useTypewriter({
    text: "This document details my professional experience, education, and technical skills. It's a comprehensive overview of my journey as a Backend Developer.",
    speed: 8,
    onComplete,
  });

  const handleDownload = () => {
    // Programmatically trigger download
    const link = document.createElement("a");
    link.href = "/test/3-CV-Muhammad%20Farhan.pdf";
    link.download = "3-CV-Muhammad Farhan.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-start gap-4 py-2">
      <p className="text-zinc-400 font-mono text-sm leading-relaxed max-w-lg min-h-[3rem]">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-1 h-3.5 bg-emerald-500/60 ml-1 animate-pulse" />
        )}
      </p>

      <button
        onClick={() => setOpen(true)}
        disabled={isTyping}
        className="
          group inline-flex items-center gap-2
          px-4 py-2
          border border-zinc-800 rounded-md
          bg-zinc-950
          text-zinc-300 font-mono text-sm
          transition-all duration-150
          hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-emerald-400/5
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50
          active:scale-[0.97]
          disabled:opacity-0 disabled:translate-y-2
        "
      >
        <FileText className="size-4 text-zinc-500 group-hover:text-emerald-400/70 transition-colors" />
        View & Download CV
        <Download className="size-3.5 ml-1 text-zinc-600 group-hover:text-emerald-400/50 transition-colors" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            bg-zinc-950 border border-zinc-800 text-zinc-100
            shadow-2xl shadow-emerald-500/5
            max-w-md font-mono
          "
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle className="text-emerald-400 text-base sm:text-lg">
              Download CV
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-sm leading-relaxed mt-2">
              Are you sure you want to download my Curriculum Vitae? The file
              &quot;3-CV-Muhammad Farhan.pdf&quot; will be saved to your device.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="
                border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 hover:bg-transparent
                font-mono text-xs uppercase tracking-widest
                rounded-md
              "
            >
              Cancel
            </Button>
            <Button
              onClick={handleDownload}
              className="
                bg-emerald-500 hover:bg-emerald-400
                text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest
                rounded-md
                transition-all duration-150
              "
            >
              Confirm Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
