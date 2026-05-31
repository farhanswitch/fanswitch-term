'use client';

import { useTypewriter } from '@/hooks/use-typewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterText({ text, speed = 12, onComplete, className = '' }: TypewriterTextProps) {
  const { displayedText, isTyping, skipToEnd } = useTypewriter({
    text,
    speed,
    onComplete,
  });

  return (
    <pre
      className={`whitespace-pre-wrap break-words font-mono text-sm leading-relaxed ${className}`}
      onClick={isTyping ? skipToEnd : undefined}
      style={{ cursor: isTyping ? 'pointer' : 'default' }}
    >
      {displayedText}
      {isTyping && (
        <span className="inline-block w-1.5 h-4 bg-emerald-400 ml-0.5 align-middle animate-pulse" />
      )}
    </pre>
  );
}
