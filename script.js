
const gridContainer = document.querySelector(".main-grid");
const resultsDisplay = document.getElementById("results");
const playAgainButton = document.getElementById("play-again");
const turnIndicator = document.querySelector(".bg");

let turn = "X";
let isGameOver = false;
let board = Array(9).fill(null); 


function initializeGame() {
    gridContainer.innerHTML = ""; 
    board.fill(null);
    for (let i = 0; i < 9; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.dataset.index = i;
        box.addEventListener("click", handleBoxClick);
        gridContainer.appendChild(box);
    }
    resetTurnIndicator();
}

function handleBoxClick(e) {
    const box = e.target;
    const index = box.dataset.index;

    if (!isGameOver && !board[index]) {
        board[index] = turn;
        box.innerText = turn;
        if (checkWin()) {
            endGame(`${turn} wins!`);
            highlightWinningCombination();
        } else if (checkDraw()) {
            endGame("It's a draw!");
        } else {
            changeTurn();
        }
    }
}


function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    turnIndicator.style.left = turn === "X" ? "0" : "85px";
}


function resetTurnIndicator() {
    turn = "X";
    turnIndicator.style.left = "0";
}


function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true;
            winningCombination = condition;
            return true;
        }
    }
    return false;
}


function highlightWinningCombination() {
    winningCombination.forEach(index => {
        document.querySelectorAll(".box")[index].classList.add("winning-box");
    });
}


function checkDraw() {
    return board.every(cell => cell !== null);
}


function endGame(message) {
    isGameOver = true;
    resultsDisplay.innerText = message;
    playAgainButton.classList.add("visible");
}


function resetGame() {
    isGameOver = false;
    resultsDisplay.innerText = "";
    playAgainButton.classList.remove("visible");
    initializeGame();
}

playAgainButton.addEventListener("click", resetGame);


initializeGame();
