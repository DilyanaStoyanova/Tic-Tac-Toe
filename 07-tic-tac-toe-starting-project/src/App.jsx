import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";

import { useState } from "react";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
	'X': 'Player 1',
	'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

function deriveActivePlayer(gameTurns) {
	let activePlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		activePlayer = 'O';
	}

	return activePlayer;
}

function deriveGameBoard(gameTurns) {
	let gameBoard = [...INITIAL_GAME_BOARD.map(innerArr => [...innerArr])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	return gameBoard;
}

function deriveWinner(gameBoard) {

	let winner = null;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

		if (firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = firstSquareSymbol;
		}
	}

	return winner;
}

function App() {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);

	const gameBoard = deriveGameBoard(gameTurns);
	const activePlayer = deriveActivePlayer(gameTurns);
	const winner = players[deriveWinner(gameBoard)];
	const hasDraw = gameTurns.length === 9 && !winner;

	const handleSelectSquare = (rowIndex, colIndex) => {

		setGameTurns(prevGameTurns => {
			let activePlayer = deriveActivePlayer(prevGameTurns);

			const updatedGameTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: activePlayer },
				...prevGameTurns
			];

			return updatedGameTurns;
		});
	};

	const handleChangeName = (symbol, newName) => {
		setPlayers(prevPlayers => {
			return {
				...prevPlayers,
				[symbol]: newName
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
					<Player name={players.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handleChangeName} />
					<Player name={players.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handleChangeName} />
				</ol>
				<GameBoard board={gameBoard} onSelect={handleSelectSquare} />
				{(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;