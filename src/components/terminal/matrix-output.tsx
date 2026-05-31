'use client';

import { useEffect, useState, useRef } from 'react';
import { TypewriterText } from './output';

interface MatrixOutputProps {
  onComplete: () => void;
}

const HACK_SNIPPETS = [
  '0x00000000  7f 45 4c 46 02 01 01 00  00 00 00 00 00 00 00 00  |.ELF............|',
  'func (s *Server) ListenAndServe() error {',
  '  addr := s.Addr',
  '  if addr == "" { addr = ":http" }',
  '  ln, err := net.Listen("tcp", addr)',
  '  return s.Serve(ln)',
  '}',
  'Accessing secure enclave... [BYPASSED]',
  'Decrypting RSA-4096 keys... [OK]',
  '0x00000020  01 00 00 00 01 00 00 00  00 00 00 00 00 00 00 00  |................|',
  'func processBatch(ctx context.Context, batch []Data) error {',
  'Injecting payload into memory space... [SUCCESS]',
  'Connection established on port 443.',
  'Bypassing firewall rules... [OVERRIDDEN]',
  'Routing through proxy nodes: 192.168.1.5 -> 10.0.0.12',
  '0x00000040  00 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00  |........@.......|',
  'panic: runtime error: index out of range [IGNORE]',
  'Executing buffer overflow payload...',
  'Root access granted.',
  'Downloading classified schematics...',
  'const ENCRYPTION_KEY = "0x8F9A2B3C4D5E6F7A"',
  'type Vulnerability struct { ID string; Severity int }',
];

export function MatrixOutput({ onComplete }: MatrixOutputProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<'hacking' | 'punchline'>('hacking');
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  // Hacking phase: spam lines extremely fast
  useEffect(() => {
    if (phase !== 'hacking') return;

    let count = 0;
    const interval = setInterval(() => {
      // Pick 2-4 random snippets at once for a chaotic effect
      const newLines = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => {
        return HACK_SNIPPETS[Math.floor(Math.random() * HACK_SNIPPETS.length)];
      });
      
      setLines((prev) => {
        const next = [...prev, ...newLines];
        // Keep only the last 60 lines to prevent DOM bloat/lag
        return next.length > 60 ? next.slice(next.length - 60) : next;
      });
      
      count++;
      // Stop after ~2.5 seconds (50 iterations * 50ms)
      if (count > 50) {
        clearInterval(interval);
        setTimeout(() => setPhase('punchline'), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  // Keep auto-scrolling to bottom during the hack phase
  useEffect(() => {
    if (phase === 'hacking' && scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [lines, phase]);

  return (
    <div className="flex flex-col py-2 font-mono text-xs sm:text-sm">
      {/* The chaotic hacker text */}
      <div className="text-emerald-500/80 leading-snug">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all sm:break-normal">
            {line}
          </div>
        ))}
      </div>
      
      {/* Invisible anchor to force scrolling down inside the terminal container */}
      <div ref={scrollAnchorRef} />

      {/* The Punchline */}
      {phase === 'punchline' && (
        <div className="mt-4 pt-4 border-t border-zinc-800/60 text-emerald-400">
          <TypewriterText
            text="Access granted to the mainframe... Not really. I'm just a backend dev, not a wizard."
            speed={25}
            onComplete={() => {
              setTimeout(() => {
                onComplete();
              }, 1500);
            }}
          />
        </div>
      )}
    </div>
  );
}
