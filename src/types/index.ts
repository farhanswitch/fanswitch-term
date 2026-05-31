export type Player = 'X' | 'O' | null;
export type BoardState = Player[];
export type GameResult = 'X' | 'O' | 'draw' | null;

export type TerminalCommand = string;

export interface TerminalLog {
  command?: string;
  output: string | string[];
  type: 'input' | 'output' | 'error' | 'system';
}
