const gridElement = document.getElementById('grid');  
const player1PointsElement = document.getElementById('player1Points');  
const player2PointsElement = document.getElementById('player2Points');  
const currentTurnElement = document.getElementById('currentTurn');  

let grid = Array.from({ length: 5 }, () => Array(5).fill(0));  
let currentPlayer = 1; // 1 for Player 1 (Red), 2 for Player 2 (Blue)  
let player1Points = 0;  
let player2Points = 0;  

function createGrid() {  
    gridElement.innerHTML = '';  
    for (let i = 0; i < 5; i++) {  
        for (let j = 0; j < 5; j++) {  
            const square = document.createElement('div');  
            square.classList.add('square');  
            square.dataset.row = i;  
            square.dataset.col = j;  
            square.textContent = grid[i][j];  
            square.addEventListener('click', handleSquareClick);  
            gridElement.appendChild(square);  
        }  
    }  
}  

function handleSquareClick(event) {  
    const square = event.target;  
    const row = square.dataset.row;  
    const col = square.dataset.col;  

    if (grid[row][col] < 4) {  
        grid[row][col]++;  
        square.textContent = grid[row][col];  
        square.classList.add(currentPlayer === 1 ? 'red' : 'blue');  

        if (grid[row][col] === 4) {  
            if (currentPlayer === 1) {  
                player1Points++;  
                player1PointsElement.textContent = player1Points;  
            } else {  
                player2Points++;  
                player2PointsElement.textContent = player2Points;  
            }  
            square.classList.remove(currentPlayer === 1 ? 'red' : 'blue');  
            square.textContent = 0;  
            grid[row][col] = 0;  
            redistributeParticles(row, col);  
        }  

        currentPlayer = currentPlayer === 1 ? 2 : 1;  
        currentTurnElement.textContent = `Player ${currentPlayer}`;  
    }  
}  

function redistributeParticles(row, col) {  
    const directions = [  
        { r: -1, c: 0 }, // up  
        { r: 1, c: 0 },  // down  
        { r: 0, c: -1 }, // left  
        { r: 0, c: 1 }   // right  
    ];  

    directions.forEach(({ r, c }) => {  
        const newRow = parseInt(row) + r;  
        const newCol = parseInt(col) + c;  
        if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {  
            grid[newRow][newCol]++;  
            const adjacentSquare = gridElement.children[newRow * 5 + newCol];  
            adjacentSquare.textContent = grid[newRow][newCol];  
            adjacentSquare.classList.add(currentPlayer === 1 ? 'red' : 'blue');  

            if (grid[newRow][newCol] === 4) {  
                if (currentPlayer === 1) {  
                    player1Points++;  
                    player1PointsElement.textContent = player1Points;  
                } else {  
                    player2Points++;  
                    player2PointsElement.textContent = player2Points;  
                }  
                adjacentSquare.classList.remove(currentPlayer === 1 ? 'red' : 'blue');  
                adjacentSquare.textContent = 0;  
                grid[newRow][newCol] = 0;  
                redistributeParticles(newRow, newCol);  
            }  
        }  
    });  
}  

createGrid();