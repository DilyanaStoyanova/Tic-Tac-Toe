import { useState } from 'react';

import Player from './components/Player';
import GameBoard from "./components/GameBoard";
import Log from './components/Log';
import {WINNING_COMBINATIONS } from "./winning-combinations.js";
 
function deriveActivePlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}

	return currentPlayer;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);

	let activePlayer = deriveActivePlayer(gameTurns);

	const handleSelectSquare = (rowIndex, colIndex) => {
		setGameTurns(prevGameTurns => {
			let currentPlayer = deriveActivePlayer(prevGameTurns);

			const updatedGameTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns];


			return updatedGameTurns;
		});
	};

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
					<Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
				</ol>
				<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;