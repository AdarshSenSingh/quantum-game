import React, { useEffect, useState } from 'react';
import GameBoard from './components/Gameboard';

function App() {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/game')
            .then(response => response.json())
            .then(data => setGrid(data.grid));
    }, []);

    return (
        <div className="App">
            <h1>Quantum Squares Game</h1>
            <GameBoard grid={grid} />
        </div>
    );
}

export default App;
