// Define your questions and initialize game state
let questions = [
    { category: 'Arithematic', points: 300, question: '8 multiplied by 6', answer: 42 },
    { category: "Arithmetic", points: 300, question: "2 + 3", answer: 5 },

];

let currentPlayer = 1; // You can keep this variable for tracking the current player
let player1Score = 0; // Use player-specific variables
let player2Score = 0;
let timer;
let timeLeft = 10; // 10 seconds per question

// Function to display the game board
function displayGameBoard() {
    // Add code to create and display category buttons and point values
    // Add event listeners to handle question selection
}

// Function to display a question
function displayQuestion(questionObj) {
    // Add code to display the question and answer choices
}

// Function to generate a random incorrect answer
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

// Function to check the answer
function checkAnswer(correctAnswer, points) {
    const selectedOption = parseInt(event.target.textContent.split(":")[1].trim());
    if (selectedOption === correctAnswer) {
        // Correct answer
        if (currentPlayer === 1) {
            player1Score += points; // Update player-specific score
        } else {
            player2Score += points;
        }
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // Update the score display
    document.getElementById("score").innerHTML = `Player 1: ${player1Score} points<br>Player 2: ${player2Score} points`;

    // Start the timer for the next question
    startTimer();
}

// Function to update score display
function updateScoreDisplay() {
    // Add code to update the score display
}

// Initialize the game
displayGameBoard();
