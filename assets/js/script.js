
        
                                    let questions = [
                                    {category: "Arithmetic", points: 100, question: "2 + 3", answer: 5 },
                                    ];

                                    // Initialize game state
                                    let currentPlayer = 0;
                                    let currentQuestion = null;
                                    let score = [0, 0];

                                    // Function to display the game board
                                    function displayGameBoard() {
                                        let gameBoard = document.getElementById("game-board");

            // Create and display category buttons and point values
            // Add event listeners to handle question selection
        }

                                    // Function to display a question
                                    function displayQuestion(questionObj) {
            const questionDiv = document.getElementById("question");

                                    // Display the question
                                    questionDiv.textContent = `Question: ${questionObj.question}`;

                                    // Clear previous answer choices
                                    const answerChoicesDiv = document.getElementById("answer-choices");
                                    answerChoicesDiv.innerHTML = "";

                                    // Create answer choice buttons
                                    for (let i = 0; i < 4; i++) {
                const answerButton = document.createElement("button");
                                    answerButton.textContent = `Option ${i + 1}: ${i === 0 ? questionObj.answer : getRandomNumber()}`;
                answerButton.addEventListener("click", () => {
                                        // Handle answer selection to check the answer
                                        checkAnswer(i === 0, questionObj.points);
                });
                                    answerChoicesDiv.appendChild(answerButton);
            }
        }

                                    // Function to generate a random incorrect answer
                                    function getRandomNumber() {
            return Math.floor(Math.random() * 10) + 1;
        }

                                    // Function to check the answer
                                    function checkAnswer(isCorrect, points) {
            if (isCorrect) {
                                        score[currentPlayer] += points;
            } else {
                                        score[currentPlayer] -= points;
            }
                                    updateScoreDisplay();
            // Move to the next player (You need to implement player switching logic)
            // Clear currentQuestion and displayGameBoard
        }

                                    // Function to update score display
                                    function updateScoreDisplay() {
            const scoreDiv = document.getElementById("score");
                                    scoreDiv.textContent = `Player 1: ${score[0]} points\nPlayer 2: ${score[1]} points`;
        }

                                    // Initialize the game
                                    displayGameBoard();
                                
