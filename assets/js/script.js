// Initialize variables
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let questionsAnswered = 0;
let roundsPlayed = 0;
let timer;

// DOM elements
let gameContainer = document.getElementById("game-container");
let scoreElement = document.getElementById("score");
let winnerMessageElement = document.getElementById("winner-message");

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
    let playLink = document.getElementById("play-link");
    let restartButton = document.getElementById("restart-button");

    if (playLink) {
        playLink.addEventListener("click", toggleInstructionsAndGame);
    }

    if (restartButton) {
        restartButton.addEventListener("click", startGame);
    }
});

// Function to toggle instructions and game display
function toggleInstructionsAndGame() {
    const instructionsList = document.getElementById("instructions-list");
    const instructionsDisplayStyle = window.getComputedStyle(instructionsList).display;

    if (instructionsDisplayStyle === "none") {
        instructionsList.style.display = "block";
        gameContainer.style.display = "none";
    } else {
        instructionsList.style.display = "none";
        gameContainer.style.display = "block";
        startGame();
    }
}

// Function to start the game
function startGame() {
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    questionsAnswered = 0;
    roundsPlayed = 0;
    winnerMessageElement.style.display = "none";
    displayQuestion(0);
}

// Display a question
let submitButton;  // Declare submitButton outside the function

function displayQuestion(questionIndex) {
    let questionContainer = gameContainer;
    let question = questions[questionIndex];
    if (questionsAnswered > 3) {
        endgame();
    } else {
        questionsAnswered++;

        questionContainer.innerHTML = '';

        questionContainer.innerHTML += `
        <h2>Arithmetic Questions</h2>
        <ul>
            <li>
                <p>Question: ${question.question}</p>
            </li>
        </ul>
        <div id="timer">Time Left: 10 seconds</div>
    `;

        // correct/incorrect answers
        const answerElement = document.createElement("div");
        answerElement.id = "answer-feedback";
        questionContainer.appendChild(answerElement);

        const answerInput = document.createElement("input");
        answerInput.type = "text";
        questionContainer.appendChild(answerInput);

        submitButton = document.createElement("button");
        submitButton.textContent = "Submit Answer";
        questionContainer.appendChild(submitButton);

        startTimer();

        submitButton.addEventListener("click", () => {
            const userAnswer = parseInt(answerInput.value);

            if (!isNaN(userAnswer) && userAnswer === question.answer) {
                answerElement.textContent = "Correct!";
                answerElement.classList.add("correct-feedback");
                if (currentPlayer === 1) {
                    player1Score++;
                } else {
                    player2Score++;
                }
            } else {
                answerElement.textContent = "Incorrect!";
                answerElement.classList.add("incorrect-feedback");
            }

            questionsAnswered++;

            if (questionsAnswered < questions.length) {
                setTimeout(() => displayQuestion(questionsAnswered), 2000);
            } else {
                endRound();
            }
        });
    }
}

// Function to end a round
function endRound() {
    roundsPlayed++;
    if (roundsPlayed < 3) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        questionsAnswered = 0;
        setTimeout(() => displayQuestion(0), 2000);
    } else {
        setTimeout(calculateWinner, 2000);
    }
}

// Function to start the timer
function startTimer() {
    clearInterval(timer);
    let timeLeft = 10;

    function updateTimerDisplay() {
        document.getElementById("timer").textContent = `Time Left: ${timeLeft} seconds`;
    }

    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft === 0) {
            clearInterval(timer);
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            questionsAnswered++;

            if (questionsAnswered < questions.length) {
                setTimeout(() => displayQuestion(questionsAnswered), 2000);
            } else {
                setTimeout(calculateWinner, 2000);
            }
        }
    }, 1000);
}

// Function to calculate the winner
function calculateWinner() {
    let winnerMessage = "";

    if (player1Score > player2Score) {
        winnerMessage = "Player 1 wins!";
    } else if (player2Score > player1Score) {
        winnerMessage = "Player 2 wins!";
    } else {
        winnerMessage = "It's a tie!";
    }

    winnerMessageElement.textContent = winnerMessage;
    winnerMessageElement.style.display = "block";

    // Automatically restart the game after a delay
    setTimeout(() => {
        restartGame();
    }, 3000);
}

// Function to start a new question
function startNewQuestion() {
    questionsAnswered = 0;
    updateScoreDisplay();
    displayQuestion(0);
}

// Function to update the score display
function updateScoreDisplay() {
    scoreElement.textContent = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
}

