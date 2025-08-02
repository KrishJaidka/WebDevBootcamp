import WINNING_COMBINATIONS from './winningCombinations.js';

let currentPlayer = 1;
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let gameActive = true;
let gameResults = [];

const gameBox = document.getElementById("game-box");
const gameStatus = document.getElementById("game-status");
const resetGameBtn = document.getElementById("reset-game");

function initGame() {
    gameBox.innerHTML = '';
    gameBoard.forEach((row, i) => {
        row.forEach((col, j) => {
            const boxElement = document.createElement('div');
            boxElement.className = 'box';
            boxElement.dataset.row = i;
            boxElement.dataset.col = j;
            boxElement.addEventListener('click', handleCellClick);
            gameBox.appendChild(boxElement);
        });
    });
}

function handleCellClick(event) {
    if (!gameActive) return;
    
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    
    if (gameBoard[row][col] !== '') return;
    
    const symbol = currentPlayer === 1 ? 'X' : 'O';
    gameBoard[row][col] = symbol;
    event.target.textContent = symbol;
    event.target.classList.add('disabled');
    
    if (checkWin()) {
        const result = `Player ${currentPlayer} wins!`;
        gameStatus.textContent = result;
        gameResults.push(result);
        gameActive = false;
        disableAllCells();
        return;
    }
    
    if (checkTie()) {
        const result = "It's a Tie!";
        gameStatus.textContent = result;
        gameResults.push(result);
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
    const playerSymbol = currentPlayer === 1 ? 'X' : 'O';
    
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(([row, col]) => {
            return gameBoard[row][col] === playerSymbol;
        });
    });
}

function checkTie() {
    return gameBoard.every(row => {
        return row.every(cell => cell !== '');
    });
}

function disableAllCells() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.classList.add('disabled'));
}

function resetGame() {
    currentPlayer = 1;
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    gameActive = true;
    gameStatus.textContent = "Player 1's Turn";
    
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('disabled');
    });
}

resetGameBtn.addEventListener('click', resetGame);
initGame();