interface GameOverProps {
  winner: string | undefined;
  onRematch: () => void;
}

export default function GameOver({ winner, onRematch }: GameOverProps) {
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      {winner && <span>{String(winner)} won!</span>}
      {!winner && <span>It's a draw!</span>}
      <p>
        <button onClick={onRematch}>Rematch!</button>
      </p>
    </div>
  );
}
