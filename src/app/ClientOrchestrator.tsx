'use client';

import { useState } from 'react';
import { Board } from '@/components/tic-tac-toe/board';
import { Terminal } from '@/components/terminal/terminal';

interface ClientOrchestratorProps {
  educationContent: string;
  projectsContent: string;
  bioContent: string;
  socialsContent: string;
}

export default function ClientOrchestrator({
  educationContent,
  projectsContent,
  bioContent,
  socialsContent,
}: ClientOrchestratorProps) {
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleGameComplete = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsGameCompleted(true);
    }, 500);
  };

  if (isGameCompleted) {
    return (
      <div className="animate-in fade-in duration-700">
        <Terminal
          educationContent={educationContent}
          projectsContent={projectsContent}
          bioContent={bioContent}
          socialsContent={socialsContent}
        />
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      <Board onComplete={handleGameComplete} />
    </div>
  );
}
