import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import Player from './components/Player';
import {
  GameBoard as Board,
  PlayerSymbol,
  Players,
  Turns,
} from './types/TicTacToe.type';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const PLAYERS: Players = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(turns: Turns[]): Board {
  const gameBoard = [
    ...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]),
  ];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveActivePlayer(turns: Turns[]): PlayerSymbol {
  let currentPlayer = 'X';

  if (turns.length > 0 && turns[0].player === 'X') currentPlayer = 'O';

  return currentPlayer;
}

function deriveWinner(gameBoard: Board, player: Players): string | undefined {
  let winner: string | undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState<Players>(PLAYERS);
  const [turns, setTurns] = useState<Turns[]>([]);

  const gameBoard = deriveGameBoard(turns);

  const activePlayer = deriveActivePlayer(turns);

  const winner = deriveWinner(gameBoard, players);

  const draw = turns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setTurns((prevTurn: Turns[]) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      console.log(updatedTurns);

      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol: string, newPlayerName: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newPlayerName,
      };
    });
  }

  function handleRematch() {
    setTurns([]);
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialPlayerName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onPlayerNameChange={handlePlayerNameChange}
          />
          <Player
            initialPlayerName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onPlayerNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
