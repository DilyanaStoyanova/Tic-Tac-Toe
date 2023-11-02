import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({handleSelectSquare, activePlayerSymbol}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    const clickSelectSquare = (rowIndex, colIndex) => {
        setGameBoard(state => {
            const updatedState = [...state].map(innerArray => [...innerArray]);
            updatedState[rowIndex][colIndex] = activePlayerSymbol;

            return updatedState;
        });

        handleSelectSquare();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => clickSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    );
}