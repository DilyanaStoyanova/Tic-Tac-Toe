import { useState } from "react";

export default function Player({ initialName, symbol }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(isEditing => !isEditing);
    };

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    };

    let player = <span className="player-name">{playerName}</span>;
    let tabCaption = 'Edit';

    if (isEditing) {
        player = <input type="text" required value={playerName} onChange={handleChange} />
        tabCaption = 'Save';
    }

    return (
        <li>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{tabCaption}</button>
        </li>
    );
}