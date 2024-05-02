import { GameBoard as Board } from '../../types/TicTacToe.type';

interface GameBoardProps {
  board: Board;
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
}

export default function GameBoard({ board, onSelectSquare }: GameBoardProps) {
  return (
    <ol id='game-board'>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
