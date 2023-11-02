const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({onSelectSquare}) {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // const clickSelectSquare = (rowIndex, colIndex) => {
    //     setGameBoard(state => {
    //         const updatedState = [...state].map(innerArray => [...innerArray]);
    //         updatedState[rowIndex][colIndex] = activePlayer;

    //         return updatedState;
    //     });

    //     switchActivePlayer();
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={onSelectSquare}>{playerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    );
}