'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { TypewriterText } from './output';
import { QuickMenu } from './quick-menu';

interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  isStreaming: boolean;
}

interface TerminalProps {
  educationContent: string;
  projectsContent: string;
}

let logIdCounter = 0;
function nextId() {
  return `log-${++logIdCounter}-${Date.now()}`;
}

const HELP_TEXT = `Available commands:

  /help        — Show this help menu
  /education   — View education background
  /projects    — View project portfolio
  /clear       — Clear terminal history

Tip: Click the quick buttons below or type a command.`;

const WELCOME_TEXT = `> Welcome to the interactive portfolio terminal.
> Type /help for available commands or use the quick menu below.
> ─────────────────────────────────────────`;

export function Terminal({ educationContent, projectsContent }: TerminalProps) {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: nextId(), type: 'system', content: WELCOME_TEXT, isStreaming: true },
  ]);
  const [input, setInput] = useState('');
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
      prev.map((log) => (log.isStreaming ? { ...log, isStreaming: false } : log))
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
        type: 'input',
        content: trimmed,
        isStreaming: false,
      };

      if (trimmed === '/clear') {
        setLogs([]);
        setInput('');
        setIsStreaming(false);
        return;
      }

      let outputContent: string;
      let outputType: 'output' | 'error' = 'output';

      switch (trimmed) {
        case '/help':
          outputContent = HELP_TEXT;
          break;
        case '/education':
          outputContent = educationContent;
          break;
        case '/projects':
          outputContent = projectsContent;
          break;
        default:
          outputContent = `Command not found: "${trimmed}"\nType /help to see available commands.`;
          outputType = 'error';
      }

      const outputLog: TerminalLog = {
        id: nextId(),
        type: outputType,
        content: outputContent,
        isStreaming: true,
      };

      setIsStreaming(true);
      setLogs((prev) => [...prev, inputLog, outputLog]);
      setInput('');
    },
    [educationContent, projectsContent]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
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
          <div className="w-3 h-3 rounded-full bg-zinc-700/80" />
          <div className="w-3 h-3 rounded-full bg-zinc-700/80" />
          <div className="w-3 h-3 rounded-full bg-zinc-700/80" />
        </div>
        <span className="text-xs text-zinc-500 ml-2 tracking-wide">portfolio — terminal</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">live</span>
        </div>
      </div>

      {/* Scrollable log area */}
      <div
        ref={scrollRef}
        onClick={handleTerminalClick}
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-3 scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#27272a #0a0a0b',
        }}
      >
        {logs.map((log) => (
          <div key={log.id} className="min-w-0">
            {log.type === 'input' && (
              <div className="flex items-start gap-2 text-sm">
                <span className="text-emerald-500 shrink-0 select-none">❯</span>
                <span className="text-zinc-300">{log.content}</span>
              </div>
            )}

            {log.type === 'system' && (
              <div className="text-zinc-500">
                {log.isStreaming ? (
                  <TypewriterText
                    text={log.content}
                    speed={8}
                    onComplete={handleStreamComplete}
                    className="text-zinc-500"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">{log.content}</pre>
                )}
              </div>
            )}

            {log.type === 'output' && (
              <div className="pl-0 sm:pl-4 mt-1">
                {log.isStreaming ? (
                  <TypewriterText
                    text={log.content}
                    speed={10}
                    onComplete={handleStreamComplete}
                    className="text-emerald-400/90"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-emerald-400/90">{log.content}</pre>
                )}
              </div>
            )}

            {log.type === 'error' && (
              <div className="pl-0 sm:pl-4 mt-1">
                {log.isStreaming ? (
                  <TypewriterText
                    text={log.content}
                    speed={10}
                    onComplete={handleStreamComplete}
                    className="text-red-400/80"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-red-400/80">{log.content}</pre>
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
