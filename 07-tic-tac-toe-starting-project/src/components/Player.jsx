import { useState } from "react";

export default function Player({ name, symbol, isActive, onNameChange }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    let tabCaption = 'Edit';
    let player = <span className="player-name">{playerName}</span>;

    const handleEditClick = () => {
        setIsEditing(isEditing => !isEditing);

        if (isEditing) {
            onNameChange(symbol, playerName);
        }
    };

    const handleInputChange = (event) => {
        setPlayerName(event.target.value);
    };

    if (isEditing) {
        tabCaption = 'Save';
        player = <input type="text" value={playerName} onChange={handleInputChange} />
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