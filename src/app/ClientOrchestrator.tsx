'use client';
import { useState } from 'react';
import { TicTacToe } from '../components/TicTacToe';
import { Terminal } from '../components/Terminal';

interface ClientOrchestratorProps {
  educationContent: string;
  projectsContent: string;
}

export default function ClientOrchestrator({ educationContent, projectsContent }: ClientOrchestratorProps) {
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      {!isGameCompleted ? (
        <TicTacToe onComplete={() => setIsGameCompleted(true)} />
      ) : (
        <Terminal educationContent={educationContent} projectsContent={projectsContent} />
      )}
    </div>
  );
}
