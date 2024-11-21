const mainGrid = document.querySelector(".main-grid");
const playAgainButton = document.getElementById("play-again");
const results = document.getElementById("results");
const turnIndicator = document.getElementById("turn-indicator");
const xChoice = document.getElementById("x-choice");
const oChoice = document.getElementById("o-choice");

let board = Array(9).fill(null);
let currentPlayer = "Player one has chose:";
let gameActive = true;

// Initialize the game grid
function initializeGame() {
    mainGrid.innerHTML = "";
    board.fill(null);
    gameActive = true;
    results.textContent = "";
    playAgainButton.classList.remove("visible");

    for (let i = 0; i < 9; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.dataset.index = i;
        box.addEventListener("click", handleBoxClick);
        mainGrid.appendChild(box);
    }

    turnIndicator.textContent = currentPlayer;
}

// Handle box click
function handleBoxClick(e) {
    const index = e.target.dataset.index;

    if (gameActive && !board[index]) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWinner()) {
            endGame(`${currentPlayer} Wins!`);
        } else if (board.every(cell => cell)) {
            endGame("It's a Draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            turnIndicator.textContent = currentPlayer;
        }
    }
}

// Check for winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.querySelectorAll(".box")[a].classList.add("winning-box");
            document.querySelectorAll(".box")[b].classList.add("winning-box");
            document.querySelectorAll(".box")[c].classList.add("winning-box");
            return true;
        }
        return false;
    });
}

// End the game
function endGame(message) {
    gameActive = false;
    results.textContent = message;
    playAgainButton.classList.add("visible");
}

// Reset the game
playAgainButton.addEventListener("click", initializeGame);

// Handle player choice
xChoice.addEventListener("click", () => {
    currentPlayer = "X";
    initializeGame();
});

oChoice.addEventListener("click", () => {
    currentPlayer = "O";
    initializeGame();
});

// Start the game
initializeGame();