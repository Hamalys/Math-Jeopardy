// Define  questions and initialize game state
let questions = [
    { category: 'Arithmetic', points: 100, question: 'What is 8 multiplied by 6?', answer: 48 },
    { category: 'Arithmetic', points: 200, question: 'What is the result of 5 + 7?', answer: 12 },
    { category: 'Arithmetic', points: 250, question: 'What is 10 divided by 2?', answer: 5 },
    { category: 'Arithmetic', points: 300, question: 'What is 20 minus 7?', answer: 13 },
];

let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let timer;
let timeLeft = 10; // 10 seconds per question

// Display the game board
function displayGameBoard() {
    let gameBoard = document.getElementById("game-board");
    // Clear any existing content inside the game board
    gameBoard.innerHTML = "";
    // Loop through your questions to create category buttons and point values
    questions.forEach((questionObj) => {
        // Create a category button for each category
        let categoryButton = document.createElement("button");
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
            pointValueButton.dataset.points = i === 0 ? questionObj.points : questionObj.points - i * 50;
            pointValueButton.addEventListener("click", () => {

                function displayQuestion(questionObj) {
                    // Display the question
                    document.getElementById("question1").textContent = `Question: ${questionObj.question}`;
                    // Display answer choices (assuming you have buttons for answer choices)
                    const answerChoices = document.getElementById("answer-choices1");
                    const buttons = answerChoices.getElementsByTagName("button");
                    // Assuming you have four answer choices
                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i].textContent = `Option ${i + 1}: ${getRandomNumber()}`;
                    }}
        
                displayQuestion(questionObj);
            });
            gameBoard.appendChild(categoryButton);
            gameBoard.appendChild(pointValueButton);
        }
    });
}

// Function to display a question
function displayQuestion(questionObj) {
    // Display the question and answer choices
    document.getElementById("question1").textContent = `Question: ${questionObj.question}`;
    let answerChoices = document.getElementById("answer-choices1");
    let buttons = answerChoices.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = `Option ${i + 1}: ${getRandomNumber()}`;
        buttons[i].dataset.answer = buttons[i].textContent.split(":")[1].trim();
        buttons[i].addEventListener("click", () => {
            checkAnswer(questionObj.answer);
        });
    }

    // Remove the selected point value button
    document.querySelector(`button[data-points="${questionObj.points}"]`).remove();
}

// Function to generate a random incorrect answer
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

// Function to check the answer
function checkAnswer(correctAnswer) {
    let selectedOption = parseInt(event.target.dataset.answer);
    if (selectedOption === correctAnswer) {
        // Correct answer
        if (currentPlayer === 1) {
            player1Score += parseInt(event.target.parentNode.parentNode.dataset.points); // Update player-specific score
        } else {
            player2Score += parseInt(event.target.parentNode.parentNode.dataset.points);
        }
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // Update the score display
    document.getElementById("score").innerHTML = `Player 1: ${player1Score} points<br>Player 2: ${player2Score} points`;

    // Start the timer for the next question
    startTimer();
}

// To start the timer
function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            clearInterval(timer);
            // Handle time's up logic here
        }
    }, 1000);
}

// Function to update timer display
function updateTimerDisplay() {
    document.getElementById("timer").textContent = `Time Left: ${timeLeft} seconds`;
}

// Initialize the game
displayGameBoard();
