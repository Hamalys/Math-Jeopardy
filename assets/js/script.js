function displayQuestion(questionObj) {
    let questionDiv = document.getElementById("question");

    // Display the question
    questionDiv.textContent = `Question: ${questionObj.question}`;

    // Create answer choices (you can customize this part)
    const answers = [questionObj.answer];
    for (let i = 1; i <= 3; i++) {
        // Generate some random incorrect answers
        answers.push(questionObj.answer + Math.floor(Math.random() * 5) + 1);
    }

    // Shuffle the answers to randomize their order
    answers.sort(() => Math.random() - 0.5);

    // Display answer choices (you can customize this part)
    answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = `Option ${index + 1}: ${answer}`;
        answerButton.addEventListener("click", () => {
            // Handle answer selection to check the answer
            checkAnswer(answer, questionObj.points);
        });
        questionDiv.appendChild(answerButton);
    });

    // Start the timer
    startTimer();
}

