// Questions and answers
const questions = [
    { question: "What is 9 multiplied by 7?", answer: 63 },
    { question: "Calculate 12 divided by 4.", answer: 3 },
    { question: "What is 15 plus 18?", answer: 33 },
    { question: "Subtract 42 from 60.", answer: 18 },
];

// Initialize variables
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let questionsAnswered = 0;
let timer;

// Function to display a question
function displayQuestion(questionIndex) {
    const questionContainer = document.getElementById("game-container");
    const question = questions[questionIndex];

    questionContainer.innerHTML = `
        <h2>Arithmetic Questions</h2>
        <ul>
            <li>
                <p>Question: ${question.question}</p>
            </li>
        </ul>
    `;

    startTimer();

    // Handle correct/incorrect answers
    const answerElement = document.createElement("div");
    answerElement.id = "answer-feedback";
    questionContainer.appendChild(answerElement);
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    questionContainer.appendChild(answerInput);
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Answer";
    questionContainer.appendChild(submitButton);

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
            setTimeout(calculateWinner, 2000);
        }
    });
}

// Function to start the timer
function startTimer() {
    clearInterval(timer);
    let timeLeft = 10;
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

// Function to update the timer display
function updateTimerDisplay() {
    document.getElementById("timer").textContent = `Time Left: ${timeLeft} seconds`;
}

// Function to calculate the winner
function calculateWinner() {
    let winnerMessage;
    if (player1Score > player2Score) {
        winnerMessage = "Player 1 wins!";
    } else if (player2Score > player1Score) {
        winnerMessage = "Player 2 wins!";
    } else {
        winnerMessage = "It's a tie!";
    }
    document.getElementById("winner-message").textContent = winnerMessage;
    document.getElementById("player1-score").textContent = `Player 1: ${player1Score} points`;
    document.getElementById("player2-score").textContent = `Player 2: ${player2Score} points`;
    document.getElementById("winner-container").style.display = "block";
}

// Start the game by displaying the first question
displayQuestion(0);

// Restart button event listener
document.getElementById("restart-button").addEventListener("click", () => {
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    questionsAnswered = 0;
    displayQuestion(0);
});
