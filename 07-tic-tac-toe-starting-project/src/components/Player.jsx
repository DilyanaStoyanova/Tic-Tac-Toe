import { useState } from "react";

export default function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing((isEditing) => !isEditing);
    }

    let player = <span className="player-name">{name}</span>;
    let btnCaption = 'Edit';

    if (isEditing) {
        player = <input type="text" required value={name}/>;
        btnCaption = 'Save';
    }

    return (
        <li>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    );
}