declare module 'gameTypes' {
  export interface History {
    squares: string[];
  }

  export interface GameState {
    history: History[];
    stepNumber: number;
    xIsNext: boolean;
  }

  export interface BoardProps {
    squares: string[];
    onClick: (i: number) => void;
  }

  export interface SquareProps {
    value: string;
    onClick: () => void;
  }
}
