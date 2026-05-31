'use client';
import { useState } from 'react';
import { TerminalLog } from '../types';

interface TerminalProps {
  educationContent: string;
  projectsContent: string;
}

export function Terminal({ educationContent, projectsContent }: TerminalProps) {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { type: 'system', output: 'Welcome to the portfolio terminal. Type /help for commands.' }
  ]);
  const [input, setInput] = useState('');

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLogs: TerminalLog[] = [...logs, { type: 'input', command: trimmed, output: `> ${trimmed}` }];

    switch (trimmed) {
      case '/help':
        newLogs.push({ type: 'output', output: ['Available commands:', '/help - Show this message', '/education - View education', '/projects - View projects', '/clear - Clear terminal'] });
        break;
      case '/education':
        newLogs.push({ type: 'output', output: educationContent });
        break;
      case '/projects':
        newLogs.push({ type: 'output', output: projectsContent });
        break;
      case '/clear':
        setLogs([]);
        setInput('');
        return;
      default:
        newLogs.push({ type: 'error', output: `Command not found: ${trimmed}` });
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <div style={{ width: '600px', maxWidth: '100%', border: '1px solid black', padding: '16px', backgroundColor: '#f0f0f0' }}>
      <h2>Terminal</h2>
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '16px', backgroundColor: '#fff', padding: '8px', border: '1px solid #ccc' }}>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: '8px', color: log.type === 'error' ? 'red' : log.type === 'system' ? 'blue' : 'black' }}>
            {Array.isArray(log.output) ? (
              log.output.map((line, j) => <div key={j}>{line}</div>)
            ) : (
              <div style={{ whiteSpace: 'pre-wrap' }}>{log.output}</div>
            )}
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCommand(input);
        }}
        placeholder="Type a command..."
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
    </div>
  );
}
