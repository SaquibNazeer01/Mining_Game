let coins = 100; // Starting coins
const betAmountInput = document.getElementById("betAmount");
const coinsDisplay = document.getElementById("coinsDisplay");
const gameBoard = document.getElementById("gameBoard");
const startGameButton = document.getElementById("startGame");
const withdrawButton = document.getElementById("withdraw");

let clickedSafeBoxes = 0; // Tracks safe boxes clicked
let gameOver = false; // Prevent further actions after bomb
let currentBet = 0; // Store the current bet amount
let safeBoxReward = 0; // Tracks accumulated reward for safe boxes

// Update coins display
function updateCoinsDisplay() {
    coinsDisplay.textContent = `Coins: ${coins}`;
}

// Start Game functionality
startGameButton.addEventListener("click", () => {
    const bet = parseInt(betAmountInput.value, 10);

    if (isNaN(bet) || bet <= 0) {
        alert("Please enter a valid bet!");
        return;
    }

    if (bet > coins) {
        alert("Not enough coins!");
        return;
    }

    coins -= bet; // Deduct bet from coins
    currentBet = bet; // Store the current bet
    updateCoinsDisplay(); // Update the display

    // Reset game state
    gameBoard.innerHTML = ""; // Clear previous boxes
    clickedSafeBoxes = 0; // Reset safe box count
    safeBoxReward = 0; // Reset safe box reward
    gameOver = false; // Reset game state
    withdrawButton.disabled = false; // Enable Withdraw button

    const gridSize = 25; // Total number of boxes (5x5)
    const bombIndex = Math.floor(Math.random() * gridSize); // Random bomb position

    for (let i = 0; i < gridSize; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.textContent = ""; // Optional: Add box number `i + 1`

        // Click event for each box
        box.addEventListener("click", () => {
            if (gameOver || box.classList.contains("disabled")) {
                return; // Prevent further clicks after game over
            }

            if (i === bombIndex) {
                box.classList.add("bomb");
                box.textContent = "💣";
                alert("Boom! You hit the bomb! You lose your bet!");
                gameOver = true; // End the game
                withdrawButton.disabled = true; // Disable Withdraw button
                gameBoard.querySelectorAll(".box").forEach((b) => b.classList.add("disabled")); // Disable all boxes
            } else {
                box.classList.add("safe");
                box.textContent = "✓";
                clickedSafeBoxes++;
                safeBoxReward += currentBet * 2; // Accumulate reward for safe box
                box.classList.add("disabled"); // Disable further clicks on this box
            }
        });

        gameBoard.appendChild(box); // Add the box to the game board
    }
});

// Withdraw functionality
withdrawButton.addEventListener("click", () => {
    if (gameOver) {
        alert("Game is over! Start a new game.");
        return;
    }

    coins += safeBoxReward; // Add accumulated reward to total coins
    alert(`You withdrew ${safeBoxReward} coins!`);
    updateCoinsDisplay();
    withdrawButton.disabled = true; // Disable Withdraw button after withdrawal
    gameOver = true; // End the game
    gameBoard.querySelectorAll(".box").forEach((b) => b.classList.add("disabled")); // Disable all boxes
});
