import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleClick = () => {
        setIsEditing(isEditing => !isEditing);
        
        if(isEditing) {
            onChangeName(symbol, playerName);
        }
    };

    let tabCaption = 'Edit';
    let player = <span className="player-name">{playerName}</span>

    if (isEditing) {
        tabCaption = 'Save';
        player = <input type="text" value={playerName} onChange={handleChange} />
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{tabCaption}</button>
        </li>
    );
}