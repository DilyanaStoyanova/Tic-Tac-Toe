import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver";

const PLAYERS = {
	'X': 'Player 1',
	'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

function deriveCurrentPlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}

	return currentPlayer;
}

function deriveGameBoard(gameTurns) {

	let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}

	return gameBoard;
}

function hasWinner(gameBoard, players) {
	let winner = null;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

		if(firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol) {
				winner = players[firstSquareSymbol];
			}
	}

	return winner;
}

function App() {
	const[players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);

	let currentPlayer = deriveCurrentPlayer(gameTurns);
	const gameBoard = deriveGameBoard(gameTurns);
	const winner = hasWinner(gameBoard, players);
	const hasDraw  = gameTurns.length === 9 && !winner;

	const handleSelectSquare = (rowIndex, colIndex) => {
		setGameTurns(prevGameTurns => {
			const currentPlayer = deriveCurrentPlayer(prevGameTurns);

			const updatedGameTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevGameTurns];

			return updatedGameTurns;
		});
	};

	const handleChangeName = (symbol, newName) => {
		setPlayers(prevPlayers => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	};

	const handleRematch = () => {
		setGameTurns([]);
	};

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player name={players.X} symbol="X" isActive={currentPlayer === 'X'} onChange={handleChangeName} />
					<Player name={players.O} symbol="O" isActive={currentPlayer === 'O'} onChange={handleChangeName} />
				</ol>
				<GameBoard board={gameBoard} onSelect={handleSelectSquare} />
				{(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
			</div>
			<Log turns={gameTurns}/>
		</main>
	);
}

export default App;