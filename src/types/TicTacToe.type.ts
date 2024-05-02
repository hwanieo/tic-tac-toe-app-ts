export interface Players {
  [key: string]: string;
}

export interface Turns {
  square: {
    row: number;
    col: number;
  };
  player: string;
}

export type GameBoard = (string | null)[][];

export type PlayerSymbol = string;
