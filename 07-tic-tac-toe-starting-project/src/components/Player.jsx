import { useState } from "react";

export default function Player({name, symbol}) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleClick = () => {
        setIsEditing((isEditing) => !isEditing);
    };

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    };

    let tabCaption = 'Edit';
    let player = <span className="player-name">{playerName}</span>

    if(isEditing) {
        tabCaption = 'Save';
        player = <input type="text" value={playerName} onChange={handleChange} />
    }

    return (
       <li>
         <span className="player">
            {player}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{tabCaption}</button>
       </li>
    );
}