import { useState } from "react";

export default function Player({ name, symbol, isActive, onChange }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(isEditing => !isEditing);

        if (isEditing) {
            onChange(symbol, playerName);
        }
    };

    const handleChangeInput = (event) => {
        setPlayerName(event.target.value);
    };

    let tabCaption = 'Edit';
    let player = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        tabCaption = 'Save';
        player = <input type="text" required value={playerName} onChange={handleChangeInput} />
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{tabCaption}</button>
        </li>
    );
}