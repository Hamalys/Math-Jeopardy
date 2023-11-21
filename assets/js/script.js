
// Initialize variables
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let questionsAnswered = 0;
let roundsPlayed = 0;
let timer;

//questions and answers;
let questions = [
    { question: "What is 9 multiplied by 7?", answer: 63 },
    { question: "Calculate 12 divided by 4.", answer: 3 },
    { question: "What is 12 plus 13?", answer: 25 },
    { question: "Subtract 23 from 30.", answer: 7 },
    { question: "What is 5 multiplied by 7?", answer: 35 },
    { question: "Calculate 60 divided by 10.", answer: 6 },
    { question: "What is 17 plus 13?", answer: 30 },
    { question: "Subtract 40 from 50.", answer: 10 },
    { question: "What is 8 multiplied by 7?", answer: 56 },
    { question: "Calculate 84 divided by 12.", answer: 7 },
    { question: "What is 13 plus 34?", answer: 47 },
    { question: "Subtract 42 from 65.", answer: 23 },
    { question: "What is 12 multiplied by 5?", answer: 60 },
    { question: "Calculate 81 divided by 9.", answer: 9 },
    { question: "What is 1 plus 4?", answer: 5 },
    { question: "Subtract 12 from 33.", answer: 21 },
];

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
let submitButton;
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

    if (questions.length > 0) {
        displayRandomQuestion();
    } else {
        console.error("No questions available. Please add questions to the 'questions' array.");
    }
}

function displayRandomQuestion() {
    // Randomly select a question
    const randomIndex = Math.floor(Math.random() * questions.length);
    displayQuestion(randomIndex);
}

// Initialize arrays to track correct and incorrect answers for each player
let player1CorrectAnswers = [];
let player1IncorrectAnswers = [];
let player2CorrectAnswers = [];
let player2IncorrectAnswers = [];

function displayQuestion(questionIndex) {{
    let inputChanged = false;
    let questionContainer = gameContainer;
    let question = questions[questionIndex];

    // Display the question

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

    // Display the scores and answered questions for each player
    const scoreDisplay = document.createElement("p");
    if (roundsPlayed === 3) {
    
        player1Score += question.answer1 - question.answer2;
        player2Score += question.answer2 - question.answer1;
        scoreDisplay.textContent = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
        winnerMessageElement.textContent = "Player " + currentPlayer + " wins! Congratulations on Your Victory!";

        player1Score = 0;
        player2Score = 0;
        roundsPlayed = 0;

        setTimeout(() => {
            updateScoreDisplay();
            setTimeout(() => {
                startGame();
            }, 3000);
        }, 2000);

    } else {
    
        scoreDisplay.textContent = `Player 1: Correct (${player1CorrectAnswers.length}), Incorrect (${player1IncorrectAnswers.length})`;
        player2AnswersDisplay.textContent = `Player 2: Correct (${player2CorrectAnswers.length}), Incorrect (${player2IncorrectAnswers.length})`;

    }
}





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

    answerInput.disabled = false;
    submitButton.disabled = false;

    answerInput.addEventListener("input", () => {
        inputChanged = true;
    });

    answerInput.addEventListener("change", () => {
        if (inputChanged) {
            const userAnswer = parseInt(answerInput.value);

            if (!isNaN(userAnswer) && userAnswer === question.answer) {
                answerElement.textContent = "Correct!";
                answerElement.classList.add("correct-feedback");
                if (currentPlayer === 1) {
                    player1Score++;
                    player1CorrectAnswers.push(questionIndex);
                } else {
                    player2Score++;
                    player2CorrectAnswers.push(questionIndex);
                }
            } else {
                answerElement.textContent = "Incorrect!";
                answerElement.classList.add("incorrect-feedback");
                if (currentPlayer === 1) {
                    player1IncorrectAnswers.push(questionIndex);
                } else {
                    player2IncorrectAnswers.push(questionIndex);
                }
            }

            questionsAnswered++;

            if (questionsAnswered < questions.length) {
                answerInput.disabled = true;
                submitButton.disabled = true;

                setTimeout(() => {
                    answerInput.disabled = false;
                    submitButton.disabled = false;
                    answerInput.value = '';
                    answerInput.focus();
                }, 2000);

                setTimeout(displayRandomQuestion, 2000);
            } else {
                endRound();
            }
        }

        inputChanged = false;
    });

    answerInput.focus();

    // Automatically submit the answer after the user finishes typing
    answerInput.addEventListener("blur", () => {
        if (inputChanged) {
            submitButton.click();
        }
    });

    submitButton.style.display = "block";
}

// Function to end a round
function endRound() {
    roundsPlayed++;
    if (roundsPlayed < 3) {
        if (player1Score + player2Score < 4) {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            questionsAnswered = 0;
            setTimeout(displayRandomQuestion, 2000);
        } else {
            clearInterval(timer);  
            setTimeout(calculateWinner, 2000);
        }
    } else {
        clearInterval(timer);  
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

function calculateWinner() {
    let winnerMessage = "";

    if (player1Score > player2Score) {
        winnerMessage = "Player 1 wins! Congratulations on Your Victory!";
    } else if (player2Score > player1Score) {
        winnerMessage = "Player 2 wins! Congratulations on Your Victory!";
    } else {
        winnerMessage = "It's a tie!";
    }

    // Display the winner message
    winnerMessageElement.textContent = winnerMessage;
    winnerMessageElement.style.display = "block";

    // Reset scores and rounds for a new game
    player1Score = 0;
    player2Score = 0;
    roundsPlayed = 0;

    setTimeout(() => {
        updateScoreDisplay();
        setTimeout(() => {
            startGame(); 
        }, 3000);
    }, 2000);
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



