// Define your questions and answers
const questions = [
    { category: "Arithmetic", points: 100, question: "2 + 3", answer: 5 },
    // Add more questions here
];

// Initialize game state
let currentPlayer = 0;
let currentQuestion = null;
let score = [0, 0]; // Player scores

// Function to display the game board
function displayGameBoard() {
    const gameBoard = document.getElementById("game-board");

    // Create and display category buttons and point values
    // Add event listeners to handle question selection
}

// Function to display a question
function displayQuestion(questionObj) {
    const questionDiv = document.getElementById("question");

    // Display question and answer choices
    // Add event listener to check the answer when selected
}

// Function to start the timer
function startTimer() {
    const timerDiv = document.getElementById("timer");
    // Implement the countdown logic
}

// Function to check the answer
function checkAnswer(playerAnswer) {
    if (playerAnswer === currentQuestion.answer) {
        score[currentPlayer] += currentQuestion.points;
    } else {
        score[currentPlayer] -= currentQuestion.points;
    }
    // Update score display
    // Move to the next player
    // Clear currentQuestion and displayGameBoard
}

// Function to update score display
function updateScoreDisplay() {
    const scoreDiv = document.getElementById("score");
    // Update score display for both players
}

// Initialize the game
displayGameBoard();
