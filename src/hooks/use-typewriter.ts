'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

export function useTypewriter({ text, speed = 12, startDelay = 0, onComplete }: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  const skipToEnd = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setDisplayedText(text);
    setIsTyping(false);
    setIsComplete(true);
    onComplete?.();
  }, [text, onComplete]);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText('');
    setIsTyping(true);
    setIsComplete(false);
    lastTimeRef.current = 0;

    const delayTimer = setTimeout(() => {
      const tick = (timestamp: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        const elapsed = timestamp - lastTimeRef.current;

        if (elapsed >= speed) {
          lastTimeRef.current = timestamp;
          indexRef.current += 1;

          if (indexRef.current >= text.length) {
            setDisplayedText(text);
            setIsTyping(false);
            setIsComplete(true);
            onComplete?.();
            return;
          }

          // Burst 1-3 chars at a time for more natural "streaming" feel
          const charsToAdd = text[indexRef.current - 1] === '\n' ? 1 : Math.min(3, text.length - indexRef.current + 1);
          const endIdx = Math.min(indexRef.current + charsToAdd - 1, text.length);
          indexRef.current = endIdx;
          setDisplayedText(text.slice(0, endIdx));
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [text, speed, startDelay, onComplete]);

  return { displayedText, isTyping, isComplete, skipToEnd };
}
