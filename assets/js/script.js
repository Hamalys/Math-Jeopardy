// Define your questions and initialize game state
let questions = [
    { category: 'Arithematic', points: 300, question: '8 multiplied by 6', answer: 42 },
    { category: "Arithmetic", points: 300, question: "2 + 3", answer: 5 },

];

let currentPlayer = 1; 
let player1Score = 0; 
let player2Score = 0;
let timer;
let timeLeft = 10; // 10 seconds per question

// Function to display the game board


function displayGameBoard() {
    let gameBoard = document.getElementById("game-board");
    // Clear any existing content inside the game board
    gameBoard.innerHTML = "";
    // Loop through your questions to create category buttons and point values
    questions.forEach((questionObj) => {
        // Create a category button for each category
        const categoryButton = document.createElement("button");
        categoryButton.textContent = questionObj.category;
        categoryButton.addEventListener("click", () => {
            // Handle category button click
            // You can implement logic to display questions for this category here
            // Call the displayQuestion function with the appropriate questionObj
            displayQuestion(questionObj);
        });

        // Create point value buttons for each category
        for (let i = 0; i < 4; i++) {
            let pointValueButton = document.createElement("button");
            pointValueButton.textContent = `${i === 0 ? questionObj.points : questionObj.points - i * 50}`;
            pointValueButton.addEventListener("click", () => {
                // Handle point value button click
                // You can implement logic to display the question for this point value here
                // Call the displayQuestion function with the appropriate questionObj
                displayQuestion(questionObj);
            });
            gameBoard.appendChild(categoryButton);
            gameBoard.appendChild(pointValueButton);
        }
    });
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
