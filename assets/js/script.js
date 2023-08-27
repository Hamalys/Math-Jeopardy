// Calculate and display the winner and loser
let winnerMessage;
if (player1Score > player2Score) {
    winnerMessage = "Player 1 wins!";
} else if (player2Score > player1Score) {
    winnerMessage = "Player 2 wins!";
} else {
    winnerMessage = "It's a tie!";
}

document.getElementById("game-board").innerHTML = `<h1>Game Over!</h1><p>${winnerMessage}</p>`;
document.getElementById("current-player").textContent = "";

// Optionally, you can display the final scores for both players on the end game screen.
document.getElementById("player1-score").textContent = `Player 1: ${player1Score} points`;
document.getElementById("player2-score").textContent = `Player 2: ${player2Score} points`;

// Show the winner container
document.getElementById("winner-container").style.display = "block";
// Add an event listener for the "Restart Game" button
document.getElementById("restart-button").addEventListener("click", () => {
    // Reset game variables and scores
    currentPlayer = 1;
    player1Score = 0;
    player2Score = 0;
    questionsAnswered = 0;

    // Hide the winner container
    document.getElementById("winner-container").style.display = "none";
    displayGameBoard();
});
document.getElementById("correct-sound").play();
document.getElementById("incorrect-sound").play();


// Function to start the timer
function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            clearInterval(timer);
            // Handle time's up logic here (deduct points or skip to the next player's turn)
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            questionsAnswered++;
            displayGameBoard();
        }
    }, 1000);
}

answerElement.classList.add("correct-feedback");
answerElement.textContent = "Correct!";
answerElement.classList.add("incorrect-feedback");
answerElement.textContent = "Incorrect!";


// Function to update timer display
function updateTimerDisplay() {
    document.getElementById("timer").textContent = `Time Left: ${timeLeft} seconds`;
}

// Initialize the game
displayGameBoard();


