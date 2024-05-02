import { ChangeEvent, useState } from 'react';

interface PlayerProps {
  initialPlayerName: string;
  symbol: string;
  isActive: boolean;
  onPlayerNameChange: (symbol: string, newPlayerName: string) => void;
}

export default function Player({
  initialPlayerName,
  symbol,
  isActive,
  onPlayerNameChange,
}: PlayerProps) {
  const [playerName, setPlayerName] = useState<string>(initialPlayerName);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  function handleEditClick() {
    setIsEdit((prevIsEdit) => !prevIsEdit);

    // 이 때의 isEdit은 이전 상태를 나타냄. 따라서, 이전 setIsEdit이 호출되기 전의 값을 가리키며,
    // 이렇게 함으로써 편집을 멈춘 후에 해당 동작을 수행할 수 있다.
    if (isEdit) {
      onPlayerNameChange(symbol, playerName);
    }
  }

  function handleChangePlayerName(event: ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className='player-name'>{playerName}</span>;

  if (isEdit) {
    editablePlayerName = (
      <input
        type='text'
        required
        value={playerName}
        onChange={handleChangePlayerName}
      />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {editablePlayerName}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEdit ? 'Save' : 'Edit'}</button>
    </li>
  );
}
