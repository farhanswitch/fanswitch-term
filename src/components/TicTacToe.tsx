'use client';
import { useMinimax } from '../hooks/use-minimax';
import { useEffect } from 'react';

interface TicTacToeProps {
  onComplete: () => void;
}

export function TicTacToe({ onComplete }: TicTacToeProps) {
  const { board, handlePlayerMove, result, resetGame } = useMinimax();

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [result, onComplete]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <h2>Tic Tac Toe</h2>
      {result && <h3>{result === 'draw' ? 'Draw!' : `Winner: ${result}`}</h3>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '4px' }}>
        {board.map((cell, index) => (
          <div 
            key={index} 
            onClick={() => handlePlayerMove(index)}
            style={{ 
              width: '100px', 
              height: '100px', 
              border: '1px solid black', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '24px', 
              cursor: 'pointer',
              backgroundColor: '#f9f9f9'
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <button onClick={resetGame} style={{ padding: '8px 16px', marginTop: '16px' }}>Restart</button>
    </div>
  );
}
