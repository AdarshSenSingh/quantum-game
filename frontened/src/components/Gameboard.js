import React, { useState, useEffect } from 'react';
import Square from './Square';

const GameBoard = () => {
    const [grid, setGrid] = useState(Array(5).fill().map(() => Array(5).fill(null)));
    const [player, setPlayer] = useState('Player1');  // Track the current player
    const [scores, setScores] = useState({ player1: 0, player2: 0 }); // Track scores

    // Fetch initial game state from the backend
    useEffect(() => {
        fetch('http://localhost:5000/game')
            .then(response => response.json())
            .then(data => {
                setGrid(data.grid);
                setScores(data.scores);
            })
            .catch(error => console.error('Error fetching game state:', error));
    }, []);

    // Handle the player's move and send data to the backend
    const handleClick = (row, col) => {
        // Check if the square is empty or partially filled
        if (grid[row][col] === null || grid[row][col].owner === player) {
            const updatedGrid = [...grid];
            if (updatedGrid[row][col] === null) {
                updatedGrid[row][col] = { particles: 1, owner: player };
            } else {
                updatedGrid[row][col].particles += 1;
            }

            // Update local grid state immediately for smoother UX
            setGrid(updatedGrid);

            // Send the updated move to the backend
            fetch('http://localhost:5000/move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    row,
                    col,
                    player,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setGrid(data.grid);  // Update the grid based on backend logic
                    setScores(data.scores);  // Update the scores
                    togglePlayer();  // Switch to the other player
                })
                .catch(error => console.error('Error handling move:', error));
        }
    };

    // Toggle between players
    const togglePlayer = () => {
        setPlayer(prevPlayer => (prevPlayer === 'Player1' ? 'Player2' : 'Player1'));
    };

    return (
        <div className="game-board">
            <h2>{player}'s Turn</h2>
            <h3>Scores: Player1 - {scores.player1} | Player2 - {scores.player2}</h3>
            {grid.map((row, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {row.map((value, colIndex) => (
                        <Square
                            key={colIndex}
                            value={value}
                            onClick={() => handleClick(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
