"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { TypewriterText } from "./output";
import { QuickMenu } from "./quick-menu";
import { SocialsOutput } from "./socials-output";
import { CvOutput } from "./cv-output";
import { SudoRmOutput } from "./sudo-rm";
import { MatrixOutput } from "./matrix-output";

interface TerminalLog {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
  isStreaming: boolean;
  richContent?: ReactNode;
}

interface TerminalProps {
  educationContent: string;
  projectsContent: string;
  bioContent: string;
}

let logIdCounter = 0;
function nextId() {
  return `log-${++logIdCounter}-${Date.now()}`;
}

const HELP_TEXT = `Available commands:

  /help          — Show this help menu
  /bio           — About me
  /education     — View education background
  /projects      — View project portfolio
  /cv            — Download my Curriculum Vitae
  /socials       — Social links & contact
  /clear         — Clear terminal history

Easter Eggs:
  /matrix        — Initialize secure proxy routing...
  /sudo rm -rf / — Do not type this. Seriously.

Tip: Click the quick buttons below or type a command.`;

const WELCOME_TEXT = `> Welcome to the interactive portfolio terminal.
> Type /help for available commands or use the quick menu below.
> ─────────────────────────────────────────`;

export function Terminal({
  educationContent,
  projectsContent,
  bioContent,
}: TerminalProps) {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: nextId(), type: "system", content: WELCOME_TEXT, isStreaming: true },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isStreaming, setIsStreaming] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, [isStreaming]);

  const handleStreamComplete = useCallback(() => {
    setIsStreaming(false);
    setLogs((prev) =>
      prev.map((log) =>
        log.isStreaming ? { ...log, isStreaming: false } : log,
      ),
    );
    // Re-focus the input after stream completes
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      if (!trimmed) return;

      const inputLog: TerminalLog = {
        id: nextId(),
        type: "input",
        content: trimmed,
        isStreaming: false,
      };

      if (trimmed === "/clear") {
        setLogs([]);
        setInput("");
        setHistoryIndex(-1);
        setIsStreaming(false);
        return;
      }

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      let outputContent: string;
      let outputType: "output" | "error" = "output";
      let richContent: ReactNode | undefined;

      switch (trimmed) {
        case "/help":
          outputContent = HELP_TEXT;
          break;
        case "/bio":
          outputContent = bioContent;
          break;
        case "/education":
          outputContent = educationContent;
          break;
        case "/projects":
          outputContent = projectsContent;
          break;
        case "/cv":
          outputContent = "# Curriculum Vitae";
          richContent = <CvOutput onComplete={handleStreamComplete} />;
          break;
        case "/socials":
          outputContent = "# Socials & Contact";
          richContent = <SocialsOutput onComplete={handleStreamComplete} />;
          break;
        case "sudo rm -rf /":
        case "/sudo rm -rf /":
        case "sudo rm -rf":
          outputContent = "> Initiating override...";
          richContent = (
            <SudoRmOutput
              onComplete={() => {
                setLogs([]);
                setInput("");
                setHistoryIndex(-1);
                setIsStreaming(false);
              }}
            />
          );
          break;
        case "/matrix":
        case "/hack":
          outputContent = "> Initializing secure proxy routing...";
          richContent = <MatrixOutput onComplete={handleStreamComplete} />;
          break;
        default:
          outputContent = `Command not found: "${trimmed}"\nType /help to see available commands.`;
          outputType = "error";
      }

      const outputLog: TerminalLog = {
        id: nextId(),
        type: outputType,
        content: outputContent,
        isStreaming: true,
        richContent,
      };

      setIsStreaming(true);
      setLogs((prev) => [...prev, inputLog, outputLog]);
      setInput("");
    },
    [educationContent, projectsContent, bioContent, handleStreamComplete, history, historyIndex],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
      }
    }
  };

  const handleQuickCommand = (cmd: string) => {
    executeCommand(cmd);
  };

  // Click on terminal body focuses input
  const handleTerminalClick = () => {
    if (!isStreaming) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-[#0a0a0b] text-zinc-300 font-mono selection:bg-emerald-400/20 selection:text-emerald-300">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm shrink-0">
        <div className="flex gap-1.5">
          {/* Tombol Close (Merah) */}
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-150 cursor-pointer" />

          {/* Tombol Minimize (Kuning) */}
          <div className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors duration-150 cursor-pointer" />

          {/* Tombol Maximize/Full Screen (Hijau) */}
          <div className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors duration-150 cursor-pointer" />
        </div>
        <span className="text-s font-semibold text-zinc-500 ml-2 tracking-wide">
          FarhanSwitch — Terminal
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
            live
          </span>
        </div>
      </div>

      {/* Scrollable log area */}
      <div
        ref={scrollRef}
        onClick={handleTerminalClick}
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-3 scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#27272a #0a0a0b",
        }}
      >
        {logs.map((log) => (
          <div key={log.id} className="min-w-0">
            {log.type === "input" && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-emerald-500 shrink-0 select-none">❯</span>
                <span className="text-zinc-300">{log.content}</span>
              </div>
            )}

            {log.type === "system" && (
              <div className="text-zinc-500">
                {log.isStreaming ? (
                  <TypewriterText
                    text={log.content}
                    speed={8}
                    onComplete={handleStreamComplete}
                    className="text-zinc-500"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {log.content}
                  </pre>
                )}
              </div>
            )}

            {log.type === "output" && (
              <div className="pl-0 sm:pl-4 mt-1">
                {log.isStreaming ? (
                  <TypewriterText
                    text={log.content}
                    speed={10}
                    onComplete={() => {
                      if (log.richContent) {
                        setLogs((prev) =>
                          prev.map((l) =>
                            l.id === log.id ? { ...l, isStreaming: false } : l
                          )
                        );
                      } else {
                        handleStreamComplete();
                      }
                    }}
                    className="text-emerald-400/90"
                  />
                ) : (
                  <>
                    <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-emerald-400/90">
                      {log.content}
                    </pre>
                    {log.richContent && (
                      <div className="mt-2">{log.richContent}</div>
                    )}
                  </>
                )}
              </div>
            )}

            {log.type === "error" && (
              <div className="pl-0 sm:pl-4 mt-1">
                {log.isStreaming ? (
                  <TypewriterText
                    text={log.content}
                    speed={10}
                    onComplete={handleStreamComplete}
                    className="text-red-400/80"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-red-400/80">
                    {log.content}
                  </pre>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Active input line */}
        {!isStreaming && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-500 shrink-0 select-none">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              placeholder="Type a command..."
              className="
                flex-1 bg-transparent border-none outline-none
                text-zinc-200 placeholder:text-zinc-700
                font-mono text-sm
                caret-emerald-400
              "
            />
          </div>
        )}
      </div>

      {/* Quick macro menu */}
      <QuickMenu onCommand={handleQuickCommand} disabled={isStreaming} />
    </div>
  );
}
