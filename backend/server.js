const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let grid = Array(5).fill().map(() => Array(5).fill(null));
let scores = { player1: 0, player2: 0 };

// Basic route to test
app.get('/', (req, res) => {
    res.send('Quantum Squares Game Server');
});

// Route to get the current game state
app.get('/game', (req, res) => {
    res.json({ grid, scores });
});

// Route to update the game state (handle player move)
app.post('/move', (req, res) => {
    const { row, col, player } = req.body;
    // Implement the logic to handle move and collapses here...
    res.json({ grid, scores });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
