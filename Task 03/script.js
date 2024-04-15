const X_CLASS = 'x';
const O_CLASS = 'o';
let currentPlayerClass = X_CLASS;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

startGame();

function startGame() {
    currentPlayerClass = X_CLASS;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    status.innerText = `${currentPlayerClass.toUpperCase()}'s turn`;
    restartButton.addEventListener('click', startGame, { once: true });
    gameOver = false;
    if (currentPlayerClass === O_CLASS) {
        setTimeout(makeAIMove, 500);
    }
}

function handleClick(event) {
    if (gameOver) return;
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-cell-index'));
    if (gameBoard[index] !== '') return;
    placeMark(cell, currentPlayerClass);
    gameBoard[index] = currentPlayerClass;
    if (checkWin(currentPlayerClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
        setBoardHoverClass();
        status.innerText = `${currentPlayerClass.toUpperCase()}'s turn`;
        if (currentPlayerClass === O_CLASS) {
            setTimeout(makeAIMove, 500);
        }
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(currentPlayerClass);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentClass;
        });
    });
}

function isDraw() {
    return gameBoard.every(cell => {
        return cell !== '';
    });
}

function endGame(draw) {
    gameOver = true;
    if (draw) {
        status.innerText = 'Draw!';
    } else {
        status.innerText = `${currentPlayerClass.toUpperCase()} Wins!`;
    }
    restartButton.removeEventListener('click', startGame);
}

function makeAIMove() {
    if (gameOver) return;
    let availableCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === '') availableCells.push(index);
    });
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cellIndex = availableCells[randomIndex];
    const cell = cells[cellIndex];
    placeMark(cell, O_CLASS);
    gameBoard[cellIndex] = O_CLASS;
    if (checkWin(O_CLASS)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayerClass = X_CLASS;
        setBoardHoverClass();
        status.innerText = `${currentPlayerClass.toUpperCase()}'s turn`;
    }
}

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
